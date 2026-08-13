import { Code2, PenTool, Wrench } from "lucide-react";
import { skills } from "../data/content";
import SectionKicker from "./SectionKicker";

const GROUPS = [
  { label: "Tools", icon: Wrench, items: skills.tools, color: "#4e8bf2" },
  { label: "UX / UI Design", icon: PenTool, items: skills.design, color: "#e0574c" },
  { label: "Programming", icon: Code2, items: skills.programming, color: "#3fb28f" },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionKicker index="03" label="Skills" />
        <h2 className="mb-14 text-4xl font-semibold sm:text-5xl">
          Tools of the craft.
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          {GROUPS.map((group) => (
            <div
              key={group.label}
              className="rounded-2xl border p-6"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              <div className="mb-5 flex items-center gap-2">
                <group.icon size={18} style={{ color: group.color }} />
                <h3 className="font-medium">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full px-3 py-1 font-mono text-xs"
                    style={{
                      color: group.color,
                      background: `${group.color}1a`,
                      border: `1px solid ${group.color}40`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
