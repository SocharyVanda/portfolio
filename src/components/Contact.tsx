import { ArrowRight, FileText, Mail, Send } from "lucide-react";
import { contact, links, profile } from "../data/content";
import SectionKicker from "./SectionKicker";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  const socials = [
    { href: links.github, icon: GithubIcon, label: "GitHub" },
    links.linkedin && { href: links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    links.telegram && { href: links.telegram, icon: Send, label: "Telegram" },
  ].filter(Boolean) as { href: string; icon: typeof GithubIcon; label: string }[];

  return (
    <section id="contact" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <SectionKicker index="07" label="Contact" />
        <h2 className="text-balance text-4xl font-semibold sm:text-6xl">
          Let's build something
          <br /> worth designing.
        </h2>
        <p className="mt-6 max-w-md text-[rgb(var(--ink-dim))]">
          Open to internships, collaborations and UX/UI work. Reach out — I
          usually reply within a day.
        </p>

        <a
          href={`mailto:${contact.emails[0]}`}
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
          style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
        >
          Get in touch
          <ArrowRight size={16} />
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-[rgb(var(--ink-dim))]">
          <a href={`mailto:${contact.emails[0]}`} className="hover:text-[rgb(var(--ink))]">
            {contact.emails[0]}
          </a>
          <span>·</span>
          <a href={`tel:${contact.tel}`} className="hover:text-[rgb(var(--ink))]">
            {contact.tel}
          </a>
          {links.cv && (
            <>
              <span>·</span>
              <a
                href={links.cv}
                className="inline-flex items-center gap-1 hover:text-[rgb(var(--ink))]"
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
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[rgb(var(--bg-soft))]"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              <Icon size={17} />
            </a>
          ))}
          <a
            href={`mailto:${contact.emails[0]}`}
            aria-label="Email"
            className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[rgb(var(--bg-soft))]"
            style={{ borderColor: "rgb(var(--line))" }}
          >
            <Mail size={17} />
          </a>
        </div>

        <p className="mt-20 font-mono text-xs text-[rgb(var(--ink-dim))]">
          © {new Date().getFullYear()} {profile.name}. Built with React &
          Tailwind.
        </p>
      </div>
    </section>
  );
}
