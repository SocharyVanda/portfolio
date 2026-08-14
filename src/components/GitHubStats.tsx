import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Activity,
  CircleDot,
  GitBranch,
  GitCommit,
  GitFork,
  GitMerge,
  GitPullRequest,
  Star,
} from "lucide-react";
import { GithubIcon } from "./icons";
import { links } from "../data/content";
import FoldText from "./FoldText";

const USERNAME = "SocharyVanda";
const CELL = 11;
const GAP = 3;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type GhEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    ref_type?: string;
    ref?: string;
    action?: string;
    number?: number;
    commits?: { message: string }[];
    pull_request?: { title?: string; merged?: boolean };
    issue?: { number?: number; title?: string };
  };
};
type GhProfile = { public_repos: number; followers: number };

type EventVisual = {
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
  color: string;
};

function eventVisual(event: GhEvent): EventVisual {
  const repo = event.repo.name;
  switch (event.type) {
    case "PushEvent": {
      const branch = event.payload.ref?.replace("refs/heads/", "") ?? "main";
      const lastCommit = event.payload.commits?.at(-1);
      return {
        icon: <GitCommit size={16} />,
        title: repo,
        description: lastCommit?.message ?? `Pushed to ${repo}`,
        tag: branch,
        color: "#2dd4bf",
      };
    }
    case "PullRequestEvent": {
      const num = event.payload.number;
      const merged = event.payload.pull_request?.merged;
      const verb = merged
        ? "Merged"
        : event.payload.action === "opened"
          ? "Opened"
          : event.payload.action === "closed"
            ? "Closed"
            : "Updated";
      const title = event.payload.pull_request?.title;
      return {
        icon: merged ? <GitMerge size={16} /> : <GitPullRequest size={16} />,
        title: repo,
        description: `${verb} PR${num ? ` #${num}` : ""}${title ? `: ${title}` : ""}`,
        tag: num ? `#${num}` : undefined,
        color: "#7c5cff",
      };
    }
    case "WatchEvent":
      return {
        icon: <Star size={16} />,
        title: repo,
        description: `Starred ${repo}`,
        tag: "starred",
        color: "#f59e0b",
      };
    case "ForkEvent":
      return {
        icon: <GitFork size={16} />,
        title: repo,
        description: `Forked ${repo}`,
        tag: "forked",
        color: "#f472b6",
      };
    case "CreateEvent": {
      const refType = event.payload.ref_type ?? "repository";
      return {
        icon: <GitBranch size={16} />,
        title: repo,
        description: `Created ${refType}${event.payload.ref ? ` "${event.payload.ref}"` : ""} in ${repo}`,
        tag: event.payload.ref ?? refType,
        color: "#38bdf8",
      };
    }
    case "IssuesEvent": {
      const num = event.payload.issue?.number;
      const title = event.payload.issue?.title;
      return {
        icon: <CircleDot size={16} />,
        title: repo,
        description: `${event.payload.action ?? "Updated"} issue${num ? ` #${num}` : ""}${title ? `: ${title}` : ""}`,
        tag: num ? `#${num}` : undefined,
        color: "#a3e635",
      };
    }
    default:
      return {
        icon: <Activity size={16} />,
        title: repo,
        description: `Activity in ${repo}`,
        color: "#9ca3af",
      };
  }
}

