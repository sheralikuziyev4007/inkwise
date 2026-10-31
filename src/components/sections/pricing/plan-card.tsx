import { ButtonLink } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { billingNote, formatUsd, priceFor, type BillingPeriod, type Plan } from "@/lib/pricing";

interface PlanCardProps {
  plan: Plan;
  period: BillingPeriod;
  /** Compact cards omit the feature list (home page preview). */
  compact?: boolean;
}

export function PlanCard({ plan, period, compact = false }: PlanCardProps) {
  const price = priceFor(plan, period);
  const dark = Boolean(plan.popular);

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex w-full flex-col gap-5 rounded-[var(--radius-card)] p-8",
        dark ? "on-dark bg-ink text-paper" : "border border-line bg-sheet",
      )}
    >
      {plan.popular ? (
        <span className="absolute top-7 right-7 rounded-full bg-highlight px-2.5 py-1 text-xs font-semibold text-ink">
          Most popular
        </span>
      ) : null}
      <h3 id={`plan-${plan.id}`} className="m-0 text-lg font-semibold">
        {plan.name}
      </h3>
      <div>
        <p className="m-0 font-display text-5xl font-bold tracking-[-0.03em]">
          {price === null ? (
            "Custom"
          ) : (
            <>
              <span data-testid={`price-${plan.id}`}>{formatUsd(price)}</span>
              <span
                className={cn(
                  "font-sans text-[15px] font-normal",
                  dark ? "text-muted" : "text-ink-3",
                )}
              >
                {" "}
                /mo
              </span>
            </>
          )}
        </p>
        <p className={cn("m-0 mt-2 text-sm", dark ? "text-muted" : "text-ink-3")}>
          {billingNote(plan, period)}
        </p>
      </div>
      <p className={cn("m-0", dark ? "text-muted-2" : "text-ink-2")}>{plan.summary}</p>
      {compact ? null : (
        <ul
          className={cn(
            "m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]",
            dark ? "text-muted-2" : "text-ink-2",
          )}
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "inline-flex size-5 flex-none items-center justify-center rounded-full",
                  dark ? "bg-highlight text-ink" : "bg-ink text-highlight",
                )}
              >
                <CheckIcon size={11} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <ButtonLink
        href={plan.cta.href}
        variant={dark ? "highlight" : "secondary"}
        className="mt-auto w-full"
      >
        {plan.cta.label}
      </ButtonLink>
    </article>
  );
}
