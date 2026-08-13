import { ArrowDownRight } from "lucide-react";
import { profile } from "../data/content";
import { portraitAscii } from "../data/asciiArt";
import TrueFocus from "./TrueFocus";

export default function AsciiHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-12 sm:pt-40"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]" style={{ borderColor: "rgb(var(--line))" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
          CS Student · UX/UI Designer
        </p>

        <TrueFocus
          sentence="Curious by design, precise by practice."
          animationDuration={0.6}
          pauseBetweenAnimations={1.4}
          className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
        />

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-[rgb(var(--ink-dim))] sm:text-base">
          {profile.tagline} From code to canvas, I explore where computer
          science meets UX/UI design.
        </p>

        <a
          href="#projects"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
          style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
        >
          View my work
          <ArrowDownRight size={16} />
        </a>
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <pre
          aria-hidden
          className="select-none overflow-hidden text-center leading-none tracking-[-0.02em]"
          style={{
            color: "rgb(var(--ink))",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(3.5px, 0.85vw, 8.5px)",
          }}
        >
          {portraitAscii}
        </pre>
        <p className="sr-only">
          ASCII-art portrait of {profile.name}, generated from a photo.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
        <span>Phnom Penh, Cambodia</span>
        <span>portrait.ascii · 130×76</span>
        <span>[ scroll to explore ]</span>
      </div>
    </section>
  );
}
