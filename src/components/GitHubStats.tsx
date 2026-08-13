import { useEffect, useState } from "react";
import { GitFork, GitPullRequest, Star, Users } from "lucide-react";
import { links } from "../data/content";
import SectionKicker from "./SectionKicker";

const USERNAME = "SocharyVanda";

type GhUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

type GhRepo = {
  name: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

type GhEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { ref_type?: string; action?: string };
};

function describeEvent(event: GhEvent): string {
  switch (event.type) {
    case "PushEvent":
      return `Pushed to ${event.repo.name}`;
    case "CreateEvent":
      return `Created ${event.payload.ref_type ?? "repository"} in ${event.repo.name}`;
    case "WatchEvent":
      return `Starred ${event.repo.name}`;
    case "ForkEvent":
      return `Forked ${event.repo.name}`;
    case "PullRequestEvent":
      return `${event.payload.action ?? "Updated"} a pull request in ${event.repo.name}`;
    case "IssuesEvent":
      return `${event.payload.action ?? "Updated"} an issue in ${event.repo.name}`;
    case "PublicEvent":
      return `Made ${event.repo.name} public`;
    default:
      return `Activity in ${event.repo.name}`;
  }
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function GitHubStats() {
  const [user, setUser] = useState<GhUser | null>(null);
  const [events, setEvents] = useState<GhEvent[]>([]);
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [userRes, eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${USERNAME}/events/public`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
            { signal: controller.signal },
          ),
        ]);

        if (!userRes.ok) throw new Error("user fetch failed");

        const userData: GhUser = await userRes.json();
        setUser(userData);

        if (eventsRes.ok) {
          const eventData: GhEvent[] = await eventsRes.json();
          setEvents(eventData.slice(0, 5));
        }

        if (reposRes.ok) {
          const repoData: GhRepo[] = await reposRes.json();
          setTotalStars(
            repoData.reduce((sum, r) => sum + r.stargazers_count, 0),
          );
        }

        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <section
      id="github"
      className="px-6 py-24 sm:px-12 sm:py-32"
      style={{ background: "rgb(var(--bg-elevated))" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionKicker index="05" label="GitHub" />
            <h2 className="text-4xl font-semibold sm:text-5xl">
              Coding activity.
            </h2>
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border px-4 py-2 text-sm transition-colors hover:bg-[rgb(var(--bg-soft))]"
            style={{ borderColor: "rgb(var(--line))" }}
          >
            @{USERNAME} ↗
          </a>
        </div>

        {status === "error" && (
          <p className="mb-8 text-sm text-[rgb(var(--ink-dim))]">
            Live stats are momentarily unavailable (GitHub API rate limit or
            offline) — visit the profile directly via the link above.
          </p>
        )}

        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          <StatCard
            icon={Users}
            label="Followers"
            value={user?.followers}
            unavailable={status !== "ready"}
          />
          <StatCard
            icon={GitFork}
            label="Public Repos"
            value={user?.public_repos}
            unavailable={status !== "ready"}
          />
          <StatCard
            icon={Star}
            label="Total Stars"
            value={totalStars ?? undefined}
            unavailable={status !== "ready"}
          />
          <StatCard
            icon={GitPullRequest}
            label="Following"
            value={user?.following}
            unavailable={status !== "ready"}
          />
        </div>

        <div
          className="mb-8 overflow-x-auto rounded-2xl border p-6"
          style={{ borderColor: "rgb(var(--line))" }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[rgb(var(--ink-dim))]">
            Contribution graph
          </p>
          <img
            src={`https://ghchart.rshah.org/a8ff60/${USERNAME}`}
            alt={`${USERNAME} GitHub contribution chart`}
            className="min-w-[640px]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: "rgb(var(--line))" }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[rgb(var(--ink-dim))]">
            Recent activity
          </p>
          {status === "loading" && (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-5 w-2/3 animate-pulse rounded"
                  style={{ background: "rgb(var(--bg-soft))" }}
                />
              ))}
            </div>
          )}
          {status === "ready" && events.length === 0 && (
            <p className="text-sm text-[rgb(var(--ink-dim))]">
              No recent public activity.
            </p>
          )}
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span>{describeEvent(event)}</span>
                <span className="shrink-0 font-mono text-xs text-[rgb(var(--ink-dim))]">
                  {timeAgo(event.created_at)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unavailable,
}: {
  icon: typeof Users;
  label: string;
  value: number | undefined;
  unavailable: boolean;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: "rgb(var(--line))" }}
    >
      <Icon size={16} className="mb-3 text-[rgb(var(--ink-dim))]" />
      <p className="text-2xl font-semibold">
        {unavailable ? "—" : (value ?? 0)}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
        {label}
      </p>
    </div>
  );
}
