import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { contact, links, profile } from "../data/content";
import FoldText from "./FoldText";
import { GithubIcon, LinkedinIcon } from "./icons";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

const inputStyle = {
  borderColor: "rgb(var(--line-soft))",
  background: "rgb(var(--bg-soft))",
};

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const socials = [
    links.linkedin && { href: links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: links.github, icon: GithubIcon, label: "GitHub" },
  ].filter(Boolean) as { href: string; icon: typeof GithubIcon; label: string }[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio message from ${firstName} ${lastName}`.trim();
    const body = `${message}\n\n— ${firstName} ${lastName} (${email})`;
    window.location.href = `mailto:${contact.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <section id="contact" className="px-6 py-24 sm:px-12 sm:py-32">
        <div className="mx-auto grid max-w-5xl gap-16 sm:grid-cols-[280px_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/photos/selfie.jpg"
                alt={profile.name}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-xl font-semibold">{profile.name}</p>
                <span
                  className="mt-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  style={{ borderColor: "#22c55e55", color: "#22c55e" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  Available
                </span>
              </div>
            </div>

            <p className="mb-3 mt-10 font-mono text-xs uppercase tracking-widest text-[rgb(var(--ink-dim))]">
              Useful links
            </p>
            <div className="flex flex-wrap gap-2">
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  <LinkedinIcon size={15} />
                  LinkedIn
                </a>
              )}
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="cursor-target inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ borderColor: "rgb(var(--line))" }}
              >
                <GithubIcon size={15} />
                GitHub
              </a>
              <a
                href={`mailto:${contact.emails[0]}`}
                className="cursor-target inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: "rgb(var(--bg-soft))" }}
              >
                <Mail size={15} />
                {contact.emails[0]}
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">
              <FoldText
                text="Send me a message"
                splitBy="word"
                trigger="scroll"
                fontSize="inherit"
                fontWeight="inherit"
                color="inherit"
              />
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="cursor-target rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[rgb(var(--accent))]"
                  style={inputStyle}
                />
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="cursor-target rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[rgb(var(--accent))]"
                  style={inputStyle}
                />
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="cursor-target rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[rgb(var(--accent))]"
                style={inputStyle}
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows={6}
                className="cursor-target resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-[rgb(var(--accent))]"
                style={inputStyle}
              />
              <button
                type="submit"
                className="cursor-target mt-2 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                style={{ background: "rgb(var(--ink))", color: "rgb(var(--bg))" }}
              >
                Send
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer
        className="border-t px-6 py-16 sm:px-12"
        style={{
          borderColor: "rgb(var(--line))",
          background: "rgb(var(--bg-soft))",
        }}
      >
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
          <div>
            <p className="text-xl font-semibold">{profile.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[rgb(var(--ink-dim))]">
              {profile.tagline}
            </p>
          </div>

          <div>
            <p className="mb-4 font-semibold">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="cursor-target text-sm text-[rgb(var(--ink-dim))] transition-colors hover:text-[rgb(var(--ink))]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-semibold">Contact &amp; Networks</p>
            <div className="flex flex-col gap-2.5 text-sm text-[rgb(var(--ink-dim))]">
              <a
                href={`mailto:${contact.emails[0]}`}
                className="cursor-target flex items-center gap-2 transition-colors hover:text-[rgb(var(--ink))]"
              >
                <Mail size={14} />
                {contact.emails[0]}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                Phnom Penh, Cambodia
              </span>
            </div>

            <p className="mb-3 mt-6 text-sm font-medium">Follow me:</p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="cursor-target flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-[rgb(var(--bg-elevated))]"
                  style={{ borderColor: "rgb(var(--line))" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-5xl font-mono text-xs text-[rgb(var(--ink-dim))]">
          © {new Date().getFullYear()} {profile.name}.
        </p>
      </footer>
    </>
  );
}
