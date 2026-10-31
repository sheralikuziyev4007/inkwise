import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Server-side counterpart of `splitWords`: splits the text inside React children
 * into masked word spans at render time, keeping nested elements (like the
 * highlighter <span>) intact. Because the words exist in the initial HTML, CSS can
 * animate them from the very first paint — no hydration wait, no DOM mutation.
 */
export function splitNodes(children: ReactNode, counter = { i: 0 }): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(/(\s+)/)
        .map((token, k) => {
          if (!token) return null;
          if (/^\s+$/.test(token)) return token;
          const index = counter.i++;
          return (
            <span key={k} className="word-mask" aria-hidden="true">
              <span className="word" style={{ "--i": index } as CSSProperties}>
                {token}
              </span>
            </span>
          );
        });
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {
        children: splitNodes(child.props.children, counter),
      });
    }
    return child;
  });
}

/** Plain text of React children, used as the accessible name of split headings. */
export function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === "br") return " ";
    return textOf(node.props.children);
  }
  return "";
}
