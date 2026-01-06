"use client";
import { useChat } from "@/app/hooks";

export function AIBox() {
  const { text, send, loading } = useChat();

  return (
    <div className="border rounded p-4 my-6">
      <button onClick={() => send("你是谁")} disabled={loading}>
        {loading ? "生成中..." : "AI 总结"}
      </button>

      <pre className="mt-4 whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
