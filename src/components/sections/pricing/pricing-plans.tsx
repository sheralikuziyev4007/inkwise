"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { plans, type BillingPeriod } from "@/lib/pricing";

import { BillingToggle } from "./billing-toggle";
import { PlanCard } from "./plan-card";

interface PricingPlansProps {
  /** Heading rendered beside the toggle. */
  heading?: ReactNode;
  compact?: boolean;
  centered?: boolean;
  defaultPeriod?: BillingPeriod;
}

/** Billing toggle + plan cards. Shared by the home preview and the pricing page. */
export function PricingPlans({
  heading,
  compact = false,
  centered = false,
  defaultPeriod = "yearly",
}: PricingPlansProps) {
  const [period, setPeriod] = useState<BillingPeriod>(defaultPeriod);

  return (
    <div>
      <div
        className={cn(
          "mb-10 flex flex-wrap items-end gap-6",
          centered ? "justify-center" : "justify-between",
        )}
      >
        {heading}
        <BillingToggle value={period} onChange={setPeriod} />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "flex",
              plan.popular && "md:order-first md:col-span-2 lg:order-none lg:col-span-1",
            )}
          >
            <PlanCard plan={plan} period={period} compact={compact} />
          </div>
        ))}
      </div>
    </div>
  );
}
