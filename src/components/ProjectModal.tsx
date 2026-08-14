import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "../data/content";

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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
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

          {/* MacBook frame */}
          <motion.div
            className="relative z-10 flex w-full max-w-3xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* screen bezel */}
            <div
              className="w-full rounded-t-2xl rounded-b-md border-[10px] border-b-4 bg-[#1a1a1c] p-0 shadow-2xl sm:border-[14px] sm:border-b-4"
              style={{ borderColor: "#1a1a1c" }}
            >
              {/* camera notch */}
              <div className="flex justify-center bg-black py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              </div>

              {/* browser chrome */}
              <div className="flex items-center gap-3 border-b border-black/10 bg-[#ececec] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-neutral-500">
                  {project.title}
                </span>
                <button
                  onClick={onClose}
                  className="cursor-target ml-auto rounded-md p-1 text-neutral-500 hover:bg-black/10 hover:text-black"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {/* content */}
              <div className="scroll-thin max-h-[70vh] overflow-y-auto bg-white px-6 py-8 text-neutral-900 sm:px-10 sm:py-10">
                <h3 className="text-3xl font-semibold sm:text-4xl">
                  {project.title}
                </h3>

                {project.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 max-w-xl leading-relaxed text-neutral-600">
                  {project.writing}
                </p>

                {meta.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-neutral-200 pt-6">
                    {meta.map((m) => (
                      <div key={m.label}>
                        <p className="text-sm font-semibold text-neutral-900">
                          {m.label}
                        </p>
                        <p className="text-sm text-neutral-500">{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {project.tools && project.tools.length > 0 && (
                  <div className="mt-6 border-t border-neutral-200 pt-6">
                    <p className="mb-2 text-sm font-semibold text-neutral-900">
                      Tools
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-600">
                      {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.reflection && project.reflection.length > 0 && (
                  <div className="mt-6 border-t border-neutral-200 pt-6">
                    <p className="mb-2 text-sm font-semibold text-neutral-900">
                      Reflection
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-600">
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
                    className="cursor-target mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {project.link.label}
                    <ArrowUpRight size={14} />
                  </a>
                )}

                <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* laptop base */}
            <div className="h-3 w-[104%] rounded-b-xl bg-gradient-to-b from-[#3a3a3d] to-[#1f1f21] sm:h-4" />
            <div className="h-1 w-[70%] rounded-b-lg bg-[#141416]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
