import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "highlight" | "outline-light" | "light";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 disabled:opacity-60 min-h-11";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  secondary: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper",
  highlight: "bg-highlight text-ink hover:bg-[#b5e322]",
  "outline-light": "border-[1.5px] border-paper text-paper hover:bg-paper hover:text-ink",
  light: "bg-paper text-ink hover:bg-paper-2",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-3 text-[15px]",
  lg: "px-7 py-4 text-base",
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show a trailing arrow icon. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<StyleProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type ButtonProps = StyleProps & Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps>;

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}

type ButtonLinkProps = StyleProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof StyleProps> & { href: string };

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}
