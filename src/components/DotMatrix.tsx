// An original, generative dot-matrix "energy cluster" graphic — an organic
// blob shape built from a radial falloff plus an angular wobble for an
// irregular edge, with per-dot size/opacity jitter for texture. Not a
// reproduction of any existing artwork.
const COLS = 34;
const ROWS = 34;
const CX = COLS / 2;
const CY = ROWS / 2;
const MAX_R = Math.min(COLS, ROWS) / 2;

function hashJitter(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

type Dot = { x: number; y: number; r: number; opacity: number };

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const dx = x - CX + 0.5;
      const dy = y - CY + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const wobble =
        Math.sin(angle * 5 + 0.6) * 0.9 + Math.sin(angle * 3 - 1.1) * 0.6;
      const edge = MAX_R * 0.66 + wobble;
      if (dist > edge) continue;

      const t = 1 - dist / edge;
      const jitter = hashJitter(x, y);
      const opacity = Math.max(0.05, Math.min(1, t * 1.2 - jitter * 0.35));
      if (opacity < 0.07) continue;
      const r = 1.1 + t * 1.7 + jitter * 0.4;

      dots.push({ x, y, r, opacity });
    }
  }
  return dots;
}

const DOTS = buildDots();

export default function DotMatrix({ color = "#a8ff60" }: { color?: string }) {
  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {DOTS.map((d, i) => (
        <circle
          key={i}
          cx={d.x + 0.5}
          cy={d.y + 0.5}
          r={d.r / 4}
          fill={color}
          opacity={d.opacity}
        />
      ))}
    </svg>
  );
}
