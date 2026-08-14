import type { ReactNode } from "react";
import { Users } from "lucide-react";
import LogoLoop, { type LogoItem } from "./LogoLoop";

const TILES: {
  name: string;
  bg: string;
  fg: string;
  content: ReactNode;
}[] = [
  { name: "Figma", bg: "#A259FF", fg: "#ffffff", content: "Fi" },
  { name: "Notion", bg: "#0b0b0b", fg: "#ffffff", content: "N" },
  { name: "VS Code", bg: "#007ACC", fg: "#ffffff", content: "VS" },
  { name: "CapCut", bg: "#0b0b0b", fg: "#17D6C7", content: "Cc" },
  { name: "Canva", bg: "#00C4CC", fg: "#ffffff", content: "Ca" },
  { name: "JavaScript", bg: "#F7DF1E", fg: "#0b0b0b", content: "JS" },
  { name: "Java", bg: "#ED8B00", fg: "#ffffff", content: "Jv" },
  { name: "HTML", bg: "#E34F26", fg: "#ffffff", content: "5" },
  { name: "CSS", bg: "#1572B6", fg: "#ffffff", content: "3" },
  { name: "Python", bg: "#3776AB", fg: "#ffffff", content: "Py" },
  {
    name: "User Research",
    bg: "rgb(107 110 46)",
    fg: "#ffffff",
    content: <Users size={18} />,
  },
];

const logos: LogoItem[] = TILES.map((tile) => ({
  title: tile.name,
  ariaLabel: tile.name,
  node: (
    <div
      className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border sm:h-20 sm:w-20"
      style={{
        borderColor: "rgb(var(--line))",
        background: "rgb(var(--bg-soft))",
      }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold sm:h-11 sm:w-11 sm:text-sm"
        style={{ background: tile.bg, color: tile.fg }}
      >
        {tile.content}
      </span>
      <span
        className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
      >
        {tile.name}
      </span>
    </div>
  ),
}));

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-3 text-4xl font-semibold sm:text-5xl">
          Tools & skills
        </h2>
        <p className="mb-14 max-w-lg text-[rgb(var(--ink-dim))]">
          What I reach for to take a project from sketch to ship. Hover any
          icon to see its name.
        </p>

        <LogoLoop
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={64}
          gap={28}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="rgb(var(--bg))"
          ariaLabel="Tools and skills"
        />
      </div>
    </section>
  );
}
