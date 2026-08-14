import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, X } from "lucide-react";
import { nowPlaying } from "../data/content";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio.play();
      setPlaying(true);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3">
      <audio ref={audioRef} src={nowPlaying.src} preload="metadata" />

      {open && (
        <div
          className="w-72 rounded-2xl border p-4 shadow-lg backdrop-blur-xl"
          style={{
            borderColor: "rgb(var(--line))",
            background: "rgb(var(--bg-elevated) / 0.9)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="cursor-target flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[rgb(var(--bg))]"
              style={{ background: "rgb(var(--ink))" }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{nowPlaying.title}</p>
              <p className="truncate text-xs text-[rgb(var(--ink-dim))]">
                {nowPlaying.artist}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[10px] text-[rgb(var(--ink-dim))]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={seek}
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(to right, rgb(var(--accent)) ${
                  duration ? (currentTime / duration) * 100 : 0
                }%, rgb(var(--bg-soft)) 0%)`,
                accentColor: "rgb(var(--accent))",
              }}
            />
            <span className="font-mono text-[10px] text-[rgb(var(--ink-dim))]">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide music player" : "Show music player"}
        className="cursor-target flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
        style={{
          borderColor: "rgb(var(--line))",
          background: "rgb(var(--bg-elevated) / 0.9)",
        }}
      >
        {open ? <X size={18} /> : <Music2 size={18} />}
      </button>
    </div>
  );
}
