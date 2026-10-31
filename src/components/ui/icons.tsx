import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, strokeWidth = 1.8, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const ArrowLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base strokeWidth={3} {...p}>
    <path d="M5 12l5 5L20 7" />
  </Base>
);
export const CrossIcon = (p: IconProps) => (
  <Base strokeWidth={2.5} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);
export const MenuIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M4 8h16M4 16h16" />
  </Base>
);
export const PlusIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);
export const MinusIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M5 12h14" />
  </Base>
);
export const AlertIcon = (p: IconProps) => (
  <Base strokeWidth={2.2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6M12 16.5v.5" />
  </Base>
);
export const InfoIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.5" />
  </Base>
);
export const SearchIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </Base>
);
export const QuoteIcon = ({ size = 40, ...p }: IconProps) => (
  <svg
    width={size}
    height={(size * 32) / 40}
    viewBox="0 0 40 32"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="M0 32V18C0 8 6 1.5 16 0l2 5C11.5 7 9 11 9 16h8v16zm22 0V18C22 8 28 1.5 38 0l2 5c-6.5 2-9 6-9 11h8v16z" />
  </svg>
);

/* Document / feature icons */
export const DocumentIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <path d="M14 3v6h6M8 13h8M8 17h5" />
  </Base>
);
export const ShieldCheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Base>
);
export const RulesIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 6h16M4 12h10M4 18h6" />
    <circle cx="18" cy="16" r="3" />
  </Base>
);
export const RoutingIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <path d="M8 7.5l3 8M16 7.5l-3 8" />
  </Base>
);
export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Base>
);
export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Base>
);

/* Integration icons */
export const ErpIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M9 4v16" />
  </Base>
);
export const ChartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 19V5M4 19h16M8 15l4-4 3 3 5-6" />
  </Base>
);
export const GridIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </Base>
);
export const DatabaseIcon = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </Base>
);
export const UsersIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="4" />
    <path d="M2 21c0-4 3-6 7-6s7 2 7 6M17 11l2 2 4-4" />
  </Base>
);
export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Base>
);
export const CloudIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8z" />
  </Base>
);
export const CodeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />
  </Base>
);
export const LinkIcon = (p: IconProps) => (
  <Base strokeWidth={2} {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Base>
);
