import { ArrowDownRight } from "lucide-react";
import { profile } from "../data/content";
import Lanyard from "./Lanyard";
import TrueFocus from "./TrueFocus";

export default function AsciiHero() {
  return (
    <section
      id="top"
      className="relative px-6 pb-20 pt-32 sm:px-12 sm:pt-40"
    >
      <div className="pointer-events-none absolute right-4 top-0 hidden h-[620px] w-[300px] sm:right-10 sm:block sm:w-[360px] lg:right-16">
        <div className="pointer-events-auto h-full w-full">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            frontImage="/photos/lanyard.jpg"
            backImage="/photos/lanyard.jpg"
            imageFit="cover"
          />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]" style={{ borderColor: "rgb(var(--line))" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
          CS Student · UX/UI Designer
        </p>

        <TrueFocus
          sentence={profile.name}
          loop={false}
          blurAmount={5}
          animationDuration={0.45}
          pauseBetweenAnimations={0.35}
          className="font-display text-6xl font-semibold leading-[1.05] tracking-tight sm:text-8xl"
        />

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-[rgb(var(--ink-dim))] sm:text-base">
          {profile.tagline} From code to canvas, I explore where computer
          science meets UX/UI design.
        </p>

        <a
          href="#projects"
          className="cursor-target mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
          style={{ background: "rgb(var(--button-bg))", color: "rgb(var(--button-ink))" }}
        >
          View my work
          <ArrowDownRight size={16} />
        </a>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
        <span>Phnom Penh, Cambodia</span>
        <span>[ scroll to explore ]</span>
      </div>
    </section>
  );
}
