import Container from "@/app/components/layout/Container";
import ProjectsContainer from "@/app/components/layout/ProjectsContainer";
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
