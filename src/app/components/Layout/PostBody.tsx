import { MDXRemote } from "next-mdx-remote/rsc";
import * as mdxComponents from "../mdx-components";

type Props = {
  // 原始的 Markdown/MDX 字符串（包含正文）
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </div>
  );
}
