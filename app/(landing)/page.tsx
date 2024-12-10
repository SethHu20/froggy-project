import { ProjectCard } from "@/components/project/ProjectCard";
import projectData from "@/public/projects/project-list.json";

export default function Home() {
  let projects = projectData as ProjectProperty[];
  return (
    <main className="flex flex-col gap-4 mx-4 lg:mx-0 transition-all">
      {projects.map(project => <ProjectCard key={project.id} {...project} />)}
      <p>Froggy Project Team: Seth, Thien, Cros, Yao</p>
    </main>
  );
}