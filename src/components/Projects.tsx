import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { projects, type Project } from "../data/content";
import Folder from "./Folder";
import ProjectModal from "./ProjectModal";

const FILTERS = ["All Projects", "Researcher", "Designer", "Team"];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All Projects");

  const filtered = useMemo(
    () =>
      filter === "All Projects"
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter],
  );

  return (
    <section id="projects" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-4xl font-semibold sm:text-5xl">Projects</h2>
        <p className="mb-10 max-w-lg text-[rgb(var(--ink-dim))]">
          Click a project to open it. Write-ups are in progress — swap in
          your own case studies anytime.
        </p>

        <div
          className="overflow-hidden rounded-2xl border shadow-sm"
          style={{
            borderColor: "rgb(var(--line))",
            background: "rgb(var(--bg-elevated))",
          }}
        >
          {/* title bar */}
          <div
            className="flex items-center gap-3 border-b px-4 py-3"
            style={{ borderColor: "rgb(var(--line-soft))" }}
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-sm font-medium">Projects</span>
            <div className="ml-auto flex items-center gap-3 text-[rgb(var(--ink-dim))]">
              <LayoutGrid size={15} />
              <List size={15} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            {/* sidebar */}
            <div
              className="flex shrink-0 gap-1 overflow-x-auto border-b p-3 sm:w-40 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r"
              style={{ borderColor: "rgb(var(--line-soft))" }}
            >
              <p className="hidden px-2 pb-1 font-mono text-[10px] uppercase tracking-widest text-[rgb(var(--ink-dim))] sm:block">
                Favorites
              </p>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                    filter === f
                      ? "bg-[#3d7eff] text-white"
                      : "text-[rgb(var(--ink-dim))] hover:bg-[rgb(var(--bg-soft))]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* folder grid */}
            <div className="flex-1 p-6 pt-10">
              <div className="grid grid-cols-2 gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4">
                {filtered.map((project) => (
                  <div
                    key={project.title}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex h-24 w-full items-center justify-center">
                      <Folder
                        color={project.color}
                        size={1.2}
                        onOpen={() => setActive(project)}
                      />
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      <span aria-hidden>{project.icon}</span>
                      {project.title}
                    </span>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-10 text-center text-sm text-[rgb(var(--ink-dim))]">
                  No projects tagged "{filter}" yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
