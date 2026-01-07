"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/app/hooks/modules/useChat";
import { useGirlMemory } from "@/app/hooks/modules/useGirlMemory";

export default function ChatGirl() {
  const { messages, input, setInput, send, loading } = useChat("main-session");
  const { remember } = useGirlMemory();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    remember(val);
    await send(val);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col px-5 py-4">
      {/* 消息区 */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {messages.map((m, idx) => (
          <div
            key={idx}
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
