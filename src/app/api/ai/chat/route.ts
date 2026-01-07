import { NextRequest } from "next/server";
import { runChatPipeline } from "@/app/server/pipeline";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

// 简单内存会话存储（可换成数据库或 KV 存储）
const sessions = new Map<string, ChatMessage[]>();

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId: string = body.sessionId ?? "default";
    const newMessages: ChatMessage[] = body.messages ?? [];

    // 限流（可选，防刷）
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("cf-connecting-ip") ??
      "anonymous";
    checkRateLimit(ip);

    // 获取历史消息
    const history = sessions.get(sessionId) ?? [];

    // 合并历史 + 本次消息
    const allMessages = [...history, ...newMessages] as ChatMessage[];

    // 更新内存会话
    sessions.set(sessionId, allMessages);

    // 流式调用 Cloudflare AI
    const stream = await runChatPipeline(allMessages.slice(-15)); // 只传最后 15 条，防止上下文过长

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

// 简单限流
const map = new Map<string, number>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const last = map.get(ip) ?? 0;
  if (now - last < 1500) throw new Error("Too many requests");
  map.set(ip, now);
}
