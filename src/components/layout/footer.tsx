import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav, siteConfig } from "@/lib/site";

import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-10">
      <Container>
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo className="text-xl" />
            <p className="m-0 text-sm leading-relaxed text-ink-3">
              AI document automation for operations and finance teams.
            </p>
          </div>
          <div className="flex flex-wrap gap-16 text-[15px]">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title} className="flex flex-col gap-2.5">
                <p className="eyebrow m-0 text-ink-3">{group.title}</p>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="py-0.5 hover:underline">
                    {item.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-[13px] text-ink-3">
          <p className="m-0">
            Inkwise is a concept brand. Designed &amp; built by{" "}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-highlight decoration-2 underline-offset-4"
            >
              {siteConfig.author.name}
            </a>
            .
          </p>
          <p className="m-0">
            © <CurrentYear buildYear={new Date().getFullYear()} /> Inkwise
          </p>
        </div>
      </Container>
    </footer>
  );
}
