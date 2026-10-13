"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, Quote } from "lucide-react";
import { cta, testimonials } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { EXPO_OUT, Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Testimonial = (typeof testimonials)[number];
type FieldName = "firstName" | "lastName" | "email" | "jobTitle" | "phone";
type Field = { name: FieldName; label: string; autoComplete: string; type?: "email" | "tel"; required?: boolean; wide?: boolean };
type Errors = Partial<Record<FieldName, string>>;

const ROTATE_MS = 6000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUCCESS = "Thanks — we’ll be in touch within one business day.";

const FIELDS: Field[] = [
  { name: "firstName", label: "First name", autoComplete: "given-name", required: true },
  { name: "lastName", label: "Last name", autoComplete: "family-name", required: true },
  { name: "email", label: "Work email", autoComplete: "email", type: "email", required: true },
  { name: "jobTitle", label: "Job title", autoComplete: "organization-title", required: true },
  { name: "phone", label: "Phone", autoComplete: "tel", type: "tel", wide: true },
];

const INPUT =
  "w-full h-12 rounded-xl border border-line bg-ash/70 px-4 text-sm text-ink outline-none transition duration-300 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-600/10";

// Emphasise from "AI" onward, keeping the copy in site.ts.
const split = cta.title.indexOf("AI");
const TITLE =
  split > 0 ? (
    <>
      {cta.title.slice(0, split)}
      <strong>{cta.title.slice(split)}</strong>
    </>
  ) : (
    cta.title
  );

function validate(data: FormData): Errors {
  const errors: Errors = {};
  for (const field of FIELDS) {
    const value = String(data.get(field.name) ?? "").trim();
    if (field.required && !value) errors[field.name] = "This field is required.";
    else if (field.type === "email" && value && !EMAIL_RE.test(value)) errors[field.name] = "Enter a valid work email.";
  }
  return errors;
}

function TestimonialContent({ item }: { item: Testimonial }) {
  return (
    <>
      <blockquote className="text-lg leading-relaxed text-white/85">{item.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-sky to-brand-600 text-sm font-bold text-white ring-1 ring-white/20"
        >
          {item.initials}
        </span>
        <span>
          <span className="block font-semibold text-white">{item.name}</span>
          <span className="block text-sm text-white/60">{item.role}</span>
        </span>
      </figcaption>
    </>
  );
}

function TestimonialRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Keyed on `index` so a manual pick restarts the 6s clock. Paused on hover/focus and for reduced motion.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce]);

  return (
    <Reveal
      delay={0.25}
      className="mt-12 border-t border-white/10 pt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Quote aria-hidden className="size-6 text-sky/60" />
      {/* Every quote sits invisibly in the same grid cell to reserve the tallest height: no layout shift on rotate. */}
      <div className="mt-5 grid">
        {testimonials.map((item) => (
          <figure key={item.name} aria-hidden className="invisible [grid-area:1/1]">
            <TestimonialContent item={item} />
          </figure>
        ))}
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            className="[grid-area:1/1]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EXPO_OUT }}
          >
            <TestimonialContent item={testimonials[index]} />
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center gap-1">
        {testimonials.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial from ${item.name}`}
            aria-current={i === index ? "true" : undefined}
            className="group/dot grid h-6 place-items-center px-1"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-all duration-500 ease-expo",
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/30 group-hover/dot:bg-white/60",
              )}
            />
          </button>
        ))}
      </div>
    </Reveal>
  );
}

function ContactForm() {
  const reduce = useReducedMotion();
  const [topics, setTopics] = useState<Set<string>>(() => new Set());
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const toggleTopic = (topic: string) =>
    setTopics((prev) => {
      const next = new Set(prev);
      if (!next.delete(topic)) next.add(topic);
      return next;
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nextErrors = validate(new FormData(form));
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid.name) as HTMLElement | null)?.focus();
      return;
    }
    // ponytail: no network call by design; wire a server action here when the CRM endpoint exists.
    setSent(true);
  }

  function clearFieldError(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name as FieldName;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function reset() {
    setTopics(new Set());
    setErrors({});
    setSent(false);
  }

  const fade = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -12 },
    transition: { duration: reduce ? 0 : 0.6, ease: EXPO_OUT },
  };

  return (
    <div className="rounded-3xl bg-white p-7 text-ink shadow-2xl shadow-brand-950/40 md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div key="done" {...fade} className="flex min-h-[26rem] flex-col items-center justify-center text-center">
            <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Check aria-hidden className="size-6" strokeWidth={2.5} />
            </span>
            <h3
              ref={(el) => el?.focus({ preventScroll: true })}
              tabIndex={-1}
              className="mt-6 max-w-sm text-2xl font-bold leading-snug tracking-[-0.02em] outline-none"
            >
              {SUCCESS}
            </h3>
            <Button variant="ghost" className="mt-6" onClick={reset}>
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            {...fade}
            noValidate
            onSubmit={handleSubmit}
            onChange={clearFieldError}
            className="flex flex-col gap-8"
          >
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-ink">What can we help with?</legend>
              <div className="flex flex-wrap gap-2">
                {cta.topics.map((topic) => {
                  const on = topics.has(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleTopic(topic)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ease-expo",
                        on ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink-600 hover:border-ink hover:text-ink",
                      )}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => {
                const error = errors[f.name];
                const id = `contact-${f.name}`;
                return (
                  <div key={f.name} className={cn(f.wide && "sm:col-span-2")}>
                    <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-ink-600">
                      {f.label}
                      {f.required && <span className="text-brand-600"> *</span>}
                    </label>
                    <input
                      id={id}
                      name={f.name}
                      type={f.type ?? "text"}
                      autoComplete={f.autoComplete}
                      required={f.required}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `${id}-error` : undefined}
                      className={cn(INPUT, error && "border-red-500 focus:border-red-500 focus:ring-red-500/10")}
                    />
                    {error && (
                      <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
                        {error}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="sm:col-span-2">
                <label htmlFor="contact-project" className="mb-1.5 block text-xs font-medium text-ink-600">
                  Describe your project
                </label>
                <textarea
                  id="contact-project"
                  name="project"
                  rows={4}
                  className={cn(INPUT, "h-auto resize-none py-3 leading-relaxed")}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm text-ink-600">
              <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-brand-600" />
              <span>{cta.consent}</span>
            </label>

            <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-ink-500">{cta.legal}</p>
              <Button type="submit" variant="primary" size="lg" className="w-full shrink-0 sm:w-auto">
                {cta.submit}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CtaContact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);

  return (
    // overflow-clip (not hidden) so the left column can stay sticky against the viewport.
    <section ref={ref} id="contact" className="noise relative overflow-clip bg-ink-gradient py-24 text-white md:py-32">
      <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-40 size-[560px] rounded-full bg-brand-500/40 blur-[140px]" />
        <div className="absolute -bottom-56 -right-32 size-[520px] rounded-full bg-sky/20 blur-[140px]" />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000,transparent)]"
      />

      <div className="container-x relative z-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:col-span-6">
          <SectionHeading tone="dark" eyebrow={cta.eyebrow} title={TITLE} description={cta.description} />
          <TestimonialRotator />
        </div>
        <Reveal delay={0.1} className="lg:col-span-6">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
