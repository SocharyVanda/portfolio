import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { profile, links } from "../data/content";
import { GithubIcon } from "./icons";
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
        className={`flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-lg shadow-black/10" : ""
        }`}
        style={{
          borderColor: "rgb(var(--line))",
          background: "rgb(var(--bg-elevated) / 0.75)",
        }}
      >
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2 pl-1 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--accent))] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
          </span>
          {profile.handle}
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-[rgb(var(--ink-dim))] transition-colors hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--ink))]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-8 w-8 items-center justify-center rounded-full text-[rgb(var(--ink-dim))] transition-colors hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--ink))] sm:flex"
          >
            <GithubIcon size={16} />
          </a>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[rgb(var(--ink-dim))] transition-colors hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--ink))]"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[rgb(var(--ink-dim))] transition-colors hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--ink))] lg:hidden"
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
              className="rounded-xl px-4 py-2.5 text-sm text-[rgb(var(--ink-dim))] transition-colors hover:bg-[rgb(var(--bg-soft))] hover:text-[rgb(var(--ink))]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
