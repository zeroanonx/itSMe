export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export const parseMarkdownToc = (content: string): TocItem[] => {
  const lines = content.split("\n");

  const toc: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    // 跳过代码块
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();

    const id = slugify(text);

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
};
