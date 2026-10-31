export function PullQuote({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <figure className="on-dark my-10 flex flex-col gap-5 rounded-[var(--radius-card)] bg-ink p-8 text-paper sm:p-9">
      <blockquote className="m-0 font-display text-2xl leading-tight tracking-[-0.01em] sm:text-[28px]">
        {quote}
      </blockquote>
      <figcaption className="text-[15px] text-muted">
        <strong className="text-paper">{name}</strong> · {role}
      </figcaption>
    </figure>
  );
}
