import { z } from "zod";

export const volumeOptions = ["Under 500", "500 – 2,000", "2,000 – 10,000", "10,000+"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid work email address"),
  company: z.string().trim().min(2, "Please enter your company name"),
  volume: z.enum(volumeOptions, { message: "Choose your monthly document volume" }),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters)")
    .max(1000, "Please keep it under 1,000 characters"),
  consent: z.literal(true, { message: "Please accept the privacy notice to continue" }),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;

/**
 * Stand-in for an API call — there is no backend. Resolves after a short
 * delay; any address at `fail.test` rejects so the error state can be demoed.
 */
export async function submitContact(values: ContactValues, delayMs = 1200): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  if (values.email.toLowerCase().endsWith("@fail.test")) {
    throw new Error("The demo server rejected this request.");
  }
  return { ok: true };
}
