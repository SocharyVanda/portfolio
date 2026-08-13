import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import "./TrueFocus.css";

type FocusStyle = CSSProperties & {
  "--border-color"?: string;
  "--glow-color"?: string;
};

export default function TrueFocus({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  loop = true,
  blurAmount = 6,
  borderColor = "rgb(var(--accent))",
  glowColor = "rgb(var(--accent) / 0.55)",
  animationDuration = 0.6,
  pauseBetweenAnimations = 1.5,
  className = "",
  style,
}: {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  /** When false, the animation runs through the words once and then
   * settles with everything in focus, instead of cycling forever. */
  loop?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode || finished) return;
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= words.length) {
            if (!loop) {
              setFinished(true);
              return prev;
            }
            return 0;
          }
          return next;
        });
      },
      (animationDuration + pauseBetweenAnimations) * 1000,
    );
    return () => clearInterval(interval);
  }, [manualMode, loop, finished, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const word = wordRefs.current[currentIndex];
    if (!word || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = word.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (!manualMode) return;
    setLastActiveIndex(index);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (!manualMode) return;
    setCurrentIndex(lastActiveIndex ?? 0);
  };

  return (
    <div
      className={`focus-container ${className}`}
      ref={containerRef}
      style={style}
    >
      {words.map((word, index) => {
        const isActive = finished || index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${isActive ? "active" : ""}`}
            style={
              {
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
                transition: `filter ${animationDuration}s ease`,
              } as FocusStyle
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: finished ? 0 : focusRect.width ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as FocusStyle
        }
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
}
