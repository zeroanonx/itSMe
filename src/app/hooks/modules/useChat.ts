import { systemPrompt } from "@/app/constants/modules/systemPrompt";
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
            content: systemPrompt,
          },
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by "\n\n"
        const parts = buffer.split("\n\n");
        // process all complete events, leave the last partial in buffer
        for (let i = 0; i < parts.length - 1; i++) {
          const event = parts[i]
            .split("\n")
            .map((line) =>
              line.startsWith("data:") ? line.slice(5).trim() : ""
            )
            .filter(Boolean)
            .join("\n");

          if (!event) continue;
          if (event === "[DONE]") continue;

          try {
            const obj = JSON.parse(event);
            if (typeof obj.response === "string") {
              setText((t) => t + obj.response);
            }
          } catch {
            // ignore non-json fragments
          }
        }

        buffer = parts[parts.length - 1];
      }

      // process any remaining buffered event
      const remaining = buffer
        .split("\n")
        .map((line) => (line.startsWith("data:") ? line.slice(5).trim() : ""))
        .filter(Boolean)
        .join("\n");
      if (remaining && remaining !== "[DONE]") {
        try {
          const obj = JSON.parse(remaining);
          if (typeof obj.response === "string") {
            setText((t) => t + obj.response);
          }
        } catch {
          // ignore
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return { text, send, loading };
}
