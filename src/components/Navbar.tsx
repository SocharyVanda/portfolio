import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile, links } from "../data/content";
import Dither from "./Dither";
import { GithubIcon } from "./icons";
import GooeyNav from "./GooeyNav";
import type { Theme } from "../hooks/useTheme";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({
  theme,
  onToggleTheme,
}: {
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`relative flex w-full max-w-4xl items-center justify-between gap-4 overflow-hidden rounded-full border px-4 py-2.5 backdrop-blur-2xl backdrop-saturate-150 transition-shadow ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
        style={{
          borderColor: "rgb(255 255 255 / 0.15)",
          background: "rgb(8 9 12 / 0.55)",
          boxShadow: scrolled
            ? undefined
            : "inset 0 1px 0 rgb(255 255 255 / 0.08)",
        }}
      >
        {/* This pill always sits on the Dither canvas below, so its own
            content is fixed light regardless of the site theme. */}
        <div className="pointer-events-none absolute inset-0">
          <Dither
            waveColor={[0.24, 0.2, 0.42]}
            colorNum={4}
            pixelSize={2}
            waveAmplitude={0.25}
            waveFrequency={4}
            waveSpeed={0.04}
            enableMouseInteraction={false}
          />
        </div>

        <a
          href="#top"
          className="cursor-target flex shrink-0 items-center gap-2 pl-1 text-sm font-medium text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--accent))] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
          </span>
          {profile.handle}
        </a>

        <div className="hidden lg:block">
          <GooeyNav items={NAV_ITEMS} animationTime={600} timeVariance={300} />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="cursor-target hidden h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:flex"
          >
            <GithubIcon size={16} />
          </a>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="cursor-target flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="cursor-target flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="absolute top-16 flex w-[calc(100%-2rem)] max-w-4xl flex-col gap-1 rounded-2xl border p-2 backdrop-blur-xl lg:hidden"
          style={{
            borderColor: "rgb(var(--line))",
            background: "rgb(var(--bg-elevated) / 0.95)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="cursor-target rounded-xl px-4 py-2.5 text-sm text-[rgb(var(--ink-dim))] transition-colors hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--ink))]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
