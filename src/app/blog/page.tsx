import type { Metadata } from "next";

import { BlogIndex } from "@/components/sections/blog/blog-index";
import { Newsletter } from "@/components/sections/blog/newsletter";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { getPosts } from "@/lib/content/loaders";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, finance-ops playbooks and product updates from the Inkwise team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="The Inkwise blog"
        title={
          <>
            Notes from the <span className="marker">back office</span>.
          </>
        }
      />
      <section aria-label="Articles" className="pb-24">
        <Container>
          <BlogIndex posts={posts} />
        </Container>
      </section>
      <Newsletter />
    </>
  );
}
