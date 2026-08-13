import { useEffect, useMemo, useState } from "react";
import { GithubIcon } from "./icons";
import { links } from "../data/content";

const USERNAME = "SocharyVanda";
const CELL = 11;
const GAP = 3;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
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
    default:
      return `Activity in ${event.repo.name}`;
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
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [calRes, eventsRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
            { signal: controller.signal },
          ),
          fetch(`https://api.github.com/users/${USERNAME}/events/public`, {
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

  return (
    <section id="github" className="px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-3 text-4xl font-semibold sm:text-5xl">
          GitHub contributions
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
          <div
            className="mt-6 rounded-2xl border p-6"
            style={{ borderColor: "rgb(var(--line))" }}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[rgb(var(--ink-dim))]">
              Recent activity
            </p>
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
        )}
      </div>
    </section>
  );
}
