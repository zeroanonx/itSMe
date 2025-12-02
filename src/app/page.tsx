import Container from "@/app/components/Layout/Container";
import { getPostBySlug } from "@/lib/api";
import { PostBody } from "@/app/components/Post/post-body";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

export default function Index() {
  // 预留一个专门作为首页的 Markdown/MDX 文件，例如：page/home.md 或 page/home.mdx
  // 你之后只需要在 `page` 目录里创建并编辑这篇文件即可。
  const homePost = getPostBySlug("home");
  const content = homePost.content || "";

  return (
    <main>
      <Header />
      <Container>
        {/* 首页只渲染一篇指定的 Markdown/MDX 文档 */}
        <article className="py-12">
          <PostBody content={content} />
        </article>
        <Footer />
      </Container>
    </main>
  );
}
