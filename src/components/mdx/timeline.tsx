export function Timeline({ items }: { items: { when: string; what: string }[] }) {
  return (
    <ol className="not-prose flex list-none flex-col gap-0 rounded-2xl border border-line bg-sheet p-0 font-mono text-sm">
      {items.map((item) => (
        <li key={item.when} className="flex gap-5 border-b border-line px-5 py-4 last:border-b-0">
          <span className="w-20 flex-none text-ink-3">{item.when}</span>
          <span className="text-ink">{item.what}</span>
        </li>
      ))}
    </ol>
  );
}
