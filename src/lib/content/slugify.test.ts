import { describe, expect, it } from "vitest";

import { slugify } from "./slugify";

describe("slugify", () => {
  it.each([
    ["The challenge", "the-challenge"],
    ["03 · Validate & sync", "03-validate-sync"],
    ["  Where it breaks?  ", "where-it-breaks"],
    ["Café résumé", "cafe-resume"],
  ])("%s → %s", (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });
});
