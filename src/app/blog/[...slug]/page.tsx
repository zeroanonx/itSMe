import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/app/utils/modules/generateRoutes";
import { MATE_TITLE } from "@/app/constants";
import PostBody from "@/app/components/layout/PostBody";
import { join } from "path";
import MoveTop from "@/app/components/ui/MoveTop";
import Container from "@/app/components/layout/Container";

//  强制在 build 时生成 HTML
export const dynamic = "force-static";

// 不允许运行时再生成新路径
export const dynamicParams = false;

const dirName = "blog";

/**
 * @function 获取文章路径
 */
const getSlug = async (props: Params) => {
  // 通过 `generateStaticParams` 传入的动态路由参数
  const params = await props.params;
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  // 根据 slug 从本地 Markdown/MDX 文件中读取文章
  const post = getPostBySlug(join(`${dirName}/`, slug!));

  // 如果找不到对应文章，则返回 404 页面
  if (!post) {
    return notFound();
  }

  return post;
};

// 文章详情页服务端组件
export default async function Post(props: Params) {
  const post = await getSlug(props);

  return (
    <Container size="default">
      <section className="prose mx-auto">
        <h1>{post.title}</h1>
        <p>
          <span>{post.date}</span>
          <span> • </span>
          <span>{post.duration}</span>
        </p>
        <PostBody post={post} />
        <MoveTop />
      </section>
    </Container>
  );
}

// 路由参数类型定义，约定 `[...slug]` 为多段路径（支持子目录）
type Params = {
  params: Promise<{
    slug?: string[] | string;
  }>;
};

// 为每篇文章动态生成 `<head>` 中的 SEO 信息
export async function generateMetadata(props: Params): Promise<Metadata> {
  const post = await getSlug(props);

  const title = `${post.title} | ${MATE_TITLE}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

// 预定义所有可静态生成的 `[...slug]` 路径
export async function generateStaticParams() {
  const posts = getAllPosts(dirName);

  return posts.map((post) => ({
    slug: post.slug.replace(new RegExp(`^${dirName}/`), "").split("/"),
  }));
}
