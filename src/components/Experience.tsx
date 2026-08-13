import { education, experience } from "../data/content";
import InfoList from "./InfoList";
import TrueFocus from "./TrueFocus";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <TrueFocus
          sentence="Where I've been."
          className="mb-14 text-4xl font-semibold sm:text-5xl"
          style={{ justifyContent: "flex-start" }}
        />

        <div className="mb-16">
          <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-[rgb(var(--ink-dim))]">
            Work
          </h3>
          <InfoList items={experience} />
        </div>

        <div>
          <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-[rgb(var(--ink-dim))]">
            Education
          </h3>
          <InfoList items={education} />
        </div>
      </div>
    </section>
  );
}
