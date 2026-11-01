import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Newsletter } from "./newsletter";

describe("Newsletter", () => {
  it("announces an invalid address and clears the error while typing", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    const input = screen.getByLabelText("Work email");
    await user.type(input, "not-an-email");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.");
    expect(input).toHaveAttribute("aria-invalid", "true");

    await user.type(input, "x");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("confirms a valid subscription", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.type(screen.getByLabelText("Work email"), "ops@company.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));

    expect(screen.getByRole("status")).toHaveTextContent("You're on the list");
  });
});
