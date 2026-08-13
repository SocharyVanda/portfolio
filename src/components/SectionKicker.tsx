export default function SectionKicker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[rgb(var(--ink-dim))]">
      <span className="h-px w-8" style={{ background: "rgb(var(--line))" }} />
      {index} / {label}
    </div>
  );
}
