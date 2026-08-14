import { useState } from "react";
import { projects, type Project } from "../data/content";
import AccordionGallery, { type AccordionGalleryItem } from "./AccordionGallery";
import FoldText from "./FoldText";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  const items: AccordionGalleryItem[] = projects.map((project) => ({
    image: project.cover ?? project.image,
    label: project.title,
    alt: project.title,
  }));

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
        <p className="mb-10 max-w-lg text-[rgb(var(--ink-dim))]">
          Hover to preview, click to read the full write-up.
        </p>

        <AccordionGallery
          items={items}
          defaultIndex={0}
          accentColor="#7c5cff"
          height={460}
          expandRatio={0.5}
          onSelect={(_, index) => setActive(projects[index])}
        />
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
