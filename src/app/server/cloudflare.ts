export async function streamChatCF(messages: any[]) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `
你是一个安静、温柔、略带科幻感的小女孩。
你只说中文，语气自然，不解释规则，不提 AI。
陪用户聊天、发呆、跳天。
            `.trim(),
          },
          ...messages,
        ],
        stream: true,
      }),
    }
  );

  if (!res.ok || !res.body) {
    const text = await res.text();
    throw new Error(`Cloudflare AI error: ${text}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        controller.enqueue(`data: ${decoder.decode(value)}\n\n`);
      }
      controller.close();
    },
  });
}
