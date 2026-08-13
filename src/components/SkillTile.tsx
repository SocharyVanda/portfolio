import { useState, type ReactNode } from "react";

export default function SkillTile({
  name,
  bg,
  fg,
  children,
}: {
  name: string;
  bg: string;
  fg: string;
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
        borderColor: "rgb(var(--line))",
        background: "rgb(var(--bg-soft))",
      }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold sm:h-11 sm:w-11 sm:text-sm"
        style={{ background: bg, color: fg }}
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
