import { Container } from "@/components/ui/container";
import { Placeholder } from "@/components/ui/placeholder";

export function LogoStrip() {
  return (
    <section aria-label="Customers" className="pt-6 pb-20">
      <Container>
        <p className="m-0 mb-5 text-center text-sm text-ink-3">
          Operations and finance teams at mid-sized companies run on Inkwise
        </p>
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <Placeholder label="[CUSTOMER LOGO]" className="h-16" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
