"use client";

import {
  AlertCircle,
  CheckCircle2,
  FileDown,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

const contactChannels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: siteConfig.links.github.replace("https://", ""),
    href: siteConfig.links.github,
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: siteConfig.links.linkedin.replace("https://", ""),
    href: siteConfig.links.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "Location",
    value: siteConfig.location,
    href: null,
    icon: MapPin,
  },
];

const inputStyles =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors duration-300 focus:border-accent focus:outline-none";

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

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

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="08 · Contact"
            title="Let's build something together"
            description="Have an opportunity, a project or just want to say hi? My inbox is always open — I'll get back to you as soon as I can."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Contact channels */}
          <div className="space-y-4">
            {contactChannels.map((channel, index) => {
              const content = (
                <Card
                  hover={channel.href !== null}
                  className="flex items-center gap-4 p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <channel.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-subtle">{channel.label}</p>
                    <p className="truncate text-sm font-medium text-foreground">
                      {channel.value}
                    </p>
                  </div>
                </Card>
              );
              return (
                <Reveal key={channel.label} delay={index * 0.06}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      {...(channel.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <Button
                href={siteConfig.resumeUrl}
                download
                variant="secondary"
                className="w-full"
              >
                <FileDown className="h-4 w-4 text-accent" />
                Download CV
              </Button>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <Card hover={false} className="p-7">
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field — hidden from real users. */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      aria-invalid={Boolean(errors.name)}
                      className={cn(
                        inputStyles,
                        errors.name && "border-red-500/60"
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      aria-invalid={Boolean(errors.email)}
                      className={cn(
                        inputStyles,
                        errors.email && "border-red-500/60"
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity…"
                    aria-invalid={Boolean(errors.message)}
                    className={cn(
                      inputStyles,
                      "resize-none",
                      errors.message && "border-red-500/60"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>

                {/* Result feedback */}
                {status === "success" && (
                  <p
                    role="status"
                    className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Message sent successfully — I&apos;ll get back to you soon!
                  </p>
                )}
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
