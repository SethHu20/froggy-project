import { ProjectCard } from "@/components/project/ProjectCard";
import projectData from "@/public/projects/project-list.json";

export const metadata = {
  title: "Projects",
};

export default function GamesPage() {
  let projects = projectData as ProjectProperty[];
  return (
    <main className="flex flex-col space-y-10">
      <h1 className="text-5xl">Projects</h1>
      <h2 className="text-3xl">Games</h2>
      {projects
        .filter((project) => project.category === "game")
        .map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
    </main>
  );
}
