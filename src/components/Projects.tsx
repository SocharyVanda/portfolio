import { useState } from "react";
import { projects, type Project } from "../data/content";
import ProjectModal from "./ProjectModal";
import SectionKicker from "./SectionKicker";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionKicker index="02" label="Projects" />
        <h2 className="mb-2 text-4xl font-semibold sm:text-5xl">Content</h2>
        <p className="mb-14 max-w-lg text-[rgb(var(--ink-dim))]">
          Click a chapter to open it. Each one is a project write-up in
          progress — swap in your own writing, images and links anytime.
        </p>

        <div className="flex snap-x gap-4 overflow-x-auto pb-6 sm:grid sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 sm:overflow-visible">
          {projects.map((project) => (
            <button
              key={project.chapter}
              onClick={() => setActive(project)}
              className="group relative flex h-80 w-40 shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border text-left transition-transform hover:-translate-y-2 sm:h-96 sm:w-full"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              <div
                className="absolute inset-0 opacity-80 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(160deg, ${project.accent}, ${project.accent}22 70%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="relative m-3 self-start rounded-full border border-white/30 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                {project.chapter}
              </span>
              <div className="relative p-4">
                <p className="text-sm font-semibold text-white">
                  {project.title}
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  {project.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
