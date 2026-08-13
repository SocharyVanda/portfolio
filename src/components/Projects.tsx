import { useState } from "react";
import { projects, type Project } from "../data/content";
import ProjectModal from "./ProjectModal";
import SectionKicker from "./SectionKicker";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionKicker index="02" label="Projects" />
        <h2 className="mb-2 text-4xl font-semibold sm:text-5xl">Projects</h2>
        <p className="mb-14 max-w-lg text-[rgb(var(--ink-dim))]">
          Click a project to open it. Write-ups are in progress — swap in
          your own case studies anytime.
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {projects.map((project) => (
            <button
              key={project.title}
              onClick={() => setActive(project)}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span
                className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-md"
                style={{ borderColor: "rgb(var(--line))" }}
              >
                <img
                  src={project.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border text-base shadow-sm"
                  style={{
                    borderColor: "rgb(var(--line))",
                    background: "rgb(var(--bg-elevated))",
                  }}
                >
                  {project.icon}
                </span>
              </span>
              <span className="text-sm font-medium">{project.title}</span>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
