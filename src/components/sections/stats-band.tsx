"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountUp } from "@/components/ui/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { clients, stats } from "@/content/site";

export function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = reduce ? 0 : 60;
  const yA = useTransform(scrollYProgress, [0, 1], [-drift, drift]);
  const yB = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <section ref={ref} className="noise relative overflow-hidden bg-brand-gradient py-24 text-white md:py-32">
      <motion.div
        aria-hidden
        style={{ y: yA }}
        className="pointer-events-none absolute -left-56 -top-64 size-[620px] rounded-full bg-sky/30 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ y: yB }}
        className="pointer-events-none absolute -bottom-72 -right-56 size-[700px] rounded-full bg-brand-300/20 blur-[120px]"
      />

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {/* eyebrow omitted: stats.eyebrow repeats the title word for word */}
            <SectionHeading
              tone="dark"
              className="md:flex-col md:items-stretch"
              title={
                <>
                  Partnering on your <strong>AI journey.</strong>
                </>
              }
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="lead text-white/75">{stats.title}</p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 lg:grid-cols-4">
          {stats.items.map((stat) => (
            <StaggerItem key={stat.label} className="border-t border-white/15 pt-6">
              <p className="display-1 whitespace-nowrap tabular-nums">
                <span className="sr-only">{`${stat.value}${stat.suffix}`}</span>
                <span aria-hidden>
                  <CountUp value={stat.value} />
                  <span className="ml-1 inline-block align-top text-[0.5em] leading-none text-sky-light">{stat.suffix}</span>
                </span>
              </p>
              <p className="eyebrow mt-3 max-w-[16ch] text-white/70">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20 border-t border-white/15 pt-10">
          <ul className="grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10">
            {clients.slice(0, 6).map((client) => (
              <li
                key={client}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors duration-500 ease-expo hover:text-white sm:text-sm"
              >
                {client}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
