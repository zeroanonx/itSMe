import { getAllPosts, getPostBySlug } from "@/app/utils/generateRoutes";
import { Post } from "../types";

export default function BlogPage() {
  const posts = getAllPosts("blog");

  // 根据type分组
  const groupedPosts = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const type = post.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(post);
    return acc;
  }, {});
  console.log(posts);

  return (
    <>
      {Object.entries(groupedPosts).map(([type, list]) => (
        <section key={type}>
          <h2>{type}</h2>
          {list.map((p) => (
            <article key={p.slug}>{p.title}</article>
          ))}
        </section>
      ))}
    </>
  );
}
