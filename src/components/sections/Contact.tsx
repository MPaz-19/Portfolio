"use client";

import { AlertCircle, ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { useMagnetic } from "@/components/ui/Magnetic";
import { SectionHead } from "@/components/ui/SectionHead";
import { cssVars, labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }
  return errors;
}

const channels = [
  {
    label: "GitHub",
    value: siteConfig.links.github.replace("https://", ""),
    href: siteConfig.links.github,
  },
  {
    label: "LinkedIn",
    value: siteConfig.links.linkedin
      .replace("https://www.linkedin.com/", "")
      .replace(/\/$/, ""),
    href: siteConfig.links.linkedin,
  },
  { label: "Location", value: siteConfig.location, href: null },
  { label: "Resume", value: "Download CV", href: siteConfig.resumeUrl },
];

const headline = ["Let's build", "something", "together"];

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const magnetic = useMagnetic<HTMLButtonElement>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear the field error as the user fixes it.
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Honeypot: silently ignore bot submissions.
    const honeypot = new FormData(event.currentTarget).get("_gotcha");
    if (typeof honeypot === "string" && honeypot.length > 0) {
      setStatus("success");
      return;
    }

    const validationErrors = validate(values);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    /* No Formspree endpoint configured yet → fall back to the
       visitor's email client with a prefilled message. */
    if (!siteConfig.formspreeEndpoint) {
      const subject = encodeURIComponent(
        `Portfolio contact from ${values.name}`
      );
      const body = encodeURIComponent(
        `${values.message}\n\n— ${values.name} (${values.email})`
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const fields: {
    name: keyof FormValues;
    label: string;
    type?: string;
    autoComplete?: string;
    placeholder: string;
  }[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      autoComplete: "name",
      placeholder: "Your name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      autoComplete: "email",
      placeholder: "you@company.com",
    },
    {
      name: "message",
      label: "Message",
      placeholder: "Tell me about the role or the project",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="pb-20 md:pb-24"
    >
      <Container className="flex flex-col gap-12 md:gap-20">
        <SectionHead
          id="contact-title"
          index="05"
          title="Contact"
          aside="Inbox always open"
        />

        {/* Outline headline that fills in as it scrolls into view */}
        <p className="fx-fill text-[clamp(3.25rem,10.5vw,10.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-foreground">
          {headline.map((line, index) => (
            <span
              key={line}
              className="fx-fill-line"
              style={cssVars({ "--d": index })}
            >
              {line}
              {index === headline.length - 1 && (
                <span className="fx-dot">.</span>
              )}
            </span>
          ))}
        </p>

        <div className="grid items-start gap-x-20 gap-y-14 lg:grid-cols-2">
          {/* Channels */}
          <div className="flex flex-col gap-8">
            <p className="max-w-[44ch] text-lg leading-relaxed text-muted">
              Have an opportunity, a project or just want to say hi? My inbox is
              always open — I&apos;ll get back to you as soon as I can.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="fx-link w-fit text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.03em]"
            >
              <span>{siteConfig.email}</span>
              <ArrowUpRight className="h-7 w-7" aria-hidden="true" />
            </a>
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {channels.map((channel) => (
                <div key={channel.label}>
                  <dt className={labelClass}>{channel.label}</dt>
                  <dd>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : { download: true })}
                        className="inline-flex min-h-11 items-center text-foreground transition-colors hover:text-accent"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-11 items-center text-foreground">
                        {channel.value}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-7"
          >
            {/* Honeypot field — hidden from real users. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {fields.map((field) => {
              const error = errors[field.name];
              const id = `contact-${field.name}`;
              const shared = {
                id,
                name: field.name,
                value: values[field.name],
                onChange: handleChange,
                placeholder: field.placeholder,
                "aria-invalid": Boolean(error),
                "aria-describedby": error ? `${id}-error` : undefined,
              };
              return (
                <div key={field.name}>
                  <div className="fx-field" data-invalid={Boolean(error)}>
                    <label htmlFor={id} className={labelClass}>
                      {field.label}
                    </label>
                    {field.name === "message" ? (
                      <textarea rows={4} {...shared} />
                    ) : (
                      <input
                        type={field.type}
                        autoComplete={field.autoComplete}
                        {...shared}
                      />
                    )}
                  </div>
                  {error && (
                    <p id={`${id}-error`} className="mt-2 text-xs text-red-500">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="fx-btn"
                {...magnetic}
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <p
                role="status"
                className={cn(
                  "font-mono text-xs",
                  status === "success" ? "text-accent" : "sr-only"
                )}
              >
                {status === "success"
                  ? "Message sent — I'll get back to you soon."
                  : ""}
              </p>
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="flex items-center gap-2 text-sm text-red-500"
              >
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
