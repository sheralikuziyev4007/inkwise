import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WordReveal } from "@/components/motion/word-reveal";

import { textOf } from "./split-nodes";

describe("WordReveal / splitNodes", () => {
  it("splits text into masked words, keeping nested markup and order", () => {
    const { container } = render(
      <WordReveal>
        Paperwork in. <span className="marker">Clean data</span> out.
      </WordReveal>,
    );
    const h1 = container.querySelector("h1")!;
    const words = [...h1.querySelectorAll(".word")];
    expect(words.map((w) => w.textContent)).toEqual(["Paperwork", "in.", "Clean", "data", "out."]);
    expect(words.map((w) => (w as HTMLElement).style.getPropertyValue("--i"))).toEqual([
      "0",
      "1",
      "2",
      "3",
      "4",
    ]);
    expect(h1.querySelector(".marker .word")).not.toBeNull();
  });

  it("gives the heading its full sentence as accessible name", () => {
    const { getByRole } = render(
      <WordReveal>
        Pay for pages,
        <br />
        not seats.
      </WordReveal>,
    );
    expect(getByRole("heading", { level: 1 })).toHaveAccessibleName("Pay for pages, not seats.");
  });

  it("extracts plain text from nested nodes", () => {
    expect(
      textOf(
        <>
          a <b>b</b> {"c"}
        </>,
      ),
    ).toBe("a b c");
  });
});
