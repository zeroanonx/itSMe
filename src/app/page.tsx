import { getPostBySlug } from "@/app/utils/modules/generateRoutes";
import PostBody from "@/app/components/layout/PostBody";
import Container from "@/app/components/layout/Container";
import AIEntry from "./components/ai/AIEntry";

export default function Index() {
  const homePost = getPostBySlug("index");

  return (
    <Container size="default">
      <main className="py-12 prose mx-auto slide-enter">
        <PostBody post={homePost} />
        <AIEntry />
      </main>
    </Container>
  );
}
