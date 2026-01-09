"use client";

import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type UseChatReturn = {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  send: (content: string) => Promise<void>;
  loading: boolean;
};

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const assistantIdRef = useRef<string | null>(null);

  // 每个会话一个固定 ID
  const _sessionId = useRef(uuidv4()).current;

  async function send(content: string) {
    if (!content.trim()) return;
    const userMessage: ChatMessage = { role: "user", content };
    const assistantMessage: ChatMessage = { role: "assistant", content: "" };
    const assistantId = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    assistantIdRef.current = assistantId;

    // 更新消息状态
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch(`/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: _sessionId,
          messages: [...messages, userMessage],
          stream: true,
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n\n");
        for (let i = 0; i < parts.length - 1; i++) {
          const line = parts[i].replace(/^data:\s*/, "");
          if (!line || line === "[DONE]") continue;
          try {
            const obj = JSON.parse(line);
            if (typeof obj.response === "string") {
              setMessages((prev) =>
                prev.map((m, idx) =>
                  idx === prev.length - 1
                    ? { ...m, content: prev[idx].content + obj.response }
                    : m
                )
              );
            }
          } catch {}
        }
        buffer = parts[parts.length - 1];
      }

      // 处理剩余
      if (buffer && buffer !== "[DONE]") {
        try {
          const obj = JSON.parse(buffer.replace(/^data:\s*/, ""));
          if (typeof obj.response === "string") {
            setMessages((prev) =>
              prev.map((m, idx) =>
                idx === prev.length - 1
                  ? { ...m, content: prev[idx].content + obj.response }
                  : m
              )
            );
          }
        } catch {}
      }
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m, idx) =>
          idx === prev.length - 1
            ? { ...m, content: `出错：${err.message ?? err}` }
            : m
        )
      );
    } finally {
      setLoading(false);
      assistantIdRef.current = null;
    }
  }

  return { messages, input, setInput, send, loading };
}
