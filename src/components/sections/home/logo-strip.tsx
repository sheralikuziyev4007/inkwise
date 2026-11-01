import { CompanyLogo } from "@/components/ui/company-logo";
import { Container } from "@/components/ui/container";
import { sampleCompanies } from "@/lib/sample-data";

export function LogoStrip() {
  return (
    <section aria-labelledby="logos-title" className="pt-6 pb-20">
      <Container>
        <p id="logos-title" className="m-0 mb-6 text-center text-sm text-ink-3">
          Operations and finance teams at mid-sized companies run on Inkwise{" "}
          <span className="whitespace-nowrap">(sample customers)</span>
        </p>
        <ul className="m-0 grid list-none grid-cols-2 items-center gap-x-6 gap-y-8 p-0 text-ink-3 sm:grid-cols-3 lg:grid-cols-6">
          {sampleCompanies.map((company) => (
            <li key={company.name} className="flex justify-center">
              <CompanyLogo name={company.name} glyph={company.glyph} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
