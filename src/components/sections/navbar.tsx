"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { nav, services, site, type NavChild } from "@/content/site";
import { Button } from "@/components/ui/button";
import { EXPO_OUT } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Not in site.ts; derived locally per DESIGN.md.
const LANG = "EN";

const linkClass =
  "relative inline-flex items-center gap-1 px-3.5 py-2 text-[15px] font-medium after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-expo hover:after:scale-x-100";

function Wordmark() {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="text-2xl font-extrabold tracking-[-0.04em]">
      {site.name}
      <sup className="-top-[1.1em] ml-0.5 text-[9px] font-semibold">®</sup>
    </Link>
  );
}

function ServicesMenu({ label, href, items }: { label: string; href: string; items: NavChild[] }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        triggerRef.current?.focus();
        setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href={href}
        aria-expanded={open}
        aria-controls="services-menu"
        className={linkClass}
      >
        {label}
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 opacity-70 transition-transform duration-500 ease-expo", open && "rotate-180")}
          strokeWidth={2.25}
        />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 6, transition: { duration: 0.2 } }}
            transition={{ duration: 0.45, ease: EXPO_OUT }}
          >
            <div className="w-[640px] rounded-3xl border border-line bg-white p-6 text-ink shadow-card-hover">
              <ul className="grid grid-cols-2 gap-1">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group/item flex items-start justify-between gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-ash focus-visible:bg-ash"
                    >
                      <span>
                        <span className="block font-semibold text-ink">{item.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-500">{item.description}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 -translate-x-1 translate-y-1 text-brand-600 opacity-0 transition-all duration-500 ease-expo group-hover/item:translate-x-0 group-hover/item:translate-y-0 group-hover/item:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-6 rounded-2xl bg-ash px-5 py-4">
                <p className="text-sm text-ink-500">{site.tagline}</p>
                <Link
                  href={services.action.href}
                  onClick={() => setOpen(false)}
                  className="group/all inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600"
                >
                  {services.action.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-500 ease-expo group-hover/all:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24));

  // Lock page scroll while the mobile menu is open; close on Escape or when resized to desktop.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const menuBtn = menuBtnRef.current;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      menuBtn?.focus();
    };
  }, [mobileOpen]);

  // Any link inside the overlay closes it.
  const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
  };

  // Minimal focus trap for the dialog.
  const onOverlayKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusables = e.currentTarget.querySelectorAll<HTMLElement>("a[href], button");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: EXPO_OUT }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-400 ease-smooth",
          solid
            ? "border-line bg-white/85 text-ink backdrop-blur-xl"
            : "border-transparent bg-transparent text-white [&_:focus-visible]:outline-white",
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between md:h-20">
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.links.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <ServicesMenu label={link.label} href={link.href} items={link.children} />
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden px-2 text-xs font-semibold tracking-[0.14em] opacity-80 md:inline">{LANG}</span>
            <button
              type="button"
              aria-label="Search"
              className={cn(
                "grid size-10 place-items-center rounded-full transition-colors duration-300",
                solid ? "hover:bg-ash" : "hover:bg-white/10",
              )}
            >
              <Search aria-hidden className="size-[18px]" strokeWidth={2} />
            </button>
            <Button
              href={nav.cta.href}
              variant={solid ? "primary" : "white"}
              size="sm"
              className="ml-2 hidden sm:inline-flex"
            >
              {nav.cta.label}
            </Button>
            <button
              ref={menuBtnRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "grid size-10 place-items-center rounded-full transition-colors duration-300 lg:hidden",
                solid ? "hover:bg-ash" : "hover:bg-white/10",
              )}
            >
              <Menu aria-hidden className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap position: fixed. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            onClick={onOverlayClick}
            onKeyDown={onOverlayKeyDown}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink-gradient text-white lg:hidden [&_:focus-visible]:outline-white"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EXPO_OUT }}
          >
            <div className="container-x flex h-[72px] shrink-0 items-center justify-between md:h-20">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                autoFocus
                onClick={() => setMobileOpen(false)}
                className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors duration-300 hover:bg-white/10"
              >
                <X aria-hidden className="size-5" strokeWidth={2} />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-x flex-1 pt-6">
              <ul>
                {nav.links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    className="border-b border-white/10"
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EXPO_OUT }}
                  >
                    <Link href={link.href} className="group display-3 flex items-center justify-between py-5">
                      {link.label}
                      <ArrowUpRight
                        aria-hidden
                        className="size-6 text-white/40 transition-all duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="container-x shrink-0 pt-10 pb-10"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 + nav.links.length * 0.07, ease: EXPO_OUT }}
            >
              <Button href={nav.cta.href} variant="white" size="lg" className="w-full">
                {nav.cta.label}
              </Button>
              <div className="mt-6 flex flex-col gap-1.5 text-sm text-white/60">
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-white">
                  {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
