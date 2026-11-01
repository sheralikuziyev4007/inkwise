import type { MDXComponents } from "mdx/types";

import { Anchor } from "@/components/mdx/anchor";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { H2 } from "@/components/mdx/heading";
import { PullQuote } from "@/components/mdx/pull-quote";
import { Timeline } from "@/components/mdx/timeline";

const components: MDXComponents = {
  h2: H2,
  a: Anchor,
  pre: CodeBlock,
  Callout,
  PullQuote,
  Timeline,
};

export function useMDXComponents(overrides: MDXComponents): MDXComponents {
  return { ...components, ...overrides };
}
