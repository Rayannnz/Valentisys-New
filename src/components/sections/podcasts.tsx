"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { podcasts, site, type Podcast } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const BARS = [0.55, 1, 0.7, 0.85];

function Equalizer() {
  const reduce = useReducedMotion();
  return (
    <span aria-hidden className="flex h-4 items-end gap-[3px]">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className="h-full w-[3px] origin-bottom rounded-full bg-sky-light"
          initial={{ scaleY: h }}
          animate={reduce ? undefined : { scaleY: [h, 1, 0.5, 0.9, 0.4] }}
          transition={{ duration: 1.1, delay: i * 0.12, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function PodcastCard({ p }: { p: Podcast }) {
  return (
    <Link
      href={podcasts.action.href}
      className="group card card-hover flex h-full flex-col overflow-hidden transition-[translate,box-shadow]"
    >
      <div aria-hidden className="relative aspect-[4/3] overflow-hidden bg-ink-gradient">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -right-10 -bottom-10 size-44 rounded-full bg-brand-500/50 blur-[60px]" />

        <span className="absolute top-5 left-5 text-xs font-extrabold tracking-tight text-white">
          {site.name}
        </span>
        <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
          {podcasts.eyebrow} · {p.episode}
        </span>

        <div className="absolute inset-x-0 top-10 bottom-16 grid place-items-center">
          <div className="relative transition-transform duration-500 ease-expo group-hover:scale-[1.04]">
            <span className="grid size-20 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-600),var(--color-sky))] text-xl font-extrabold text-white ring-4 ring-white/10">
              {p.guest.initials}
            </span>
            <span className="absolute -right-4 -bottom-1 grid size-12 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-800),var(--color-brand-500))] text-sm font-bold text-white ring-2 ring-ink-800">
              {p.host.initials}
            </span>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-white text-brand-600 shadow-[0_10px_30px_-10px_rgba(7,85,233,0.7)] transition-transform duration-500 ease-expo group-hover:scale-[1.08]">
            <Play className="size-5 translate-x-px fill-current" strokeWidth={2} />
          </span>
          <Equalizer />
          <span className="text-xs text-white/70">{p.duration}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="sr-only">
          {podcasts.eyebrow} {p.episode}, {p.duration}.
        </span>
        <h3 className="line-clamp-3 text-base leading-snug font-semibold text-ink transition-colors duration-500 ease-expo group-hover:text-brand-600">
          {p.title}
        </h3>
        <div className="mt-auto pt-4 text-xs text-ink-500">
          <p className="font-medium text-ink-600">
            {p.guest.name} · {p.host.name}
          </p>
          <p className="mt-1">{p.guest.role}</p>
        </div>
      </div>
    </Link>
  );
}

export function Podcasts() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading eyebrow={podcasts.eyebrow} title={podcasts.title} action={podcasts.action} />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-20 xl:grid-cols-4">
          {podcasts.items.map((p) => (
            <StaggerItem key={p.episode}>
              <PodcastCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
