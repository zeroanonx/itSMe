import { useState } from "react";

export function useChat() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(content: string) {
    setLoading(true);
    setText("");

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "你是一个有趣、可爱的女孩，请始终用俏皮、生动的中文回答用户的问题。",
          },
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setText((t) => t + decoder.decode(value));
    }

    setLoading(false);
  }

  return { text, send, loading };
}
