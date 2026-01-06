"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/app/hooks/modules/useChat";
import { useGirlMemory } from "@/app/hooks/modules/useGirlMemory";

type Msg = { id: string; role: "user" | "assistant"; content: string };

export default function ChatGirl() {
  const { text, send, loading } = useChat();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentAssistantId = useRef<string | null>(null);
  const { remember } = useGirlMemory();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 将流式 text 更新到当前 pending assistant 消息
  useEffect(() => {
    if (!currentAssistantId.current) return;
    const id = currentAssistantId.current;
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: text } : m))
    );
  }, [text]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;

    remember(val);

    const userId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const assistantId = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    // 添加用户消息与一个空的 assistant 占位
    setMessages((m) => [
      ...m,
      { id: userId, role: "user", content: val },
      { id: assistantId, role: "assistant", content: "" },
    ]);

    currentAssistantId.current = assistantId;

    try {
      await send(val);
    } catch (err) {
      // 出错时把错误写入 assistant 内容
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: `出错：${(err as Error)?.message ?? err}` }
            : msg
        )
      );
    } finally {
      currentAssistantId.current = null;
    }

    setInput("");
  }

  return (
    <div className="flex h-full flex-col px-5 py-4">
      {/* 消息区 */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm leading-relaxed ${
              m.role === "user"
                ? "text-right text-foreground"
                : "text-left text-muted-foreground"
            }`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="text-xs text-muted-foreground">她正在想你说的话…</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 输入区 */}
      <form onSubmit={onSubmit} className="mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="跟她说点什么…"
          className="
            w-full rounded-full px-4 py-2 text-sm
            bg-background border border-border
            outline-none
          "
        />
      </form>
    </div>
  );
}
