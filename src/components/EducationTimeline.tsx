import {
  Award,
  Code2,
  Globe,
  GraduationCap,
  Languages,
  School,
} from "lucide-react";
import type { ReactNode } from "react";
import { education } from "../data/content";

const ICONS: { match: (place: string) => boolean; icon: ReactNode; color: string }[] = [
  {
    match: (place) => place.includes("Paragon"),
    icon: <GraduationCap size={20} />,
    color: "#7c5cff",
  },
  {
    match: (place) => place.includes("IFC") || place.includes("Institut"),
    icon: <Globe size={20} />,
    color: "#38bdf8",
  },
  {
    match: (place) => place.includes("Beyond"),
    icon: <Code2 size={20} />,
    color: "#2dd4bf",
  },
  {
    match: (place) => place.includes("Russey Keo"),
    icon: <School size={20} />,
    color: "#f59e0b",
  },
  {
    match: (place) => place.includes("Sovannaphumi"),
    icon: <Languages size={20} />,
    color: "#f472b6",
  },
  {
    match: (place) => place.includes("ACE"),
    icon: <Award size={20} />,
    color: "#a3e635",
  },
];

function iconFor(place: string) {
  return ICONS.find((i) => i.match(place)) ?? ICONS[0];
}

export default function EducationTimeline() {
  return (
    <div className="relative">
      {education.map((item, i) => {
        const { icon, color } = iconFor(item.place ?? "");
        const isLast = i === education.length - 1;

        return (
          <div key={item.title + item.date} className="relative flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: "rgb(var(--bg))",
                  background: color,
                  color: "#0b0b0f",
                  boxShadow: "0 0 0 1px rgb(var(--line-soft))",
                }}
              >
                {icon}
              </span>
              {!isLast && (
                <span
                  className="w-px flex-1"
                  style={{ background: "rgb(var(--line-soft))" }}
                />
              )}
            </div>

            <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
              <div
                className="rounded-2xl border p-5"
                style={{
                  borderColor: "rgb(var(--line-soft))",
                  background: "rgb(var(--bg-elevated))",
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <div>
                    <p className="font-semibold">{item.place}</p>
                    {item.highlight && (
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                        style={{
                          color: "rgb(var(--ink-dim))",
                          background: "rgb(var(--bg-soft))",
                        }}
                      >
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <span
                    className="shrink-0 font-mono text-xs"
                    style={{ color: "rgb(var(--ink-dim))" }}
                  >
                    {item.note && (
                      <span
                        className="mr-2 inline-flex items-center gap-1.5"
                        style={{ color }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: color }}
                        />
                        {item.note}
                      </span>
                    )}
                    {item.date}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium" style={{ color }}>
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
