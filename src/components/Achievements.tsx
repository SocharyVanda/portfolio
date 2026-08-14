import { achievements } from "../data/content";
import Cubes from "./Cubes";
import FoldText from "./FoldText";
import InfoList from "./InfoList";

export default function Achievements() {
  return (
    <section id="awards" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2 sm:gap-16">
        <div>
          <p
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            style={{ color: "rgb(var(--accent))" }}
          >
            // achievements
          </p>
          <h2 className="mb-3 text-4xl font-semibold sm:text-5xl">
            <FoldText
              text="Achievements."
              splitBy="word"
              trigger="scroll"
              fontSize="inherit"
              fontWeight="inherit"
              color="inherit"
            />
          </h2>
          <p className="mb-10 max-w-md text-[rgb(var(--ink-dim))]">
            Recognition earned along the way, from competitions to
            scholarships.
          </p>
          <InfoList items={achievements} />
        </div>

        <div className="flex items-center justify-center">
          <div
            className="w-full max-w-sm overflow-hidden rounded-2xl border p-8"
            style={{
              borderColor: "rgb(var(--line-soft))",
              background: "rgb(var(--bg-elevated))",
            }}
          >
            <Cubes
              gridSize={6}
              maxAngle={50}
              radius={2.2}
              borderStyle="1px solid rgb(60 58 74)"
              faceColor="#15121c"
              rippleColor="#7c5cff"
              rippleSpeed={1.4}
              autoAnimate
              rippleOnClick
            />
          </div>
        </div>
      </div>
    </section>
  );
}
