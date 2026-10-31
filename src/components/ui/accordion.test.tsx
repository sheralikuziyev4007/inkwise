import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Accordion } from "./accordion";

const items = [
  { question: "First?", answer: "One" },
  { question: "Second?", answer: "Two" },
];

describe("Accordion", () => {
  it("opens the default item and links buttons to their panels", () => {
    render(<Accordion items={items} />);
    const first = screen.getByRole("button", { name: "First?" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(first.getAttribute("aria-controls")!);
    expect(panel).toBe(screen.getByRole("region", { name: "First?" }));
    expect(screen.getByRole("button", { name: "Second?" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("keeps only one item open at a time and can close it", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const first = screen.getByRole("button", { name: "First?" });
    const second = screen.getByRole("button", { name: "Second?" });

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });

  it("is operable with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} defaultOpen={-1} />);
    await user.tab();
    expect(screen.getByRole("button", { name: "First?" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "First?" })).toHaveAttribute("aria-expanded", "true");
  });
});
