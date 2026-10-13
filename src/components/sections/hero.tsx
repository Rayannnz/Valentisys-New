"use client";

import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MeshGradient } from "@paper-design/shaders-react";
import { ArrowRight, Play } from "lucide-react";
import { hero, site, type HeroSlide } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MaskedTextReveal } from "@/components/ui/text-reveal-mask";
import { EXPO_OUT } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const SLIDE_SECONDS = 7;
const SHADER_COLORS = ["#130a45", "#301a7a", "#5a30d9", "#7146db", "#9a74ee"];
const SPARKLINE = "M2 54 C 28 52, 44 44, 70 45 S 108 34, 134 35 S 172 22, 198 19 S 226 9, 238 6";

// Copy not present in site.ts; derived locally per DESIGN.md.
const COPY = {
  servicesLabel: "Our AI services",
  watch: "Watch our story",
  watchHref: "#company",
  guideHref: "#insights",
  scroll: "Scroll",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Title as a fragment with the highlight wrapped in <strong> (MaskedTextReveal walks raw elements, not components). */
function titleNode({ title, highlight }: HeroSlide): ReactNode {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <strong>{highlight}</strong>
      {title.slice(at + highlight.length)}
    </>
  );
}

function Rise({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}

function SlideCopy({ slide, heading }: { slide: HeroSlide; heading: "h1" | "p" }) {
  const stat = slide.card.kind === "stat" ? slide.card : null;
  return (
    <div>
      <Rise delay={0}>
        <p className="eyebrow text-sky-light/80">{slide.eyebrow}</p>
      </Rise>

      <div className="mt-6">
        <MaskedTextReveal
          as={heading}
          splitBy="words"
          stagger={0.05}
          delay={0.1}
          className="display-1 text-white [&_strong]:text-gradient-sky"
        >
          {titleNode(slide)}
        </MaskedTextReveal>
      </div>

      <Rise delay={0.35}>
        <p className="lead mt-6 max-w-xl text-white/75">{slide.description}</p>
      </Rise>

      <Rise delay={0.45} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button href={slide.cta.href} variant="white" size="lg">
          {slide.cta.label}
        </Button>
        <Button href={COPY.watchHref} variant="ghost-white" size="lg" arrow={false}>
          <span className="inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors duration-500 ease-expo group-hover/btn:border-white group-hover/btn:bg-white group-hover/btn:text-ink">
              <Play aria-hidden className="ml-0.5 size-4 fill-current" strokeWidth={0} />
            </span>
            {COPY.watch}
          </span>
        </Button>
      </Rise>

      <Rise delay={0.55} className="mt-12">
        {slide.pills ? (
          <>
            <p className="eyebrow text-white/60">{COPY.servicesLabel}</p>
            <ul className="mt-4 flex max-w-2xl flex-wrap gap-2">
              {slide.pills.map((pill) => (
                <li key={pill}>
                  <Link
                    href={slide.cta.href}
                    className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {pill}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          stat && (
            <div className="flex max-w-xl flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-white/15 pt-6">
              <span className="text-3xl font-extrabold tracking-tight text-white tabular-nums">{stat.value}</span>
              <span className="text-sm text-white/70">{stat.label}</span>
              <span aria-hidden className="h-3 w-px self-center bg-white/20" />
              <span className="eyebrow text-sky-light/80">{stat.client}</span>
            </div>
          )
        )}
      </Rise>
    </div>
  );
}

function HeroCard({ card }: { card: HeroSlide["card"] }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useTransform(px, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(py, [-0.5, 0.5], [6, -6]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    animate(px, 0, { duration: 0.8, ease: EXPO_OUT });
    animate(py, 0, { duration: 0.8, ease: EXPO_OUT });
  };

  return (
    <div className="animate-float">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative rounded-3xl border border-white/15 bg-white/10 p-8 shadow-glow backdrop-blur-xl"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]"
        />
        {card.kind === "guide" ? (
          <div className="flex items-center gap-6">
            <div
              aria-hidden
              className="relative flex aspect-[3/4] w-40 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-ink-gradient p-4 pl-5 shadow-[0_24px_48px_-16px_rgba(10,6,24,0.7)]"
            >
              <span className="absolute inset-y-0 left-0 w-1.5 bg-white/10" />
              <Logo variant="dark" alt="" className="h-4" priority />
              <span>
                <span className="block h-1 w-8 rounded-full bg-brand-400" />
                <span className="mt-3 block text-[13px] leading-snug font-bold text-white">{card.title}</span>
              </span>
            </div>
            <div className="min-w-0">
              <p className="eyebrow text-sky-light/80">{card.eyebrow}</p>
              <p className="mt-3 text-xl leading-snug font-bold tracking-tight text-white">{card.title}</p>
              <Link
                href={COPY.guideHref}
                className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-300 hover:text-sky-light"
              >
                {card.cta}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-500 ease-expo group-hover/cta:translate-x-1"
                />
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="eyebrow text-sky-light/80">{card.client}</p>
            <p className="display-1 mt-6 text-white tabular-nums">{card.value}</p>
            <p className="mt-3 text-lg text-white/70">{card.label}</p>
            <svg aria-hidden viewBox="0 0 240 60" fill="none" className="mt-8 h-14 w-full overflow-visible">
              <path d="M0 58 H240" className="stroke-white/15" strokeDasharray="2 5" />
              <motion.path
                d={SPARKLINE}
                className="stroke-sky"
                strokeWidth={2}
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 0.5, ease: EXPO_OUT }}
              />
              <motion.circle
                cx={238}
                cy={6}
                r={3.5}
                className="fill-white"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.6 }}
              />
            </svg>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Arcs() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 800"
      fill="none"
      className="pointer-events-none absolute top-1/2 right-[-45%] size-[min(130vw,1000px)] -translate-y-1/2 animate-spin-slow stroke-white/10 md:right-[-14%]"
      style={{ animationDuration: "120s" }}
    >
      <circle cx="400" cy="400" r="399" />
      <circle cx="400" cy="400" r="318" strokeDasharray="2 10" />
      <circle cx="400" cy="400" r="236" strokeDasharray="480 1003" strokeWidth={1.5} className="stroke-white/20" />
      <circle cx="400" cy="400" r="154" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const slides = hero.slides;
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const slide = slides[index];

  // Slide timer + indicator fill share one motion value, so pausing freezes both.
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, (v) => `${v * 100}%`);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(201,176,248,0.16), transparent 70%)`;

  useEffect(() => {
    const onVisibility = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduce || hovering || docHidden) return;
    const c = animate(progress, 1, {
      duration: (1 - progress.get()) * SLIDE_SECONDS,
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setIndex((i) => (i + 1) % slides.length);
      },
    });
    controls.current = c;
    return () => c.stop();
  }, [index, hovering, docHidden, reduce, progress, slides.length]);

  const goTo = (i: number) => {
    if (i === index) return;
    controls.current?.stop();
    progress.set(0);
    setIndex(i);
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      aria-roledescription="carousel"
      aria-label={site.tagline}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-brand-950 pt-32 pb-24 text-white [&_:focus-visible]:outline-white"
    >
      {/* Background: shader + arcs drift down on scroll */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0"
      >
        <MeshGradient
          colors={SHADER_COLORS}
          distortion={0.8}
          swirl={0.15}
          speed={reduce ? 0 : 0.5}
          className="absolute inset-0 h-full w-full"
        />
        <Arcs />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(19,10,69,0.82)_0%,rgba(19,10,69,0.5)_45%,rgba(19,10,69,0.08)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(19,10,69,0.65),transparent)]"
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-12"
      >
        {/* Invisible copies of every slide reserve the tallest height, so the page never shifts between slides. */}
        <div className="grid *:col-start-1 *:row-start-1 lg:col-span-7">
          {slides.map((s, i) => (
            <div key={i} aria-hidden inert className="invisible">
              <SlideCopy slide={s} heading="p" />
            </div>
          ))}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              className="self-center"
              exit={{ opacity: 0, y: reduce ? 0 : -16, transition: { duration: 0.45, ease: EXPO_OUT } }}
            >
              <SlideCopy slide={slide} heading="h1" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="w-full max-w-[460px]"
              initial={reduce ? false : { opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : -16, transition: { duration: 0.45, ease: EXPO_OUT } }}
              transition={{ duration: 1, delay: 0.3, ease: EXPO_OUT }}
            >
              <HeroCard card={slide.card} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slide indicators + scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 md:bottom-8">
        <div className="container-x flex items-center justify-between">
          <div
            className="flex items-center gap-5"
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
          >
            <span className="text-xs font-semibold text-white tabular-nums">
              {pad(index + 1)} <span className="text-white/40">/ {pad(slides.length)}</span>
            </span>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show slide ${i + 1} of ${slides.length}: ${s.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group py-3"
                >
                  <span
                    className={cn(
                      "relative block h-[3px] overflow-hidden rounded-full bg-white/30 transition-[width,background-color] duration-700 ease-expo group-hover:bg-white/50",
                      i === index ? "w-16" : "w-8",
                    )}
                  >
                    {i === index && (
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full bg-white"
                        style={{ width: reduce ? "100%" : progressWidth }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div aria-hidden className="hidden items-center gap-3 md:flex">
            <span className="eyebrow text-white/60">{COPY.scroll}</span>
            <span className="relative block h-12 w-px overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-x-0 top-0 block h-1/2 bg-white"
                initial={{ y: "-100%" }}
                animate={reduce ? undefined : { y: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.4, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
