import { Container } from "@/components/ui/container";

const values = [
  {
    title: "Accuracy over hype",
    text: "We show confidence on every field and never hide uncertainty.",
  },
  {
    title: "Fit the stack you have",
    text: "No rip-and-replace. Inkwise slots into the systems you already run.",
  },
  {
    title: "Your data stays yours",
    text: "Strict access controls and a clear audit trail, by default.",
  },
];

export function Values() {
  return (
    <section aria-labelledby="values-title" className="on-dark bg-ink py-24 text-paper">
      <Container className="flex flex-col gap-10">
        <h2 id="values-title" className="h-section m-0 text-[clamp(2.25rem,4.2vw,3.5rem)]">
          What we hold ourselves to
        </h2>
        <ol className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3">
          {values.map((value, i) => (
            <li
              key={value.title}
              className="flex flex-col gap-2.5 border-t-2 border-highlight pt-5"
            >
              <span className="font-mono text-[13px] text-highlight">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 font-display text-[26px] font-bold">{value.title}</h3>
              <p className="m-0 leading-relaxed text-muted-2">{value.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
