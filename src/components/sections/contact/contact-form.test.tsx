import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Dana Reyes");
  await user.type(screen.getByLabelText("Company"), "Acme Logistics");
  await user.type(screen.getByLabelText("Work email"), "dana@company.com");
  await user.selectOptions(screen.getByLabelText("Documents per month"), "500 – 2,000");
  await user.type(
    screen.getByLabelText("What documents do you process?"),
    "Around 900 supplier invoices a month.",
  );
  await user.click(screen.getByRole("checkbox"));
}

describe("ContactForm", () => {
  it("shows field errors and a summary when submitted empty", async () => {
    const user = userEvent.setup();
    const submit = vi.fn();
    render(<ContactForm submit={submit} />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText("Please fix the 6 highlighted fields.")).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Work email")).toHaveAccessibleDescription(
      "Enter a valid work email address",
    );
    expect(submit).not.toHaveBeenCalled();
  });

  it("submits valid data and shows the success state", async () => {
    const user = userEvent.setup();
    const submit = vi.fn().mockResolvedValue({ ok: true });
    render(<ContactForm submit={submit} />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => expect(submit).toHaveBeenCalledTimes(1));
    expect(submit.mock.calls[0]?.[0]).toMatchObject({
      name: "Dana Reyes",
      email: "dana@company.com",
      volume: "500 – 2,000",
      consent: true,
    });
    const heading = await screen.findByRole("heading", { name: "Message received." });
    expect(heading).toHaveFocus();
  });

  it("shows an error alert and keeps the data when sending fails", async () => {
    const user = userEvent.setup();
    const submit = vi.fn().mockRejectedValue(new Error("boom"));
    render(<ContactForm submit={submit} />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/your message was not sent/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toHaveValue("Dana Reyes");
  });
});
