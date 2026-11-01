import { textOf } from "./text-of";

describe("textOf", () => {
  it("reads strings, numbers and arrays", () => {
    expect(textOf(["Step ", 3])).toBe("Step 3");
  });

  it("reads text nested inside elements", () => {
    expect(
      textOf(
        <>
          Using <code>sum()</code> on <em>line items</em>
        </>,
      ),
    ).toBe("Using sum() on line items");
  });

  it("ignores empty values", () => {
    expect(textOf([null, undefined, false, "ok"])).toBe("ok");
  });
});
