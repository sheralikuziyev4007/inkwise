"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, ButtonLink } from "@/components/ui/button";
import { CheckboxField, SelectField, TextAreaField, TextField } from "@/components/ui/form-field";
import { AlertIcon, CheckIcon } from "@/components/ui/icons";
import {
  contactSchema,
  submitContact,
  volumeOptions,
  type ContactInput,
  type ContactValues,
} from "@/lib/contact-schema";

type Status = "idle" | "success" | "error";

interface ContactFormProps {
  /** Injected in tests to skip the network delay. */
  submit?: (values: ContactValues) => Promise<unknown>;
}

export function ContactForm({ submit = submitContact }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const successHeading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", company: "", volume: undefined, message: "" },
  });

  const errorCount = Object.keys(errors).length;

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
    if (status === "error") errorBox.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactValues) => {
    setStatus("idle");
    try {
      await submit(values);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[520px] flex-col items-start justify-center gap-5">
        <span className="inline-flex size-[72px] items-center justify-center rounded-full bg-highlight">
          <CheckIcon size={32} />
        </span>
        <h2
          ref={successHeading}
          tabIndex={-1}
          className="m-0 font-display text-[44px] leading-none font-bold tracking-[-0.03em] outline-none"
        >
          Message received.
        </h2>
        <p className="m-0 max-w-md text-[17px] leading-relaxed text-ink-2">
          Thanks — we&apos;ll reply within one business day. Meanwhile, see how other ops teams use
          Inkwise.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/customers">Read customer stories</ButtonLink>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      aria-describedby="form-note"
    >
      {status === "error" ? (
        <div
          ref={errorBox}
          role="alert"
          tabIndex={-1}
          className="flex items-start gap-2.5 rounded-xl bg-error-soft px-4 py-3.5 text-[15px] text-error outline-none"
        >
          <AlertIcon size={18} className="mt-0.5 flex-none" />
          <span>Something went wrong and your message was not sent. Please try again.</span>
        </div>
      ) : null}
      {submitCount > 0 && errorCount > 0 ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-error-soft px-4 py-3.5 text-[15px] text-error"
        >
          <AlertIcon size={18} className="mt-0.5 flex-none" />
          <span>
            Please fix the {errorCount} highlighted {errorCount === 1 ? "field" : "fields"}.
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          id="company"
          label="Company"
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
      </div>
      <TextField
        id="email"
        type="email"
        label="Work email"
        autoComplete="email"
        placeholder="you@company.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <SelectField
        id="volume"
        label="Documents per month"
        error={errors.volume?.message}
        defaultValue=""
        {...register("volume")}
      >
        <option value="" disabled>
          Select a range
        </option>
        {volumeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectField>
      <TextAreaField
        id="message"
        label="What documents do you process?"
        rows={4}
        hint="Document types, rough volume and the systems they end up in."
        error={errors.message?.message}
        {...register("message")}
      />
      <CheckboxField
        id="consent"
        label={
          <>
            I agree that Inkwise may contact me about this request.{" "}
            <Link href="/about" className="font-semibold text-ink underline underline-offset-2">
              About us
            </Link>
          </>
        }
        error={errors.consent?.message}
        {...register("consent")}
      />
      <Button type="submit" size="lg" disabled={isSubmitting} aria-disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-paper border-t-transparent"
              aria-hidden="true"
            />
            Sending…
          </>
        ) : status === "error" ? (
          "Try again"
        ) : (
          "Send message"
        )}
      </Button>
      <p id="form-note" className="m-0 text-[13px] text-ink-3">
        Demo form — nothing is sent. Use an address ending in{" "}
        <code className="font-mono">@fail.test</code> to see the error state.
      </p>
    </form>
  );
}
