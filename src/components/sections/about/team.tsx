import Link from "next/link";

import { Avatar } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { team } from "@/lib/sample-data";

const tones = [0, 1, 2] as const;

export function Team() {
  return (
    <section aria-labelledby="team-title" className="py-24">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="team-title" className="h-section m-0 text-[clamp(2.25rem,4.2vw,3.5rem)]">
            The team
          </h2>
          <p className="m-0 text-sm text-ink-3">Sample team · concept project</p>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <li key={member.name} className="flex flex-col gap-3">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[20px] bg-paper-2">
                <Avatar name={member.name} size={112} tone={tones[i % 3]} />
              </div>
              <p className="m-0">
                <strong>{member.name}</strong>
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
