import { achievements } from "../data/content";
import DecryptedText from "./DecryptedText";
import FoldText from "./FoldText";

const paper = {
  bg: "#f3ede1",
  ink: "#18140d",
  dim: "#7a7263",
  line: "rgba(24, 20, 13, 0.22)",
};

const BARCODE_BARS = [
  2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1, 2, 1,
  1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 1, 3,
];

function Barcode() {
  return (
    <div className="flex h-10 items-stretch justify-center gap-[2px]">
      {BARCODE_BARS.map((w, i) => (
        <span key={i} style={{ width: w, background: paper.ink }} />
      ))}
    </div>
  );
}

function CornerMark({
  className,
}: {
  className: string;
}) {
  return (
    <span
      className={`absolute h-3 w-3 ${className}`}
      style={{ borderColor: paper.ink }}
    />
  );
}

export default function Achievements() {
  return (
    <section id="awards" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-md text-center">
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
        <p className="mx-auto mb-12 max-w-sm text-[rgb(var(--ink-dim))]">
          Recognition earned along the way, from competitions to
          scholarships.
        </p>

        <div
          className="relative mx-auto max-w-sm border shadow-xl"
          style={{ background: paper.bg, borderColor: paper.line }}
        >
          <CornerMark className="left-2 top-2 border-l border-t" />
          <CornerMark className="right-2 top-2 border-r border-t" />
          <CornerMark className="bottom-2 left-2 border-b border-l" />
          <CornerMark className="bottom-2 right-2 border-b border-r" />

          <div className="px-8 py-8 font-mono" style={{ color: paper.ink }}>
            <p className="text-center text-xs uppercase tracking-[0.4em]">
              [ ticket ]
            </p>
            <div
              className="mt-6 border-t border-dashed"
              style={{ borderColor: paper.line }}
            />

            <div className="mt-1">
              {achievements.map((item) => (
                <div
                  key={item.title + item.date}
                  className="border-b border-dashed py-4 text-left"
                  style={{ borderColor: paper.line }}
                >
                  <p className="text-sm font-semibold leading-snug">
                    <DecryptedText
                      text={item.title}
                      animateOn="view"
                      sequential
                      revealDirection="start"
                      speed={22}
                      encryptedClassName="opacity-40"
                    />
                  </p>
                  {item.place && (
                    <p
                      className="mt-1 text-[11px] leading-snug"
                      style={{ color: paper.dim }}
                    >
                      {item.place}
                    </p>
                  )}
                  <p
                    className="mt-2 text-right text-[11px] uppercase tracking-widest"
                    style={{ color: paper.dim }}
                  >
                    {item.date}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Barcode />
              <p className="mt-2 text-center text-[10px] tracking-[0.35em]">
                SOCHARY.VANDA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
