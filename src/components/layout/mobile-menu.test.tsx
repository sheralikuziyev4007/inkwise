import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/pricing" }));

import { MobileMenu } from "./mobile-menu";

describe("MobileMenu", () => {
  beforeEach(() => {
    document.documentElement.style.overflow = "";
  });

  it("opens a modal menu, marks the current page and closes again", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Site menu" });
    expect(dialog).toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(screen.getByRole("link", { name: "Pricing" })).toHaveAttribute("aria-current", "page");

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(dialog).not.toHaveAttribute("open");
    expect(document.documentElement.style.overflow).toBe("");
  });
});
