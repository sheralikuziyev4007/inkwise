import { describe, expect, it } from "vitest";

import { contactSchema, submitContact } from "./contact-schema";

const valid = {
  name: "Dana Reyes",
  email: "dana@company.com",
  company: "Acme Logistics",
  volume: "500 – 2,000",
  message: "We process around 900 supplier invoices a month.",
  consent: true,
};

describe("contactSchema", () => {
  it("accepts a complete submission and trims strings", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Dana Reyes  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Dana Reyes");
  });

  it.each([
    ["name", { name: "D" }, "Please enter your full name"],
    ["email", { email: "dana@" }, "Enter a valid work email address"],
    ["company", { company: "" }, "Please enter your company name"],
    ["volume", { volume: "lots" }, "Choose your monthly document volume"],
    ["message", { message: "Too short" }, "Tell us a little more (at least 20 characters)"],
    ["consent", { consent: false }, "Please accept the privacy notice to continue"],
  ])("rejects an invalid %s", (field, patch, message) => {
    const result = contactSchema.safeParse({ ...valid, ...patch });
    expect(result.success).toBe(false);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === field);
      expect(issue?.message).toBe(message);
    }
  });
});

describe("submitContact", () => {
  it("resolves for normal addresses", async () => {
    const data = contactSchema.parse(valid);
    await expect(submitContact(data, 0)).resolves.toEqual({ ok: true });
  });

  it("rejects for the demo failure domain", async () => {
    const data = contactSchema.parse({ ...valid, email: "dana@fail.test" });
    await expect(submitContact(data, 0)).rejects.toThrow();
  });
});
