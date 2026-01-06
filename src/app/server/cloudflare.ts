export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const CF_MODEL = "@cf/meta/llama-3-8b-instruct";

export async function streamChatCF(messages: ChatMessage[]) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/${CF_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages,
        stream: true,
      }),
    }
  );

  if (!res.ok || !res.body) {
    const err = await res.text();
    throw new Error(`CF AI Error: ${res.status} ${err}`);
  }

  return res.body;
}
