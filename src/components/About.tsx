import { profile } from "../data/content";
import TrueFocus from "./TrueFocus";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <TrueFocus
          sentence="Curious, analytical & creative."
          className="text-4xl font-semibold leading-[1.1] sm:text-5xl"
          style={{ justifyContent: "flex-start" }}
        />
        <p className="mt-6 leading-relaxed text-[rgb(var(--ink-dim))]">
          {profile.bio}
        </p>
        <div
          className="mt-8 rounded-2xl border p-5"
          style={{ borderColor: "rgb(var(--line))" }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
            Career goal
          </p>
          <p className="mt-2 text-sm leading-relaxed">{profile.careerGoal}</p>
        </div>
      </div>
    </section>
  );
}
