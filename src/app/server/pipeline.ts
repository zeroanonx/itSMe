import { GIRL_SYSTEM_PROMPT } from "./prompt";
import { ChatMessage } from "./schema";
import { streamFromCloudflare } from "./providers/cloudflare";
import { getSearchResults } from "./searchBlog";

export async function runChatPipeline(messages: ChatMessage[]) {
  const contextText = await getSearchResults(messages);
  const finalMessages = [
    { role: "system", content: GIRL_SYSTEM_PROMPT + contextText },
    ...messages,
  ] as ChatMessage[];

  return streamFromCloudflare(finalMessages);
}
