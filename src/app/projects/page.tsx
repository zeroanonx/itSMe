import Container from "../components/Layout/Container";
import ProjectsContainer from "../components/Layout/ProjectsContainer";
import { ProjectsType } from "../types";
import { getAllPosts } from "../utils/modules/generateRoutes";

const dirName = "projects";

export default function Projects() {
  const posts = getAllPosts(dirName)[0] as unknown as ProjectsType;

  return (
    <Container size="wide">
      <main className="mx-auto">
        <ProjectsContainer content={posts} />
      </main>
    </Container>
  );
}
