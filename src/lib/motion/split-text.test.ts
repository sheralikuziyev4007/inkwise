import { describe, expect, it } from "vitest";

import { splitWords } from "./split-text";

function heading(html: string) {
  const el = document.createElement("h1");
  el.innerHTML = html;
  document.body.appendChild(el);
  return el;
}

describe("splitWords", () => {
  it("wraps each word in an animatable span inside a mask", () => {
    const el = heading("Paperwork in. Clean data out.");
    const { words } = splitWords(el);

    expect(words.map((w) => w.textContent)).toEqual(["Paperwork", "in.", "Clean", "data", "out."]);
    expect(el.querySelectorAll(".split-mask")).toHaveLength(5);
    words.forEach((w) => expect(w.parentElement?.getAttribute("aria-hidden")).toBe("true"));
  });

  it("preserves nested markup such as a highlight span", () => {
    const el = heading('Paperwork in. <span class="marker">Clean data</span> out.');
    const { words } = splitWords(el);

    const marker = el.querySelector(".marker");
    expect(marker).not.toBeNull();
    expect(marker?.querySelectorAll(".split-word")).toHaveLength(2);
    expect(words).toHaveLength(5);
  });

  it("keeps the full sentence for assistive tech in a visually hidden copy", () => {
    const el = heading("Paperwork   in.\n Clean data out.");
    splitWords(el);
    expect(el.querySelector(".sr-only")?.textContent).toBe("Paperwork in. Clean data out.");
    expect(el).not.toHaveAttribute("aria-label");
  });

  it("restores the original DOM nodes on revert", () => {
    const el = heading("Hello <em>big</em> world");
    const originalText = el.firstChild;
    const originalHTML = el.innerHTML;

    const { revert } = splitWords(el);
    revert();

    expect(el.innerHTML).toBe(originalHTML);
    expect(el.firstChild).toBe(originalText);
    expect(el.querySelector(".sr-only")).toBeNull();
  });
});
