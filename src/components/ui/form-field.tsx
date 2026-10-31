import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { AlertIcon } from "./icons";

const control =
  "w-full rounded-[var(--radius-field)] bg-sheet px-3.5 text-base text-ink placeholder:text-ink-3/80 outline-none transition-[border-color,box-shadow] focus-visible:shadow-[0_0_0_3px_var(--color-highlight)]";

function controlClass(invalid: boolean) {
  return cn(control, invalid ? "border-2 border-error" : "border-[1.5px] border-ink");
}

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}

function FieldShell({ id, label, error, hint, optional, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? <span className="ml-1 font-normal text-ink-3">(optional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="m-0 text-[13px] text-ink-3">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="m-0 flex items-center gap-1.5 text-[13px] text-error">
          <AlertIcon size={14} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

type BaseProps = { id: string; label: string; error?: string; hint?: string; optional?: boolean };

export function TextField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: BaseProps & ComponentPropsWithRef<"input">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        type="text"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(Boolean(error)), "h-[50px]", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...props
}: BaseProps & ComponentPropsWithRef<"textarea">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(Boolean(error)), "min-h-32 resize-y py-3", className)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
  ...props
}: BaseProps & ComponentPropsWithRef<"select">) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(Boolean(error)), "h-[50px] pr-10", className)}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  className,
  ...props
}: { id: string; label: ReactNode; error?: string } & Omit<
  ComponentPropsWithRef<"input">,
  "type"
>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-start gap-3 text-sm text-ink-2">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("size-6 flex-none accent-ink", className)}
          {...props}
        />
        <span className="pt-0.5">{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="m-0 flex items-center gap-1.5 text-[13px] text-error">
          <AlertIcon size={14} />
          {error}
        </p>
      ) : null}
    </div>
  );
}
