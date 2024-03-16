import Image from "next/image";

export function ProjectCard(project: ProjectProperty) {
  return (
    <a href={project.url} target="_parent" rel="noopener noreferrer"
    className="relative group block justify-center w-full h-80 overflow-clip bg-slate-600 
    drop-shadow-xl rounded-xl hover:scale-105 transition-transform ease-in-out duration-75">
      <figure className="flex items-center justify-center h-full">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="h-full max-w-full object-cover"
        />
      </figure>
      <figcaption className="absolute bottom-0 w-full bg-opacity-70 bg-slate-900 p-3 space-y-1
      group-hover:bg-slate-50 group-hover:bg-opacity-90 group-hover:text-gray-900 transition-colors duration-75">
        <h2 className="text-5xl font-bold">{project.title}</h2>
        <p className="font-light">{project.description}</p>
      </figcaption>
    </a>
  );
}
