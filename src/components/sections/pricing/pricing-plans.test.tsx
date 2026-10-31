import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PricingPlans } from "./pricing-plans";

describe("PricingPlans", () => {
  it("shows yearly prices by default and switches to monthly", async () => {
    const user = userEvent.setup();
    render(<PricingPlans />);

    expect(screen.getByTestId("price-starter")).toHaveTextContent("$119");
    expect(screen.getByTestId("price-team")).toHaveTextContent("$399");
    expect(screen.getByRole("button", { name: /yearly/i })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: "Monthly" }));

    expect(screen.getByRole("button", { name: "Monthly" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("price-starter")).toHaveTextContent("$149");
    expect(screen.getByTestId("price-team")).toHaveTextContent("$499");
    expect(screen.getAllByText("billed monthly, cancel anytime")).toHaveLength(2);
  });

  it("renders a custom-priced plan", () => {
    render(<PricingPlans />);
    expect(screen.getByRole("heading", { name: "Scale" })).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });
});
