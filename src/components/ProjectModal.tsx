import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { links, projects, type Project } from "../data/content";
import { FigmaIcon, GithubIcon } from "./icons";

const paper = {
  bg: "#f3ede1",
  ink: "#18140d",
  dim: "#7a7263",
  line: "rgba(24, 20, 13, 0.16)",
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  const meta = project
    ? [
        { label: "Client", value: project.client },
        { label: "Year", value: project.year },
        { label: "Project type", value: project.projectType },
        { label: "Credits", value: project.credits },
      ].filter((m) => m.value)
    : [];

  const index = project ? projects.findIndex((p) => p.title === project.title) : -1;
  const stamp = index >= 0 ? `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}` : "";

  const moreWork = [
    { href: links.github, icon: GithubIcon, label: "GitHub" },
    links.figma && { href: links.figma, icon: FigmaIcon, label: "Figma" },
    links.behance && { href: links.behance, icon: ArrowUpRight, label: "Behance" },
  ].filter(Boolean) as { href: string; icon: typeof GithubIcon; label: string }[];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="scroll-thin relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg border shadow-2xl"
            style={{ background: paper.bg, borderColor: paper.line, color: paper.ink }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div
              className="flex items-center justify-between border-b px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] sm:px-10"
              style={{ borderColor: paper.line, color: paper.dim }}
            >
              <span>Sochary Vanda — Case Study</span>
              <div className="flex items-center gap-4">
                {stamp && <span>{stamp}</span>}
                <button
                  onClick={onClose}
                  className="cursor-target rounded-full p-1 transition-colors hover:bg-black/5"
                  style={{ color: paper.ink }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <h3 className="text-4xl font-semibold leading-tight sm:text-5xl">
                {project.title}
              </h3>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2.5 py-1 text-xs font-medium"
                    style={{ borderColor: paper.line }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="mt-6 border-t pt-4"
                style={{ borderColor: paper.line }}
              >
                <p
                  className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: paper.dim }}
                >
                  More of my work
                </p>
                <div className="flex flex-wrap gap-2">
                  {moreWork.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-target inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-black/5"
                      style={{ borderColor: paper.line }}
                    >
                      <Icon size={13} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div
                className="mt-8 grid gap-10 border-t pt-8 sm:grid-cols-[1fr_220px]"
                style={{ borderColor: paper.line }}
              >
                <div>
                  <p
                    className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: paper.dim }}
                  >
                    Overview
                  </p>
                  <p className="leading-relaxed" style={{ color: paper.ink }}>
                    {project.writing}
                  </p>

                  {project.reflection && project.reflection.length > 0 && (
                    <div className="mt-8">
                      <p
                        className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: paper.dim }}
                      >
                        Reflection
                      </p>
                      <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
                        {project.reflection.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-target mt-6 inline-flex items-center gap-1.5 border-b text-sm font-medium"
                      style={{ borderColor: paper.ink }}
                    >
                      {project.link.label}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                <div className="flex flex-col gap-8">
                  {meta.length > 0 && (
                    <div className="flex flex-col gap-4">
                      {meta.map((m) => (
                        <div key={m.label}>
                          <p
                            className="font-mono text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: paper.dim }}
                          >
                            {m.label}
                          </p>
                          <p className="mt-1 text-sm">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.tools && project.tools.length > 0 && (
                    <div>
                      <p
                        className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: paper.dim }}
                      >
                        Tools
                      </p>
                      <ul className="space-y-1 text-sm">
                        {project.tools.map((tool) => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div
                className="mt-10 overflow-hidden rounded-md border"
                style={{ borderColor: paper.line }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div
              className="border-t px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] sm:px-10"
              style={{ borderColor: paper.line, color: paper.dim }}
            >
              Sochary Vanda — Case Study
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
