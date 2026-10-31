"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useLenis } from "@/components/motion/smooth-scroll";
import { ButtonLink } from "@/components/ui/button";
import { CrossIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/site";

import { isActivePath } from "./nav-link";

/**
 * Full-screen menu built on the native <dialog> element:
 * focus is trapped and Escape closes it without extra code.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  // Close after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-ink lg:hidden"
      >
        <MenuIcon size={18} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-3 sm:px-8">
            <Logo inverted />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-paper"
            >
              <CrossIcon size={18} />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-10 sm:px-8">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-1 font-display text-5xl font-bold tracking-[-0.03em]",
                    active ? "text-highlight" : "text-paper",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto flex flex-col gap-3 px-5 py-6 sm:px-8">
            <ButtonLink
              href="/contact"
              variant="highlight"
              size="lg"
              onClick={() => setOpen(false)}
            >
              Book a demo
            </ButtonLink>
          </div>
        </div>
      </dialog>
    </>
  );
}