function timeAgo(iso: string): string {
  const hours = Math.floor((Date.now() - new Date(iso).getTime()) / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function GitHubStats() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [events, setEvents] = useState<GhEvent[]>([]);
  const [profile, setProfile] = useState<GhProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [calRes, eventsRes, profileRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
            { signal: controller.signal },
          ),
          fetch(`https://api.github.com/users/${USERNAME}/events/public`, {
            signal: controller.signal,
          }),
          fetch(`https://api.github.com/users/${USERNAME}`, {
            signal: controller.signal,
          }),
        ]);

        if (!calRes.ok) throw new Error("calendar fetch failed");
        const calData: { contributions: Day[] } = await calRes.json();
        setDays(calData.contributions);

        if (eventsRes.ok) {
          const eventData: GhEvent[] = await eventsRes.json();
          setEvents(eventData.slice(0, 5));
        }

        if (profileRes.ok) {
          const profileData: GhProfile = await profileRes.json();
          setProfile(profileData);
        }

        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const { weeks, monthLabels, total } = useMemo(() => {
    if (!days) return { weeks: [] as (Day | null)[][], monthLabels: [] as (string | null)[], total: 0 };

    const leadPad = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const cells: (Day | null)[] = [
      ...Array(leadPad).fill(null),
      ...days,
    ];

    const weeks: (Day | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    let lastMonth = -1;
    const monthLabels = weeks.map((week) => {
      const first = week.find((d) => d);
      if (!first) return null;
      const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        return MONTHS[month];
      }
      return null;
    });

    const total = days.reduce((sum, d) => sum + d.count, 0);

    return { weeks, monthLabels, total };
  }, [days]);

  const levelColor = (level: number) => {
    if (level === 0) return "rgb(var(--bg-soft))";
    const alpha = [0, 0.32, 0.55, 0.78, 1][level];
    return `rgb(var(--accent) / ${alpha})`;
  };

  const statCardStyle = {
    borderColor: "rgb(var(--line))",
    background: "rgb(var(--bg-soft))",
  };

  return (
    <section id="github" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-4xl font-semibold sm:text-5xl">
          <FoldText
            text="GitHub contributions"
            splitBy="word"
            trigger="scroll"
            fontSize="inherit"
            fontWeight="inherit"
            color="inherit"
          />
        </h2>
        <p className="mb-14 max-w-lg text-[rgb(var(--ink-dim))]">
          A year of commits, reviews, and late-night pushes.
        </p>

        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{ borderColor: "rgb(var(--line))", background: "rgb(var(--bg-soft))" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-[rgb(var(--accent))]"
            >
              <GithubIcon size={18} />@{USERNAME}
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[rgb(var(--ink-dim))] hover:text-[rgb(var(--ink))]"
            >
              View profile ↗
            </a>
          </div>

          {status === "error" && (
            <p className="py-6 text-sm text-[rgb(var(--ink-dim))]">
              Live activity is momentarily unavailable — visit the profile
              directly via the link above.
            </p>
          )}

          {status !== "error" && (
            <div className="scroll-thin overflow-x-auto pb-2">
              {status === "loading" ? (
                <div
                  className="animate-pulse rounded-lg"
                  style={{
                    background: "rgb(var(--bg-elevated))",
                    height: 7 * (CELL + GAP),
                    width: 52 * (CELL + GAP),
                  }}
                />
              ) : (
                <div style={{ width: weeks.length * (CELL + GAP) }}>
                  <div
                    className="mb-1 grid"
                    style={{
                      gridTemplateColumns: `repeat(${weeks.length}, ${CELL + GAP}px)`,
                    }}
                  >
                    {monthLabels.map((label, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-[rgb(var(--ink-dim))]"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <div
                    className="grid grid-flow-col"
                    style={{
                      gridTemplateRows: `repeat(7, ${CELL}px)`,
                      gap: GAP,
                    }}
                  >
                    {weeks.map((week, wi) =>
                      week.map((day, di) => (
                        <div
                          key={`${wi}-${di}`}
                          title={day ? `${day.count} contributions on ${day.date}` : undefined}
                          className="rounded-[3px]"
                          style={{
                            width: CELL,
                            height: CELL,
                            background: day ? levelColor(day.level) : "transparent",
                          }}
                        />
                      )),
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between font-mono text-xs text-[rgb(var(--ink-dim))]">
            <span>
              {status === "ready" ? total.toLocaleString() : "—"} contributions in the last year
            </span>
            <span className="flex items-center gap-1.5">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span
                  key={l}
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ background: levelColor(l) }}
                />
              ))}
              More
            </span>
          </div>
        </div>

        {events.length > 0 && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_260px]">
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: "rgb(var(--line))" }}
            >
              <div className="mb-5 flex items-center gap-2">
                <Activity size={16} style={{ color: "rgb(var(--ink-dim))" }} />
                <p className="font-semibold">Recent Activity</p>
              </div>

              <div className="relative">
                {events.map((event, i) => {
                  const v = eventVisual(event);
                  const isLast = i === events.length - 1;
                  return (
                    <div key={event.id} className="relative flex gap-3">
                      <div className="flex flex-col items-center">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${v.color}22`, color: v.color }}
                        >
                          {v.icon}
                        </span>
                        {!isLast && (
                          <span
                            className="w-px flex-1"
                            style={{ background: "rgb(var(--line-soft))" }}
                          />
                        )}
                      </div>
                      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                          <p className="truncate text-sm font-semibold">{v.title}</p>
                          <span className="shrink-0 font-mono text-[11px] text-[rgb(var(--ink-dim))]">
                            {timeAgo(event.created_at)}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-[rgb(var(--ink-dim))]">
                          {v.description}
                        </p>
                        {v.tag && (
                          <span
                            className="mt-2 inline-block rounded-md px-2 py-0.5 font-mono text-[10px]"
                            style={{
                              background: "rgb(var(--bg-soft))",
                              color: "rgb(var(--ink-dim))",
                            }}
                          >
                            {v.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: "rgb(var(--ink-dim))" }} />
                <p className="font-semibold">Overview</p>
              </div>

              <div className="rounded-2xl border p-5" style={statCardStyle}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
                  Public repos
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {profile ? profile.public_repos : "—"}
                </p>
              </div>

              <div className="rounded-2xl border p-5" style={statCardStyle}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
                  Followers
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {profile ? profile.followers : "—"}
                </p>
              </div>

              <div className="rounded-2xl border p-5" style={statCardStyle}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[rgb(var(--ink-dim))]">
                  Contributions
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {status === "ready" ? total.toLocaleString() : "—"}
                </p>
                <p className="mt-1 text-xs text-[rgb(var(--ink-dim))]">
                  in the last year
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
