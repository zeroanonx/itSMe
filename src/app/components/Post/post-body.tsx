// 文章正文区域：使用 MDX 渲染 Markdown/MDX 内容，并应用 Markdown 样式
import { MDXRemote } from "next-mdx-remote/rsc";
// 集中注册的 MDX 组件映射（在 mdx-components.ts 中维护）
import * as mdxComponents from "../mdx-components";

type Props = {
  // 原始的 Markdown/MDX 字符串（包含正文）
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div>
        {/* 使用 MDXRemote 将 Markdown/MDX 字符串渲染为 React 组件树 */}
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </div>
  );
}
