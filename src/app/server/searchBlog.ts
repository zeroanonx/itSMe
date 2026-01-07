import { ChatMessage } from "./schema";
export type SearchEntry = {
  id: string;
  title: string;
  content: string;
  url: string;
};

let index: SearchEntry[] | null = null;

// 初始化加载 JSON（Edge-safe，用 fetch）
export async function loadSearchIndex(): Promise<SearchEntry[]> {
  if (index) return index;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search-index.json`
  );

  if (!res.ok) {
    throw new Error("无法加载搜索索引");
  }
  index = await res.json();
  return index!;
}

// 简单检索函数，返回匹配内容
export async function searchIndex(
  query: string,
  topN = 5
): Promise<SearchEntry[]> {
  const idx = await loadSearchIndex();
  const lowerQuery = query.toLowerCase();

  const results = idx
    .map((entry) => {
      const score =
        (entry.title.toLowerCase().includes(lowerQuery) ? 2 : 0) +
        (entry.content.toLowerCase().includes(lowerQuery) ? 1 : 0);
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((r) => r.entry);

  return results;
}

export const getSearchResults = async (messages: ChatMessage[]) => {
  // 本地知识库 测试如果返回文章，导致token超限，后面打算，根据匹配到的，返回文章链接，让用户自己查看
  const userLastMessage = messages[messages.length - 1]?.content ?? "";

  const searchResults = await searchIndex(userLastMessage);

  let contextText = "";
  if (searchResults.length > 0) {
    const res = searchResults
      .map(
        (r, idx) =>
          `${idx + 1}. ${r.title}, 页面路径：${
            process.env.NEXT_PUBLIC_BASE_URL
          }${r.url}`
      )
      .join("\n");
    contextText =
      `另外以下是你记忆中的相关内容，将：${res}作为结果，明确告诉用户路径,用自己的话俏皮提示给用户,\n` +
      res;
  }
  return contextText;
};
