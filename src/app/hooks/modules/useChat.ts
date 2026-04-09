"use client";

import { useState, useRef, useEffect } from "react";
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
  const messagesRef = useRef<ChatMessage[]>([]);
  const pendingAssistantTextRef = useRef("");
  const flushFrameRef = useRef<number | null>(null);

  // 每个会话一个固定 ID
  const _sessionId = useRef(uuidv4()).current;

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (flushFrameRef.current) {
        cancelAnimationFrame(flushFrameRef.current);
      }
    };
  }, []);

  const applyMessages = (
    updater: (previous: ChatMessage[]) => ChatMessage[]
  ) => {
    setMessages((previous) => {
      const next = updater(previous);
      messagesRef.current = next;
      return next;
    });
  };

  const flushPendingAssistantText = () => {
    if (!pendingAssistantTextRef.current) return;

    const pendingText = pendingAssistantTextRef.current;
    pendingAssistantTextRef.current = "";

    applyMessages((previous) => {
      if (!previous.length) return previous;

      return previous.map((message, index) =>
        index === previous.length - 1
          ? { ...message, content: message.content + pendingText }
          : message
      );
    });
  };

  const scheduleAssistantFlush = () => {
    if (flushFrameRef.current) return;

    flushFrameRef.current = requestAnimationFrame(() => {
      flushFrameRef.current = null;
      flushPendingAssistantText();
    });
  };

  async function send(content: string) {
    if (!content.trim()) return;
    const userMessage: ChatMessage = { role: "user", content };
    const assistantMessage: ChatMessage = { role: "assistant", content: "" };
    const historyBeforeSend = messagesRef.current;

    // 更新消息状态
    applyMessages((previous) => [...previous, userMessage, assistantMessage]);
    setLoading(true);
    setInput("");
    pendingAssistantTextRef.current = "";

    try {
      const res = await fetch(`/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: _sessionId,
          messages: [...historyBeforeSend, userMessage],
          stream: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

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
              pendingAssistantTextRef.current += obj.response;
              scheduleAssistantFlush();
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
            pendingAssistantTextRef.current += obj.response;
          }
        } catch {}
      }

      flushPendingAssistantText();
    } catch (err: any) {
      pendingAssistantTextRef.current = "";
      applyMessages((previous) =>
        previous.map((m, idx) =>
          idx === previous.length - 1
            ? { ...m, content: `出错：${err.message ?? err}` }
            : m
        )
      );
    } finally {
      if (flushFrameRef.current) {
        cancelAnimationFrame(flushFrameRef.current);
        flushFrameRef.current = null;
      }
      flushPendingAssistantText();
      setLoading(false);
    }
  }

  return { messages, input, setInput, send, loading };
}
