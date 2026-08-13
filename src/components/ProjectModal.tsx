import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "../data/content";
import { profile } from "../data/content";

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
            className="relative z-10 flex w-full max-w-4xl flex-col items-center"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* screen bezel */}
            <div className="w-full rounded-t-2xl rounded-b-md border-[10px] border-b-4 bg-[#1a1a1c] p-0 shadow-2xl sm:border-[14px] sm:border-b-4"
              style={{ borderColor: "#1a1a1c" }}
            >
              {/* camera notch */}
              <div className="flex justify-center bg-black py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              </div>

              {/* browser chrome */}
              <div className="flex items-center gap-3 border-b border-white/10 bg-[#111113] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <button
                  onClick={onClose}
                  className="ml-auto rounded-md p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="border-b border-white/10 bg-[#0d0d0f] px-4 py-1.5">
                <div className="mx-auto flex max-w-md items-center gap-2 rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-neutral-400">
                  sochary-vanda.dev/projects/
                  {project.title.toLowerCase().replace(/\s+/g, "-")}
                </div>
              </div>

              {/* content */}
              <div
                className="scroll-thin max-h-[60vh] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10"
                style={{ background: "#0d0d0f" }}
              >
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {project.chapter}
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-400">
                  {project.subtitle}
                </p>
                <div
                  className="my-6 h-40 w-full rounded-xl sm:h-56"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}55, transparent)`,
                    border: `1px solid ${project.accent}55`,
                  }}
                />
                <p className="max-w-2xl leading-relaxed text-neutral-300">
                  {project.writing}
                </p>
                <p className="mt-8 text-xs text-neutral-600">
                  — {profile.name}
                </p>
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
