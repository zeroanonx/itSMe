import { getPostBySlug } from "@/lib/api";
import { PostBody } from "@/app/components/Post/post-body";

export default function Index() {
  // 预留一个专门作为首页的 Markdown/MDX 文件，例如：page/home.md 或 page/home.mdx
  // 你之后只需要在 `page` 目录里创建并编辑这篇文件即可。
  const homePost = getPostBySlug("home");
  const content = homePost.content || "";

  return (
    <main>
      <article className="py-12">
        <PostBody content={content} />
      </article>
    </main>
  );
}
