import { ArrowDownRight } from "lucide-react";
import { profile } from "../data/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full overflow-hidden"
    >
      {/* paper / grain half */}
      <div
        className="grain absolute inset-y-0 left-0 isolate w-full sm:w-[58%]"
        style={{ background: "#ece8df" }}
      >
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(#0b0b0b 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* ink / black half */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[42%] sm:block"
        style={{ background: "#0b0b0b" }}
      >
        <HeroGraphic />
      </div>

      {/* content, paper side */}
      <div className="relative z-10 flex w-full flex-col justify-between px-6 pt-28 pb-16 sm:w-[58%] sm:px-12 sm:pt-32 sm:pb-20">
        <div>
          <p
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest"
            style={{ borderColor: "#0b0b0b33", color: "#0b0b0b" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0b0b0b]" />
            CS Student · UX/UI Designer
          </p>
          <h1
            className="max-w-xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            style={{ color: "#0b0b0b" }}
          >
            Where logic meets aesthetic.
          </h1>
          <p
            className="mt-6 max-w-md text-base leading-relaxed sm:text-lg"
            style={{ color: "#0b0b0b99" }}
          >
            {profile.tagline} Building interfaces that are as functional as
            they are beautiful — one project at a time.
          </p>
          <a
            href="#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: "#0b0b0b", color: "#ece8df" }}
          >
            View my work
            <ArrowDownRight size={16} />
          </a>
        </div>

        <div className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest" style={{ color: "#0b0b0b66" }}>
          <span>Phnom Penh, Cambodia</span>
          <span className="h-1 w-1 rounded-full" style={{ background: "#0b0b0b66" }} />
          <span>Est. 2024</span>
        </div>
      </div>

      {/* giant wordmark straddling the seam, blend-difference so it inverts per-half automatically */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[38%] z-20 hidden items-center sm:flex"
        style={{ mixBlendMode: "difference" }}
      >
        <span
          className="select-none whitespace-nowrap font-semibold uppercase [writing-mode:vertical-rl] rotate-180"
          style={{
            color: "#ffffff",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {profile.name}
        </span>
      </div>

      {/* mobile wordmark, horizontal, bottom of paper panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center sm:hidden"
        style={{ mixBlendMode: "difference" }}
      >
        <span
          className="select-none whitespace-nowrap font-semibold uppercase"
          style={{
            color: "#ffffff",
            fontSize: "clamp(2rem, 11vw, 3.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {profile.name}
        </span>
      </div>
    </section>
  );
}

function HeroGraphic() {
  return (
    <svg
      viewBox="0 0 400 800"
      className="absolute inset-0 h-full w-full opacity-90"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#a8ff60" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#a8ff60" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="800" fill="url(#glow)" />
      <g stroke="#f5f5f0" strokeOpacity="0.35" fill="none" strokeWidth="1">
        <circle cx="210" cy="280" r="120" />
        <ellipse cx="210" cy="280" rx="170" ry="60" />
        <ellipse cx="210" cy="280" rx="60" ry="170" />
      </g>
      <g stroke="#a8ff60" strokeWidth="1.5" fill="none">
        <rect x="60" y="470" width="90" height="60" rx="8" strokeOpacity="0.8" />
        <rect x="190" y="520" width="70" height="46" rx="8" strokeOpacity="0.5" />
      </g>
      <g fill="#f5f5f0">
        <circle cx="90" cy="150" r="2.5" opacity="0.8" />
        <circle cx="320" cy="120" r="2" opacity="0.6" />
        <circle cx="300" cy="620" r="2.5" opacity="0.7" />
        <circle cx="70" cy="640" r="2" opacity="0.5" />
        <circle cx="340" cy="380" r="2" opacity="0.6" />
      </g>
      <path
        d="M40 700 L360 700"
        stroke="#f5f5f0"
        strokeOpacity="0.2"
        strokeDasharray="2 6"
      />
      <text
        x="40"
        y="740"
        fill="#f5f5f0"
        fillOpacity="0.5"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="12"
        letterSpacing="1"
      >
        // sophomore.cs · ux-ui
      </text>
    </svg>
  );
}
