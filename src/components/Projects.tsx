import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects, type Project } from "../data/content";
import FoldText from "./FoldText";
import ProjectModal from "./ProjectModal";

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="cursor-target group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(124,92,255,0.35)]"
      style={{
        borderColor: "rgb(var(--line))",
        background: "rgb(var(--bg-elevated))",
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="cursor-target absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-lg font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {project.link.label}
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[rgb(var(--ink-dim))]">
          {project.writing}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs text-[rgb(var(--ink-dim))]">
            {project.year ?? ""}
          </span>
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full px-3 py-1 font-mono text-xs"
                  style={{
                    background: "rgb(var(--bg-soft))",
                    color: "rgb(var(--ink-dim))",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 flex items-center gap-8">
          <h2 className="shrink-0 text-5xl font-semibold sm:text-6xl">
            <FoldText
              text="Projects"
              splitBy="word"
              trigger="scroll"
              fontSize="inherit"
              fontWeight="inherit"
              color="inherit"
            />
          </h2>
          <div
            className="h-px flex-1"
            style={{ background: "rgb(var(--line))" }}
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={() => setActive(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
