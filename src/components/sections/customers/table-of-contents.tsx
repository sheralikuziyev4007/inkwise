import { slugify } from "@/lib/content/slugify";

export function TableOfContents({ sections }: { sections: string[] }) {
  return (
    <nav
      aria-label="On this page"
      className="flex flex-col gap-2.5 text-[15px] lg:sticky lg:top-28"
    >
      <p className="eyebrow m-0 text-ink-3">On this page</p>
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${slugify(section)}`}
              className="block border-l-[3px] border-transparent py-1 pl-3 text-ink-2 hover:border-highlight hover:text-ink"
            >
              {section}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
