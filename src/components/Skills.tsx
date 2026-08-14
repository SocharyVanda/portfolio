import { useState, type ReactNode } from "react";
import { Users } from "lucide-react";
import {
  SiFigma,
  SiNotion,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPython,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa6";
import FoldText from "./FoldText";

const TILES: {
  name: string;
  color: string;
  content: ReactNode;
}[] = [
  { name: "Figma", color: "#F24E1E", content: <SiFigma size={34} /> },
  {
    name: "Notion",
    color: "rgb(var(--ink))",
    content: <SiNotion size={34} />,
  },
  { name: "VS Code", color: "#007ACC", content: <VscVscode size={34} /> },
  { name: "CapCut", color: "#17D6C7", content: "Cc" },
  { name: "Canva", color: "#00C4CC", content: "Ca" },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    content: <SiJavascript size={30} />,
  },
  { name: "Java", color: "#ED8B00", content: <FaJava size={32} /> },
  { name: "HTML", color: "#E34F26", content: <SiHtml5 size={34} /> },
  { name: "CSS", color: "#1572B6", content: <SiCss size={34} /> },
  { name: "Python", color: "#3776AB", content: <SiPython size={32} /> },
  {
    name: "User Research",
    color: "rgb(158 224 105)",
    content: <Users size={30} />,
  },
];

function SkillTile({
  name,
  color,
  children,
}: {
  name: string;
  color: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((s) => !s)}
      className="group relative flex aspect-square items-center justify-center rounded-2xl border transition-transform hover:-translate-y-1"
      style={{
        borderColor: "rgb(var(--line-soft))",
        background: "rgb(var(--bg-soft))",
      }}
    >
      <span
        className="flex text-2xl font-bold sm:text-3xl"
        style={{ color }}
      >
        {children}
      </span>
      <span
        role="tooltip"
        className={`pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] transition-opacity ${
          show ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
      >
        {name}
      </span>
    </button>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-3 text-4xl font-semibold sm:text-5xl">
          <FoldText
            text="Tools & skills"
            splitBy="word"
            trigger="scroll"
            fontSize="inherit"
            fontWeight="inherit"
            color="inherit"
          />
        </h2>
        <p className="mb-14 max-w-lg text-[rgb(var(--ink-dim))]">
          What I reach for to take a project from sketch to ship. Hover or
          tap any icon to see its name.
        </p>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-8">
          {TILES.map((tile) => (
            <SkillTile key={tile.name} name={tile.name} color={tile.color}>
              {tile.content}
            </SkillTile>
          ))}
        </div>
      </div>
    </section>
  );
}
