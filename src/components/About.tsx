import {
  Braces,
  Code2,
  Film,
  LayoutGrid,
  NotebookText,
  Palette,
  PenTool,
  Terminal,
  Users,
} from "lucide-react";
import { profile } from "../data/content";
import SectionKicker from "./SectionKicker";

const GRID = [
  { label: "Figma", icon: PenTool },
  { label: "Notion", icon: NotebookText },
  { label: "VS Code", icon: Code2 },
  { label: "User Research", icon: Users },
  { label: "CapCut", icon: Film },
  { label: "Canva", icon: Palette },
  { label: "JavaScript", icon: Braces },
  { label: "Python", icon: Terminal },
  { label: "HTML / CSS", icon: LayoutGrid },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <SectionKicker index="01" label="About" />
          <h2 className="text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl">
            Curious, analytical
            <br />& creative.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-[rgb(var(--ink-dim))]">
            {profile.bio}
          </p>
          <div
            className="mt-8 max-w-md rounded-2xl border p-5"
            style={{ borderColor: "rgb(var(--line))" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
              Career goal
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {profile.careerGoal}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {GRID.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border py-8 text-center transition-colors hover:bg-[rgb(var(--bg-soft))]"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              <Icon size={22} strokeWidth={1.5} />
              <span className="px-2 text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
