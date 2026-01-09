import Container from "@/app/components/layout/Container";
import FriendsContainer from "@/app/components/layout/FriendsContainer";
import { ProjectsType } from "../types";
import { getAllPosts } from "../utils/modules/generateRoutes";

const dirName = "friends";

export default function Friends() {
  const posts = getAllPosts(dirName)[0] as unknown as ProjectsType;

  return (
    <Container size="wide">
      <main className="mx-auto">
        <FriendsContainer content={posts} />
      </main>
    </Container>
  );
}
