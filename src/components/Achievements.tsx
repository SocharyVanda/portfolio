import { achievements } from "../data/content";
import CursorGrid from "./CursorGrid";
import FoldText from "./FoldText";
import InfoList from "./InfoList";

export default function Achievements() {
  return (
    <section id="awards" className="relative overflow-hidden px-6 py-24 sm:px-12 sm:py-32">
      <div className="absolute inset-0">
        <CursorGrid
          cellSize={64}
          color="#7c5cff"
          radius={160}
          falloff="smooth"
          holdTime={350}
          fadeDuration={700}
          lineWidth={1}
          maxOpacity={0.5}
          fillOpacity={0.05}
          gridOpacity={0.04}
          clickPulse={false}
        />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <h2 className="mb-14 text-4xl font-semibold sm:text-5xl">
          <FoldText
            text="Achievements."
            splitBy="word"
            trigger="scroll"
            fontSize="inherit"
            fontWeight="inherit"
            color="inherit"
          />
        </h2>
        <InfoList items={achievements} />
      </div>
    </section>
  );
}
