"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/app/hooks/modules/useChat";
import { useGirlMemory } from "@/app/hooks/modules/useGirlMemory";
import styled from "styled-components";

const GirlComponents = styled.div`
  .chat-scroll {
    scrollbar-width: thin;
    scrollbar-color: var(--c-scrollbar) transparent;
  }
  .chat-scroll::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .chat-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .chat-scroll::-webkit-scrollbar-thumb {
    background: var(--c-scrollbar);
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }
  .chat-scroll::-webkit-scrollbar-thumb:hover {
    background: var(--c-scrollbar-hover);
  }

  .chat-bubble {
    display: inline-block;
    max-width: 94%;
    padding: 8px 12px;
    font-size: 0.95rem;
    line-height: 1.3;
    word-break: break-word;
    background: var(--chat-bubble-bg);
    color: var(--chat-bubble-text);
    border-radius: 18px 18px 18px 6px;
  }
`;
export default function ChatGirl() {
  const { messages, input, setInput, send, loading } = useChat();
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
    <GirlComponents className="flex h-full flex-col px-4 py-4 min-h-0">
      {/* 消息区 */}
      <div className="flex-1 min-h-0 overflow-y-auto chat-scroll p-2 space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`${
              m.role === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
            {m.content && <div className="chat-bubble">{m.content}</div>}
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
          className="w-full rounded-full px-4 py-2 text-sm bg-background border border-border outline-none"
        />
      </form>
    </GirlComponents>
  );
}
