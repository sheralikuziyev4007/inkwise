import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Placeholder } from "@/components/ui/placeholder";

const team = [
  { role: "Co-founder, CEO" },
  { role: "Co-founder, CTO" },
  { role: "Head of Product" },
];

export function Team() {
  return (
    <section aria-labelledby="team-title" className="py-24">
      <Container>
        <h2 id="team-title" className="h-section m-0 mb-8 text-[clamp(2.25rem,4.2vw,3.5rem)]">
          The team
        </h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <li key={member.role} className="flex flex-col gap-3">
              <Placeholder label="[PHOTO]" className="aspect-[4/5] rounded-[20px] bg-paper-2" />
              <p className="m-0">
                <strong>[NAME]</strong>
                <br />
                <span className="text-[15px] text-ink-3">{member.role}</span>
              </p>
            </li>
          ))}
          <li className="flex aspect-[4/5] flex-col justify-end gap-2 rounded-[20px] bg-highlight p-6">
            <p className="m-0 font-display text-[26px] leading-[1.05] font-bold">
              We&apos;re hiring.
            </p>
            <Link
              href="/contact"
              className="self-start py-1 font-semibold underline underline-offset-4"
            >
              Get in touch →
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
