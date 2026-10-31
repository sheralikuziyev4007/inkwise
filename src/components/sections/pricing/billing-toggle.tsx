"use client";

import { SegmentedControl } from "@/components/ui/segmented-control";
import { YEARLY_DISCOUNT_PERCENT, type BillingPeriod } from "@/lib/pricing";

export function BillingToggle({
  value,
  onChange,
  className,
}: {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
  className?: string;
}) {
  return (
    <SegmentedControl<BillingPeriod>
      label="Billing period"
      value={value}
      onChange={onChange}
      className={className}
      options={[
        { value: "monthly", label: "Monthly" },
        { value: "yearly", label: "Yearly", badge: `−${YEARLY_DISCOUNT_PERCENT}%` },
      ]}
    />
  );
}
