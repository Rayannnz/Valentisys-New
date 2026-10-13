"use client";

import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { footer, site } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const WORDMARK = site.name;
const TEL = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

// lucide ships no brand marks; Simple Icons paths (CC0).
const SOCIAL_ICONS: Record<string, { viewBox: string; d: string; size: string }> = {
  LinkedIn: {
    viewBox: "2 2 20 20",
    size: "size-4",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452z",
  },
  X: {
    viewBox: "0 0 24 24",
    size: "size-3.5",
    d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  YouTube: {
    viewBox: "0 0 24 24",
    size: "size-[18px]",
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
};

function LinkGroup({ heading, links, className }: { heading: string; links: string[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-sm font-semibold text-white">{heading}</h2>
      <ul>
        {links.map((label) => (
          <li key={label}>
            <Link href="#" className="block text-[13px] leading-7 text-white/55 transition-colors duration-300 hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const markRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: markRef, offset: ["start end", "end end"] });
  const markY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 right-[-10%] size-[560px] rounded-full bg-brand-600/15 blur-[140px]"
      />

      <div className="container-x relative pt-20 md:pt-24">
        <nav aria-label="Footer">
          <Stagger className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {footer.columns.map((col, i) => (
              <StaggerItem key={col.heading}>
                <LinkGroup heading={col.heading} links={col.links} />
                {/* Quick links tuck under the shortest first-row column so the 4×2 grid stays even. */}
                {i === 3 && <LinkGroup heading="Quick links" links={footer.quickLinks} className="mt-10" />}
              </StaggerItem>
            ))}
          </Stagger>
        </nav>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="dark" className="h-11" />
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>
                <a href={TEL} className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white">
                  <Phone aria-hidden className="size-4 text-sky" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-white"
                >
                  <Mail aria-hidden className="size-4 text-sky" />
                  {site.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">{site.blurb}</p>
            <p className="eyebrow mt-8 text-white/50">Find us elsewhere</p>
            <ul className="mt-4 flex gap-3">
              {site.social.map((s) => {
                const icon = SOCIAL_ICONS[s.label];
                return (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition duration-500 ease-expo hover:border-white hover:bg-white hover:text-ink"
                    >
                      {icon && (
                        <svg aria-hidden viewBox={icon.viewBox} fill="currentColor" className={icon.size}>
                          <path d={icon.d} />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {footer.offices.map((office) => (
              <div key={office.country}>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin aria-hidden className="size-4 text-sky" />
                  {office.country}
                </p>
                <address className="mt-2 text-sm not-italic leading-relaxed text-white/55">{office.address}</address>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/45">{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {footer.legal.map((label) => (
              <li key={label}>
                <Link href="#" className="text-white/55 transition-colors duration-300 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={markRef} aria-hidden className="pointer-events-none relative select-none">
        <motion.p
          style={{ y: markY }}
          className="-mb-[4vw] whitespace-nowrap text-center text-[22vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.035]"
        >
          {WORDMARK}
        </motion.p>
      </div>
    </footer>
  );
}
