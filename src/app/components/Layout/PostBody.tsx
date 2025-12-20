import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../mdx-components";
import { TableOfContents } from "./TableOfContents";
import { parseMarkdownToc } from "@/app/utils";

export function PostBody({ content }: { content: string }) {
  const toc = parseMarkdownToc(content);

  return (
    <div className="max-w-2xl markdown mx-auto">
      {toc.length ? <TableOfContents toc={toc} /> : null}
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
