/**
 * Minimal SplitText replacement.
 *
 * Wraps every word of an element in a mask (`overflow: clip`) and an inner span
 * that can be animated. Nested markup (e.g. a highlighted <span>) is preserved
 * because only text nodes are replaced. Screen readers keep reading the original
 * sentence: the element gets an aria-label and the generated spans are hidden.
 */
export interface SplitResult {
  /** Inner spans, one per word, in reading order. */
  words: HTMLSpanElement[];
  /** Restores the original markup and attributes. */
  revert: () => void;
}

const WORD_CLASS = "split-word";
const MASK_CLASS = "split-mask";

export function splitWords(element: HTMLElement): SplitResult {
  const hadAriaLabel = element.hasAttribute("aria-label");
  const originalAriaLabel = element.getAttribute("aria-label");
  const label = (element.textContent ?? "").replace(/\s+/g, " ").trim();

  const words: HTMLSpanElement[] = [];
  // Original text nodes are kept (not re-created) so frameworks such as React
  // that hold references to them keep working after revert().
  const replaced: Array<{ original: Text; inserted: Node[] }> = [];
  const doc = element.ownerDocument;
  const walker = doc.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  for (const node of textNodes) {
    const text = node.nodeValue ?? "";
    if (!text.trim()) continue;
    const fragment = doc.createDocumentFragment();
    // Keep whitespace tokens as plain text so line breaking stays natural.
    for (const token of text.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        fragment.appendChild(doc.createTextNode(token));
        continue;
      }
      const mask = doc.createElement("span");
      mask.className = MASK_CLASS;
      mask.setAttribute("aria-hidden", "true");
      mask.style.display = "inline-block";
      mask.style.overflow = "clip";
      mask.style.verticalAlign = "top";
      // Extra room so descenders and the marker background are not clipped.
      mask.style.paddingBlock = "0.08em";
      mask.style.marginBlock = "-0.08em";
      const word = doc.createElement("span");
      word.className = WORD_CLASS;
      word.style.display = "inline-block";
      word.style.willChange = "transform";
      word.textContent = token;
      mask.appendChild(word);
      fragment.appendChild(mask);
      words.push(word);
    }
    replaced.push({ original: node, inserted: Array.from(fragment.childNodes) });
    node.parentNode?.replaceChild(fragment, node);
  }

  if (label) element.setAttribute("aria-label", label);

  return {
    words,
    revert() {
      for (const { original, inserted } of replaced) {
        const first = inserted[0];
        if (first?.parentNode) first.parentNode.insertBefore(original, first);
        for (const n of inserted) n.parentNode?.removeChild(n);
      }
      if (hadAriaLabel && originalAriaLabel !== null) {
        element.setAttribute("aria-label", originalAriaLabel);
      } else {
        element.removeAttribute("aria-label");
      }
    },
  };
}
