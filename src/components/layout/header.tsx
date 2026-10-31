import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav } from "@/lib/site";

import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Link href="/" aria-label="Inkwise home" className="no-underline">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <ButtonLink href="/contact" className="max-sm:hidden" data-magnetic>
            Book a demo
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
