import { ProjectCard } from "@/components/project/ProjectCard";
import projectData from "@/public/projects/project-list.json";

export default function Home() {
  let projects = projectData as ProjectProperty[];
  return (
    <main className="flex flex-col justify-center items-center w-full gap-4 text-white">
      {projects.map(project => <ProjectCard key={project.id} {...project} />)}
      <p>Froggy Project Team: Seth, Thien, Cros, Yao</p>
    </main>
  );
}