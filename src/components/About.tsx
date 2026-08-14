import { profile } from "../data/content";
import FoldText from "./FoldText";

export default function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto grid max-w-4xl items-start gap-10 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-14">
        <div className="mx-auto w-full max-w-[260px] sm:mx-0">
          <div
            className="overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(124,92,255,0.35)]"
            style={{ borderColor: "rgb(var(--line-soft))" }}
          >
            <img
              src="/photos/selfie.jpg"
              alt={profile.name}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl">
            <FoldText
              text={"Curious, analytical\n& creative."}
              splitBy="word"
              trigger="scroll"
              fontSize="inherit"
              fontWeight="inherit"
              color="inherit"
            />
          </h2>
          <p className="mt-6 leading-relaxed text-[rgb(var(--ink-dim))]">
            {profile.bio}
          </p>
          <div
            className="mt-8 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(124,92,255,0.35)]"
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
      </div>
    </section>
  );
}
