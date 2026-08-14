import { useState } from "react";
import { Music2, X } from "lucide-react";
import { spotifyTrackId } from "../data/content";

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3">
      {open && (
        <div
          className="overflow-hidden rounded-2xl shadow-lg"
          style={{ lineHeight: 0 }}
        >
          <iframe
            title="Spotify player"
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator`}
            width="300"
            height="152"
            style={{ border: 0, display: "block" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
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
