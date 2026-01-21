import { Post } from "@/app/types";
import MDXRenderer from "../mdx/MDXRenderer";
import { parseMarkdownToc } from "@/app/utils";
import { TableOfContents } from "@/app/components/layout/TableOfContents";
import Comments from "./Comments";

export default function PostBodyServer({ post }: { post: Post }) {
  const toc = parseMarkdownToc(post.content);

  return (
    <main className="max-w-2xl markdown mx-auto">
      <MDXRenderer source={post.content} />

      {toc.length ? <TableOfContents toc={toc} /> : null}

      <Comments />
    </main>
  );
}
