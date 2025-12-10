// 文章详情页路由组件，对应路径 `/posts/...slug`
import { Metadata } from "next";
import { notFound } from "next/navigation";
// 读取本地 `page` 目录中的 Markdown/MDX 文章
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
// 布局与展示相关组件
import Container from "@/app/components/Layout/Container";
import Header from "@/app/components/Layout/Header";
import { PostBody } from "@/app/components/Post/post-body";
import { PostHeader } from "@/app/components/Post/post-header";

// 文章详情页服务端组件
export default async function Post(props: Params) {
  // 通过 `generateStaticParams` 传入的动态路由参数
  const params = await props.params;
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  // 根据 slug 从本地 Markdown/MDX 文件中读取文章
  const post = getPostBySlug(slug);

  // 如果找不到对应文章，则返回 404 页面
  if (!post) {
    return notFound();
  }

  // 将原始 Markdown/MDX 字符串传递给 `PostBody`，由 MDXRemote 负责解析渲染
  const content = post.content || "";

  return (
    <main>
      <article className="mb-32">
        {/* 文章头部区域：标题 / 封面图 / 作者 / 日期 */}
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        {/* 文章正文区域：渲染 Markdown/MDX 内容 */}
        <PostBody content={content} />
      </article>
    </main>
  );
}

// 路由参数类型定义，约定 `[...slug]` 为多段路径（支持子目录）
type Params = {
  params: Promise<{
    slug: string[] | string;
  }>;
};

// 为每篇文章动态生成 `<head>` 中的 SEO 信息
export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const post = getPostBySlug(slug);

  // 找不到文章时同样返回 404
  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

// 预定义所有可静态生成的 `[...slug]` 路径
export async function generateStaticParams() {
  const posts = getAllPosts();

  // 返回形如 { slug: ['about', 'aa'] } 的对象数组
  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}
