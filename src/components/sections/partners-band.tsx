"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { partners } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export function PartnersBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const words = partners.title.split(" ");
  const title = (
    <>
      {words.slice(0, -2).join(" ")} <strong>{words.slice(-2).join(" ")}</strong>
    </>
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-brand-gradient py-20 text-white noise md:py-28">
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: orbY }}
        className="pointer-events-none absolute -top-48 -left-40 size-[36rem] rounded-full bg-sky/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-56 size-[40rem] rounded-full bg-brand-900/40 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_80%)]"
      />

      <div className="relative container-x">
        <SectionHeading tone="dark" align="center" title={title} />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {partners.items.map((p) => (
            <StaggerItem key={p.name}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-7 py-6 backdrop-blur transition duration-500 ease-expo hover:-translate-y-1 hover:bg-white/15">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-xl font-extrabold text-brand-700 shadow-[0_8px_24px_-12px_rgba(10,6,24,0.5)]"
                >
                  {p.mono}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg leading-tight font-bold">{p.name}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.18em] text-white/60 uppercase">{p.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
