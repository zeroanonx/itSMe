import { streamChatCF } from "@/app/server/cloudflare";
import { checkRateLimit } from "@/app/server/rate-limit";

export const runtime = "edge"; // 重要：Vercel Edge

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("cf-connecting-ip") ??
      "anonymous";

    checkRateLimit(ip);

    const { messages } = await req.json();

    const stream = await streamChatCF(messages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
