import { describe, expect, it } from "vitest";

import {
  annualTotal,
  billingNote,
  formatUsd,
  getPlan,
  plans,
  priceFor,
  YEARLY_DISCOUNT_PERCENT,
} from "./pricing";

describe("pricing", () => {
  it("defines three plans with exactly one popular plan", () => {
    expect(plans.map((p) => p.id)).toEqual(["starter", "team", "scale"]);
    expect(plans.filter((p) => p.popular)).toHaveLength(1);
  });

  it("returns monthly or yearly prices", () => {
    const team = getPlan("team");
    expect(priceFor(team, "monthly")).toBe(499);
    expect(priceFor(team, "yearly")).toBe(399);
    expect(priceFor(getPlan("scale"), "yearly")).toBeNull();
  });

  it("keeps yearly prices within one dollar of the advertised discount", () => {
    for (const plan of plans) {
      if (plan.monthly === null || plan.yearly === null) continue;
      const expected = plan.monthly * (1 - YEARLY_DISCOUNT_PERCENT / 100);
      expect(Math.abs(plan.yearly - expected)).toBeLessThan(1);
    }
  });

  it("computes the annual total", () => {
    expect(annualTotal(getPlan("starter"), "yearly")).toBe(1428);
    expect(annualTotal(getPlan("scale"), "monthly")).toBeNull();
  });

  it("formats USD without unnecessary decimals", () => {
    expect(formatUsd(119)).toBe("$119");
    expect(formatUsd(4788)).toBe("$4,788");
    expect(formatUsd(0.12)).toBe("$0.12");
  });

  it("describes billing for each period", () => {
    expect(billingNote(getPlan("starter"), "yearly")).toBe("per month, billed $1,428 yearly");
    expect(billingNote(getPlan("starter"), "monthly")).toBe("billed monthly, cancel anytime");
    expect(billingNote(getPlan("scale"), "monthly")).toMatch(/custom|volume/i);
  });

  it("throws for an unknown plan id", () => {
    // @ts-expect-error — testing a runtime guard
    expect(() => getPlan("enterprise")).toThrow("Unknown plan");
  });
});
