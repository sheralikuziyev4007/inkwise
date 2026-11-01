"use client";

import { useEffect, useState } from "react";

/**
 * Pages are statically generated, so a year computed on the server is frozen at
 * build time. Render the build year first (no layout shift), then correct it in
 * the browser if the site has not been rebuilt since New Year.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
