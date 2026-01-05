import Container from "../components/Layout/Container";
import ProjectsContainer from "../components/Layout/ProjectsContainer";
import { ProjectsType } from "../types";
import { getAllPosts } from "../utils/modules/generateRoutes";

export default function Projects() {
  const posts = getAllPosts("projects")[0] as unknown as ProjectsType;
  console.log(posts);

  return (
    <Container size="wide">
      <main className="mx-auto">
        <ProjectsContainer content={posts} />
      </main>
    </Container>
  );
}
