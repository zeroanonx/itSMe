/**
 * 剔除图片 & JSX / HTML 标签
 * - <Image ... />
 * - <img ... />
 * - 任意 <Tag>...</Tag>
 */
export function stripImagesAndTags(text: string) {
  if (!text) return "";

  return (
    text
      // 移除 <Image ... /> 或 <Image ...>
      .replace(/<Image[\s\S]*?>/gi, "")
      // 移除 <img ... />
      .replace(/<img[\s\S]*?>/gi, "")
      // 移除所有 HTML / JSX 标签
      .replace(/<\/?[^>]+>/g, "")
      // 多余空白
      .replace(/\s+/g, " ")
      .trim()
  );
}
