export type InfoItem = {
  title: string;
  place?: string;
  date: string;
  note?: string;
};

export default function InfoList({ items }: { items: InfoItem[] }) {
  return (
    <div
      className="divide-y rounded-2xl border"
      style={{ borderColor: "rgb(var(--line))" }}
    >
      {items.map((item) => (
        <div
          key={item.title + item.date}
          className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          style={{ borderColor: "rgb(var(--line-soft))" }}
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "rgb(var(--accent))" }}
            />
            <div>
              <p className="font-medium">
                {item.title}
                {item.note && (
                  <span
                    className="ml-2 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                    style={{
                      color: "rgb(var(--accent))",
                      background: "rgb(var(--accent) / 0.12)",
                    }}
                  >
                    {item.note}
                  </span>
                )}
              </p>
              {item.place && (
                <p className="mt-0.5 text-sm text-[rgb(var(--ink-dim))]">
                  {item.place}
                </p>
              )}
            </div>
          </div>
          <span
            className="shrink-0 self-start rounded-full px-3 py-1 font-mono text-xs sm:self-auto"
            style={{
              color: "rgb(var(--ink-dim))",
              background: "rgb(var(--bg-soft))",
            }}
          >
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );
}
