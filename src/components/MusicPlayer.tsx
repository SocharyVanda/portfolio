import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import { playlist } from "../data/content";

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
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = playlist[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setTrackIndex((i) => (i + 1) % playlist.length);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    if (playing) {
      audio.load();
      void audio.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

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

  const goTo = (delta: number) => {
    setTrackIndex((i) => (i + delta + playlist.length) % playlist.length);
    setPlaying(true);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      <audio ref={audioRef} src={track.src} preload="metadata" />

      {open && (
        <div
          className="w-80 rounded-2xl border p-6 shadow-2xl backdrop-blur-xl"
          style={{
            borderColor: "rgb(var(--line-soft))",
            background: "rgb(var(--bg-elevated) / 0.95)",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "rgb(var(--ink-dim))" }}
            >
              Now Playing
            </p>
            <p
              className="font-mono text-[10px] tracking-widest"
              style={{ color: "rgb(var(--ink-dim))" }}
            >
              {String(trackIndex + 1).padStart(2, "0")} / {String(playlist.length).padStart(2, "0")}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl"
              style={{ background: "rgb(var(--accent) / 0.15)" }}
            >
              <Music2 size={22} style={{ color: "rgb(var(--accent))" }} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium">{track.title}</p>
              {track.artist && (
                <p
                  className="truncate font-mono text-xs uppercase tracking-wide"
                  style={{ color: "rgb(var(--ink-dim))" }}
                >
                  {track.artist}
                </p>
              )}
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={seek}
            className="mt-5 h-1 w-full cursor-pointer appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, rgb(var(--accent)) ${
                duration ? (currentTime / duration) * 100 : 0
              }%, rgb(var(--bg-soft)) 0%)`,
              accentColor: "rgb(var(--accent))",
            }}
          />
          <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-[rgb(var(--ink-dim))]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              onClick={() => goTo(-1)}
              aria-label="Previous track"
              className="cursor-target text-[rgb(var(--ink-dim))] transition-colors hover:text-[rgb(var(--ink))]"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="cursor-target flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
              style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
            >
              {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>
            <button
              onClick={() => goTo(1)}
              aria-label="Next track"
              className="cursor-target text-[rgb(var(--ink-dim))] transition-colors hover:text-[rgb(var(--ink))]"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide music player" : "Show music player"}
        className="cursor-target flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
      >
        {open ? <X size={18} /> : <Music2 size={18} />}
      </button>
    </div>
  );
}
