import { ChatMessage } from "@/app/hooks";

export async function streamFromCloudflare(messages: ChatMessage[]) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
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
    const text = await res.text();
    throw new Error(`Cloudflare AI error: ${text}`);
  }

  return res.body;
}
