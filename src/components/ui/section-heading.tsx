import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MaskedTextReveal } from "./text-reveal-mask";
import { Reveal } from "./reveal";
import { Button } from "./button";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Rich title; wrap emphasized words in <strong>. */
  title: ReactNode;
  description?: ReactNode;
  /** Optional right-aligned action, e.g. { label: "View all services", href: "#services" } */
  action?: { label: string; href: string };
  tone?: "light" | "dark";
  align?: "left" | "center";
  size?: "display-2" | "display-1";
  className?: string;
};

/**
 * Standard section header: eyebrow → masked-reveal title → optional description, with an optional action on the right.
 * Use it in every section so the page shares one rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  align = "left",
  size = "display-2",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("w-full max-w-3xl flex-1 min-w-0", centered && "mx-auto")}>
        {eyebrow && (
          <Reveal delay={0} y={12}>
            <p className={cn("eyebrow mb-5", dark && "text-sky-light/80")}>{eyebrow}</p>
          </Reveal>
        )}
        <MaskedTextReveal
          as="h2"
          splitBy="lines"
          stagger={0.1}
          className={cn(
            size,
            dark ? "text-white [&_strong]:text-gradient-sky" : "text-ink [&_strong]:text-brand-600",
            "[&_strong]:font-extrabold",
          )}
        >
          {title}
        </MaskedTextReveal>
        {description && (
          <Reveal delay={0.15}>
            <p className={cn("lead mt-6 max-w-2xl", dark && "text-white/75", centered && "mx-auto")}>{description}</p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.2} y={12} className="shrink-0">
          <Button href={action.href} variant={dark ? "outline-white" : "outline"} size="md">
            {action.label}
          </Button>
        </Reveal>
      )}
    </div>
  );
}
