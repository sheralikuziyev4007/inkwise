export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudyMeta {
  title: string;
  summary: string;
  industry: "Logistics" | "Manufacturing" | "Healthcare";
  documents: string;
  stack: string;
  teamSize: string;
  stats: Stat[];
  /** Section headings, in order — used for the on-page table of contents. */
  sections: string[];
  publishedAt: string;
  featured?: boolean;
}

export interface PostMeta {
  title: string;
  excerpt: string;
  category: "Guides" | "Finance ops" | "Product updates" | "Engineering";
  publishedAt: string;
  readingMinutes: number;
  author: string;
  sections: string[];
  featured?: boolean;
}

export interface Entry<M> {
  slug: string;
  meta: M;
}
