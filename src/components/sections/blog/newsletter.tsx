"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Demo-only subscription form: validates the address, never sends anything. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  return (
    <section aria-labelledby="nl-title" className="pb-24">
      <Container>
        <div className="on-dark flex flex-wrap items-center justify-between gap-8 rounded-[28px] bg-ink p-8 text-paper sm:p-12">
          <div className="flex max-w-xl flex-col gap-2.5">
            <h2
              id="nl-title"
              className="m-0 font-display text-4xl leading-none font-bold tracking-[-0.03em]"
            >
              One useful ops email a month.
            </h2>
            <p className="m-0 text-muted-2">Demo form — no data is sent anywhere.</p>
          </div>
          {state === "done" ? (
            <p
              role="status"
              className="m-0 rounded-full bg-highlight px-5 py-3 font-semibold text-ink"
            >
              You&apos;re on the list (demo).
            </p>
          ) : (
            <form
              noValidate
              className="flex flex-wrap items-end gap-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
              }}
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nl-email" className="text-sm font-semibold">
                  Work email
                </label>
                <input
                  id="nl-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={state === "error" ? true : undefined}
                  aria-describedby={state === "error" ? "nl-error" : undefined}
                  placeholder="you@company.com"
                  className="h-[52px] w-72 max-w-full rounded-full border-[1.5px] border-[#6b7079] bg-ink-raised px-5 text-paper placeholder:text-muted"
                />
              </div>
              <Button type="submit" variant="highlight" className="h-[52px]">
                Subscribe
              </Button>
              {state === "error" ? (
                <p id="nl-error" className="m-0 w-full text-sm text-highlight">
                  Enter a valid email address.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
