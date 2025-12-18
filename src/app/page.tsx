import { getPostBySlug } from "@/app/utils/generateRoutes";
import { PostBody } from "@/app/components/Layout/PostBody";

export default function Index() {
  const homePost = getPostBySlug("index");
  const content = homePost.content || "";

  return (
    <main>
      <article className="py-12">
        <PostBody content={content} />
      </article>
    </main>
  );
}
