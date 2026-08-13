import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";

const TRACK_SRC = "/audio/theme-song.mp3";
const TRACK_TITLE = "Add your song";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !available) {
      setOpen(true);
      return;
    }
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setAvailable(false));
      setPlaying(true);
      setOpen(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      <audio
        ref={audioRef}
        src={TRACK_SRC}
        preload="none"
        onError={() => setAvailable(false)}
      />

      {open && (
        <div
          className="flex items-center gap-3 rounded-full border py-2 pl-4 pr-2 shadow-lg backdrop-blur-xl"
          style={{
            borderColor: "rgb(var(--line))",
            background: "rgb(var(--bg-elevated) / 0.9)",
          }}
        >
          <span className="max-w-[9rem] truncate text-xs text-[rgb(var(--ink-dim))]">
            {available ? TRACK_TITLE : "Drop an mp3 in public/audio/"}
          </span>
          <EqBars playing={playing} />
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
        style={{
          borderColor: "rgb(var(--line))",
          background: "rgb(var(--bg-elevated) / 0.9)",
        }}
      >
        {playing ? (
          <Pause size={18} />
        ) : available ? (
          <Play size={18} className="ml-0.5" />
        ) : (
          <Music2 size={18} className="opacity-50" />
        )}
      </button>
    </div>
  );
}

function EqBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-4 items-end gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-0.5 rounded-full bg-[rgb(var(--accent))]"
          style={{
            height: playing ? undefined : "3px",
            animation: playing
              ? `eq 0.8s ease-in-out ${i * 0.12}s infinite alternate`
              : "none",
          }}
        />
      ))}
      <style>{`
        @keyframes eq {
          from { height: 3px; }
          to { height: 16px; }
        }
      `}</style>
    </div>
  );
}
