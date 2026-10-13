"use client";

import { useId } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { services, type ServiceGlyph } from "@/content/site";

/** Asymmetric blob shapes the "wave" glyph morphs between. */
const BLOB = [
  "42% 58% 63% 37% / 41% 44% 56% 59%",
  "58% 42% 36% 64% / 55% 38% 62% 45%",
  "37% 63% 51% 49% / 63% 52% 48% 37%",
];

const WAVE_BG =
  "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.7), rgba(255,255,255,0) 42%), linear-gradient(135deg, #9cbeff 0%, #2569e6 48%, #0a46bf 100%)";

function GlyphShape({ kind, fill }: { kind: Exclude<ServiceGlyph, "wave">; fill: string }) {
  if (kind === "spark") {
    return <path fill={fill} d="M56 4C59.5 38 74 52.5 108 56C74 59.5 59.5 74 56 108C52.5 74 38 59.5 4 56C38 52.5 52.5 38 56 4Z" />;
  }
  if (kind === "ring") {
    return (
      <path
        fill={fill}
        fillRule="evenodd"
        d="M56 8a48 48 0 1 1 0 96a48 48 0 1 1 0-96ZM56 35a21 21 0 1 0 0 42a21 21 0 1 0 0-42Z"
      />
    );
  }
  return (
    <g fill={fill}>
      <circle cx="33" cy="33" r="22" />
      <circle cx="79" cy="33" r="22" />
      <circle cx="33" cy="79" r="22" />
      <circle cx="79" cy="79" r="22" />
    </g>
  );
}

/** 112px abstract "3D" glyph: brand gradient body, inner highlight, bottom shade, soft drop shadow. */
function Glyph({ kind, index }: { kind: ServiceGlyph; index: number }) {
  const uid = useId().replace(/[^\w-]/g, "");
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className="size-28 animate-float" style={{ animationDelay: `${index * -1.75}s` }}>
      <div className="size-full drop-shadow-[0_18px_24px_rgba(7,85,233,0.28)] transition-transform duration-[600ms] ease-expo group-hover:rotate-[8deg] group-hover:scale-[1.04]">
        {kind === "wave" ? (
          <motion.div
            className="m-1.5 size-[100px] shadow-[inset_-10px_-14px_28px_rgba(6,18,54,0.28),inset_8px_10px_20px_rgba(255,255,255,0.3)]"
            style={{ borderRadius: BLOB[0], background: WAVE_BG }}
            animate={reduce ? undefined : { borderRadius: [...BLOB, BLOB[0]] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          />
        ) : (
          <svg viewBox="0 0 112 112" className="size-full overflow-visible">
            <defs>
              <linearGradient id={`${uid}-f`} x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0" stopColor="#9cbeff" />
                <stop offset="0.48" stopColor="#2569e6" />
                <stop offset="1" stopColor="#0a46bf" />
              </linearGradient>
              <radialGradient id={`${uid}-s`} cx="0.8" cy="0.85" r="0.6">
                <stop offset="0" stopColor="#061236" stopOpacity="0.32" />
                <stop offset="1" stopColor="#061236" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${uid}-h`} cx="0.32" cy="0.26" r="0.55">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.72" />
                <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <GlyphShape kind={kind} fill={`url(#${uid}-f)`} />
            <GlyphShape kind={kind} fill={`url(#${uid}-s)`} />
            <GlyphShape kind={kind} fill={`url(#${uid}-h)`} />
          </svg>
        )}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="container-x">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} action={services.action} />

        <Stagger className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {services.items.map((service, i) => (
            <StaggerItem key={service.title} className="h-full">
              <Link
                href="#services"
                className="group card card-hover flex h-full min-h-[460px] flex-col p-8 transition-[translate,box-shadow]"
              >
                <Glyph kind={service.glyph} index={i} />
                <h3 className="display-3 mt-8 min-h-[2.3em] text-ink xl:text-[1.75rem]">{service.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{service.summary}</p>
                <ul className="mt-6 divide-y divide-line border-t border-line">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="group/li flex items-center justify-between gap-3 py-2.5 text-sm text-ink-600 transition-colors duration-500 ease-expo hover:text-ink"
                    >
                      <span className="min-w-0">{item}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-500 ease-expo group-hover/li:translate-x-0 group-hover/li:opacity-100"
                      />
                    </li>
                  ))}
                </ul>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
