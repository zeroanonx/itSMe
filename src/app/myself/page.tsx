import { getAllPosts } from "@/app/utils/modules/generateRoutes";
import { Post } from "../types";
import BlogContainer from "../components/Layout/BlogContainer";
import dayjs from "dayjs";
import Container from "../components/Layout/Container";

//  强制在 build 时生成 HTML
export const dynamic = "force-static";

// 不允许运行时再生成新路径
export const dynamicParams = false;

const dirName = "myself";

export default function MyselfPage() {
  // 获取所有文章
  const posts = getAllPosts(dirName);

  // 按 type 分组
  const groupedPosts = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const type = post.type;
    (acc[type] ??= []).push(post);
    return acc;
  }, {});

  // 按【年份】分组
  const list = Object.entries(groupedPosts).map(([type, posts]) => {
    // 年份字典
    const byYear = posts.reduce<Record<string, Post[]>>((acc, post) => {
      const year = dayjs(post.date).format("YYYY");
      (acc[year] ??= []).push({
        ...post,
      });
      return acc;
    }, {});

    // 按年份倒序排列
    const yearList = Object.entries(byYear)
      .sort(([a], [b]) => b.localeCompare(a)) // 2023 > 2022
      .map(([year, yearPosts]) => ({ year, posts: yearPosts }));

    return { type, list: yearList };
  });

  return (
    <Container size="default">
      <main className="prose mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-2xl! font-semibold tracking-tight">Myself</h1>
          <p className="mt-2 text-sm text-muted-foreground text-(--accent-primary)">
            一些我自己的东西...
          </p>
        </header>
        <BlogContainer posts={list} />
      </main>
    </Container>
  );
}
