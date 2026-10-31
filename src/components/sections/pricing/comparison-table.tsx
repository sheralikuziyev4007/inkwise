import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { comparison, plans } from "@/lib/pricing";

export function ComparisonTable() {
  return (
    <section aria-labelledby="compare-title" className="pb-24">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 id="compare-title" className="h-section m-0 text-[clamp(2rem,3.6vw,3rem)]">
            Compare plans
          </h2>
          <p className="eyebrow m-0 text-ink-3 md:hidden" aria-hidden="true">
            Scroll table →
          </p>
        </div>
        <div
          role="region"
          aria-labelledby="compare-title"
          tabIndex={0}
          className="relative overflow-x-auto rounded-[var(--radius-card)] border border-line bg-sheet"
        >
          <table className="w-full min-w-[720px] border-collapse text-[15px]">
            <caption className="sr-only">Feature comparison of Inkwise plans</caption>
            <thead>
              <tr className="text-left">
                <th
                  scope="col"
                  className="sticky left-0 border-b border-line bg-sheet px-6 py-5 font-medium text-ink-3"
                >
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn("border-b border-line px-6 py-5", plan.popular && "bg-highlight")}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            {comparison.map((group) => (
              <tbody key={group.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={plans.length + 1}
                    className="bg-paper px-6 py-3.5 text-left font-mono text-xs font-medium tracking-[0.02em] text-ink-3 uppercase"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-[#ecede8] last:border-b-0">
                    <th
                      scope="row"
                      className="sticky left-0 bg-sheet px-6 py-4 text-left font-normal"
                    >
                      {row.feature}
                    </th>
                    {plans.map((plan) => {
                      const value = row.values[plan.id];
                      return (
                        <td
                          key={plan.id}
                          className={cn(
                            "px-6 py-4",
                            plan.popular && "bg-highlight-soft",
                            value === "—" && "text-ink-3",
                          )}
                        >
                          {value === "—" ? (
                            <>
                              <span aria-hidden="true">—</span>
                              <span className="sr-only">Not included</span>
                            </>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Container>
    </section>
  );
}
