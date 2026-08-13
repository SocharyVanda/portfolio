import type { ReactNode } from "react";
import { Users } from "lucide-react";
import SkillTile from "./SkillTile";
import TrueFocus from "./TrueFocus";

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

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <TrueFocus
          sentence="Tools & skills"
          className="mb-3 text-4xl font-semibold sm:text-5xl"
          style={{ justifyContent: "flex-start" }}
        />
        <p className="mb-14 max-w-lg text-[rgb(var(--ink-dim))]">
          What I reach for to take a project from sketch to ship. Hover or
          tap any icon to see its name.
        </p>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8">
          {TILES.map((tile) => (
            <SkillTile key={tile.name} name={tile.name} bg={tile.bg} fg={tile.fg}>
              {tile.content}
            </SkillTile>
          ))}
        </div>
      </div>
    </section>
  );
}
