"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { caseStudies, type CaseStudy } from "@/content/site";

// Not in site.ts; derived locally per the brief.
const VIEW_LABEL = "View case study";

const PANEL: Record<CaseStudy["accent"], string> = {
  blue: "noise bg-brand-gradient text-white",
  navy: "noise bg-ink-gradient text-white",
  sky: "bg-[linear-gradient(135deg,#e6eeff,#cfe4ff)] text-ink",
};

const DARK_PILL =
  "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white";

function CaseCard({ study }: { study: CaseStudy }) {
  const dark = study.accent !== "sky";
  return (
    <article className="group card card-hover flex h-full flex-col overflow-hidden transition-[translate,box-shadow]">
      <div className={cn("relative flex h-60 flex-col justify-between gap-4 overflow-hidden p-7", PANEL[study.accent])}>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-20 -top-20 size-60 rounded-full border transition-transform duration-700 ease-expo group-hover:scale-[1.04]",
            dark ? "border-white/15" : "border-brand-600/15",
          )}
        >
          <div className={cn("absolute inset-10 rounded-full border", dark ? "border-white/10" : "border-brand-600/10")} />
          <div className={cn("absolute inset-16 rounded-full blur-2xl", dark ? "bg-sky/30" : "bg-white/70")} />
        </div>

        <div className="relative">
          <p className="display-2 tabular-nums">{study.metric}</p>
          <p className="mt-2 line-clamp-3 max-w-[32ch] text-[15px] leading-snug opacity-90">{study.headline}</p>
        </div>
        <ul className="relative flex flex-wrap gap-1.5">
          {study.tags.map((tag) => (
            <li key={tag} className={dark ? DARK_PILL : "pill"}>
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-7">
        <Link
          href={caseStudies.action.href}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-600"
        >
          {VIEW_LABEL}
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
        <figure className="flex flex-1 flex-col gap-6">
          <div>
            <Quote aria-hidden className="size-5 text-brand-300" />
            <blockquote className="mt-3 text-[15px] leading-relaxed text-ink-700">{study.quote}</blockquote>
          </div>
          <figcaption className="mt-auto flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#0755e9,#5e93ff)] text-sm font-bold text-white"
            >
              {study.author.initials}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink">{study.author.name}</span>
              <span className="block text-xs text-ink-500">{study.author.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

function RailButton({
  dir,
  disabled,
  controls,
  onClick,
}: {
  dir: 1 | -1;
  disabled: boolean;
  controls: string;
  onClick: () => void;
}) {
  const Icon = dir < 0 ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      aria-label={dir < 0 ? "Previous case study" : "Next case study"}
      aria-controls={controls}
      aria-disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors duration-500 ease-expo hover:border-ink hover:bg-ink hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-35"
    >
      <Icon aria-hidden className="size-4" strokeWidth={2.25} />
    </button>
  );
}

export function CaseStudies() {
  const railId = useId();
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollXProgress } = useScroll({ container: railRef });
  const progress = useTransform(scrollXProgress, [0, 1], [1 / caseStudies.items.length, 1]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useMotionValueEvent(scrollXProgress, "change", (v) => {
    setAtStart(v < 0.01);
    setAtEnd(v > 0.99);
  });

  const go = (dir: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.firstElementChild as HTMLElement | null | undefined;
    if (!rail || !card) return;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const arrows = (
    <>
      <RailButton dir={-1} disabled={atStart} controls={railId} onClick={() => go(-1)} />
      <RailButton dir={1} disabled={atEnd} controls={railId} onClick={() => go(1)} />
    </>
  );

  return (
    <section id="customers" className="section bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* flex-col + stretch: MaskedTextReveal collapses to a narrow column inside a shrink-to-fit flex item */}
          <SectionHeading
            eyebrow={caseStudies.eyebrow}
            title={caseStudies.title}
            className="min-w-0 flex-1 md:flex-col md:items-stretch"
          />
          <Reveal delay={0.2} y={12} className="flex shrink-0 items-center gap-3">
            <Button href={caseStudies.action.href} variant="outline" size="md">
              {caseStudies.action.label}
            </Button>
            <div className="hidden gap-3 md:flex">{arrows}</div>
          </Reveal>
        </div>

        {/* Rail bleeds to the right gutter; extra padding keeps hover lift + shadow from being clipped. */}
        <Stagger className="mt-10 md:mt-16">
          <div
            ref={railRef}
            id={railId}
            role="region"
            aria-label={caseStudies.title}
            className="hide-scrollbar -ml-4 -mr-6 flex snap-x snap-mandatory scroll-pl-4 gap-6 overflow-x-auto pt-4 pr-6 pb-12 pl-4 motion-safe:scroll-smooth md:-mr-10 md:pr-10"
          >
            {caseStudies.items.map((study) => (
              <StaggerItem key={study.author.name} className="w-[85vw] shrink-0 snap-start sm:w-[420px]">
                <CaseCard study={study} />
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <div className="flex items-center gap-6">
          <div aria-hidden className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-line">
            <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left rounded-full bg-ink" />
          </div>
          <div className="flex gap-3 md:hidden">{arrows}</div>
        </div>
      </div>
    </section>
  );
}
