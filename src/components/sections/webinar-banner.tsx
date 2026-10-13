"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site, webinar } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const PARTNER_WORDMARK = "harness";

export function WebinarBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const sweepX = useTransform(scrollYProgress, [0, 1], ["-40%", "140%"]);

  return (
    <section ref={ref} className="bg-white py-10 md:py-16">
      <div className="container-x">
        <Reveal className="relative grid min-h-[440px] items-center gap-10 overflow-hidden rounded-[2rem] bg-ink-gradient p-8 text-white noise md:p-14 lg:grid-cols-12">
          {/* Diagonal light sweep, scrubbed by scroll */}
          <motion.div
            aria-hidden
            style={reduce ? undefined : { x: sweepX }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />
          </motion.div>

          <div className="relative lg:col-span-7">
            <div className="flex items-center gap-4 text-lg">
              <span className="font-extrabold tracking-tight">{site.name}</span>
              <span aria-hidden className="text-white/40">
                ×
              </span>
              <span className="font-semibold tracking-tight text-white/70">{PARTNER_WORDMARK}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="pill border-white/20 bg-white/10 text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
                {webinar.eyebrow}
              </span>
              <span className="text-sm text-white/60">
                {webinar.date} · {webinar.time}
              </span>
            </div>

            <MaskedTextReveal as="h2" className="display-2 mt-6 text-white">
              {webinar.title}
            </MaskedTextReveal>

            <Reveal delay={0.15}>
              <p className="lead mt-5 max-w-xl text-white/70">{webinar.description}</p>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href={webinar.cta.href} variant="white" size="lg">
                {webinar.cta.label}
              </Button>
              <Button href={webinar.secondary.href} variant="ghost-white" size="lg">
                {webinar.secondary.label}
              </Button>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            {/* Orb + orbit ring behind the speakers */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                style={reduce ? undefined : { y: orbY }}
                className="absolute inset-12 rounded-full bg-brand-500/40 blur-[100px]"
              />
              <svg viewBox="0 0 416 416" fill="none" className="absolute inset-0 size-full animate-spin-slow text-white/10">
                <circle cx="208" cy="208" r="207" stroke="currentColor" />
                <circle cx="208" cy="208" r="160" stroke="currentColor" strokeDasharray="2 8" />
                <circle cx="208" cy="1" r="3" className="fill-sky/70" />
              </svg>
            </div>

            <Stagger className="relative flex flex-col gap-4 sm:flex-row">
              {webinar.speakers.map((s) => (
                <StaggerItem
                  key={s.name}
                  className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-md"
                >
                  <div
                    aria-hidden
                    className="mx-auto grid size-24 place-items-center rounded-full bg-[linear-gradient(135deg,#0755e9,#8ec5ff)] text-2xl font-extrabold ring-4 ring-white/10 md:size-28"
                  >
                    {s.initials}
                  </div>
                  <p className="mt-4 font-semibold">{s.name}</p>
                  <p className="mt-1 text-sm text-white/60">{s.role}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
