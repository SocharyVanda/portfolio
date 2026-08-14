import { ArrowRight, FileText, Mail, Send } from "lucide-react";
import { contact, links, profile } from "../data/content";
import Dither from "./Dither";
import FoldText from "./FoldText";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  const socials = [
    { href: links.github, icon: GithubIcon, label: "GitHub" },
    links.linkedin && { href: links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    links.telegram && { href: links.telegram, icon: Send, label: "Telegram" },
  ].filter(Boolean) as { href: string; icon: typeof GithubIcon; label: string }[];

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 sm:px-12 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Dither
          waveColor={[0.24, 0.2, 0.42]}
          colorNum={4}
          pixelSize={2}
          waveAmplitude={0.28}
          waveFrequency={3.5}
          waveSpeed={0.05}
          enableMouseInteraction={false}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgb(8 9 12 / 0.6) 0%, rgb(8 9 12 / 0.1) 65%, transparent 100%)",
        }}
      />

      {/* This section always sits on the Dither canvas above, so its own
          content is fixed light/dark regardless of the site theme. */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center text-white">
        <h2 className="text-balance text-4xl font-semibold sm:text-6xl">
          <FoldText
            text={"Let's build something\nworth designing."}
            splitBy="word"
            trigger="scroll"
            fontSize="inherit"
            fontWeight="inherit"
            color="inherit"
          />
        </h2>
        <p className="mt-6 max-w-md text-white/60">
          Open to internships, collaborations and UX/UI work. Reach out — I
          usually reply within a day.
        </p>

        <a
          href={`mailto:${contact.emails[0]}`}
          className="cursor-target mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
        >
          Get in touch
          <ArrowRight size={16} />
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-white/60">
          <a href={`mailto:${contact.emails[0]}`} className="cursor-target hover:text-white">
            {contact.emails[0]}
          </a>
          <span>·</span>
          <a href={`tel:${contact.tel}`} className="cursor-target hover:text-white">
            {contact.tel}
          </a>
          {links.cv && (
            <>
              <span>·</span>
              <a
                href={links.cv}
                className="cursor-target inline-flex items-center gap-1 hover:text-white"
              >
                <FileText size={12} />
                Resume
              </a>
            </>
          )}
        </div>

        <div className="mt-10 flex items-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="cursor-target flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
            >
              <Icon size={17} />
            </a>
          ))}
          <a
            href={`mailto:${contact.emails[0]}`}
            aria-label="Email"
            className="cursor-target flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <Mail size={17} />
          </a>
        </div>

        <p className="mt-20 font-mono text-xs text-white/50">
          © {new Date().getFullYear()} {profile.name}.
        </p>
      </div>
    </section>
  );
}
