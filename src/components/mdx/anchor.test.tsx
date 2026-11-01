import { render, screen } from "@testing-library/react";

import { Anchor } from "./anchor";

describe("Anchor", () => {
  it("keeps in-page anchors in the same tab", () => {
    render(<Anchor href="#what-goes-into-it">Jump</Anchor>);
    expect(screen.getByRole("link", { name: "Jump" })).not.toHaveAttribute("target");
  });

  it("keeps mailto links in the same tab", () => {
    render(<Anchor href="mailto:hello@inkwise.example">Email</Anchor>);
    expect(screen.getByRole("link", { name: "Email" })).not.toHaveAttribute("target");
  });

  it("opens external links in a new tab safely", () => {
    render(<Anchor href="https://example.com">Docs</Anchor>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("routes site paths through next/link", () => {
    render(<Anchor href="/pricing">Pricing</Anchor>);
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("href", "/pricing");
  });
});
