import { z } from "zod";

export const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1),
    })
  ),
});

export type ChatMessage = z.infer<typeof ChatRequestSchema>["messages"][number];
