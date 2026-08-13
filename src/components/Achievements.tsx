import { achievements } from "../data/content";
import InfoList from "./InfoList";

export default function Achievements() {
  return (
    <section id="awards" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-14 text-4xl font-semibold sm:text-5xl">
          Achievements.
        </h2>
        <InfoList items={achievements} />
      </div>
    </section>
  );
}
