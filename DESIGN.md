# Valentisys landing page — design brief

Premium B2B services landing page (reference feel: tkxel.com — deep electric-blue brand, generous white sections, black mega-footer, confident 800-weight headlines, restrained motion). Target quality: a $10k agency build. Everything below is binding for every section.

## Stack (already installed — do not add packages)

- Next.js 16.4 (App Router, `src/app`), React 19.3, TypeScript strict, Tailwind v4 (`src/app/globals.css` holds all tokens via `@theme` and `@utility`).
- `motion` v14 → import from `"motion/react"` (`motion`, `useScroll`, `useTransform`, `useInView`, `useReducedMotion`, `useMotionValue`, `useMotionTemplate`, `useSpring`, `animate`, `AnimatePresence`).
- `lenis` smooth scroll is already mounted globally (`src/components/smooth-scroll.tsx`). It drives real window scroll, so `useScroll` works unchanged.
- `@paper-design/shaders-react` → `MeshGradient` (props: `colors: string[]`, `distortion` 0–1, `swirl` 0–1, `speed`, `grainMixer`, `grainOverlay`, `className`). Hero only.
- `lucide-react` icons, `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts`.
- `next/link` for links, `next/font` (Plus Jakarta Sans) is wired as `--font-jakarta` → Tailwind `font-sans`.
- No images or external assets. All visuals are CSS/SVG/gradients/shaders. Avatars are initials in gradient circles. Logos are typographic wordmarks or monogram tiles.

## Content

All copy lives in `src/content/site.ts`. Import the named exports (`site`, `nav`, `hero`, `clients`, `services`, `stats`, `caseStudies`, `webinar`, `awards`, `partners`, `podcasts`, `insights`, `testimonials`, `cta`, `footer`). Never hard-code copy in a component. Do not edit `site.ts` — if a field is missing, derive it locally.

## Tokens (Tailwind utilities available)

Colors: `brand-50…950` (600 = `#0755e9` primary, 800 = `#10347e` deep, 900 = `#0b1f4f` navy), `ink` (#020816 text), `ink-800/700/600/500/400/300`, `ash` (#f6f7f9 alt background), `line` (#e6e9ef borders), `sky` / `sky-light` (highlight tints for dark surfaces).

Surfaces: `bg-brand-gradient` (blue band), `bg-ink-gradient` (navy/black band), `noise` (adds subtle grain via ::after; parent must be `relative`), `card` (white rounded-3xl bordered with soft shadow) + `card-hover` (lift + blue-tinted shadow), `pill` (tag chip), `mask-fade-x`, `hide-scrollbar`.

Typography: `display-1` (hero), `display-2` (section titles), `display-3` (card titles), `lead` (section intro paragraph), `eyebrow` (11px uppercase tracked label), `text-gradient-sky` (light-blue gradient text for dark surfaces), `text-gradient-brand`.

Layout: `container-x` (max 1280px, 24/40px gutters), `section` (py-24 md:py-32). Easing: `ease-expo`, `ease-smooth`. Shadows: `shadow-card`, `shadow-card-hover`, `shadow-glow`. Animations: `animate-marquee`, `animate-float`, `animate-spin-slow`.

Radii: cards `rounded-3xl` (24px), small tiles `rounded-2xl`, buttons/pills `rounded-full`. Borders are 1px `line`. Never use pure black (#000); the darkest surface is `bg-ink-gradient` / `bg-ink`.

## Shared primitives (use these; do not re-implement)

- `SectionHeading` (`@/components/ui/section-heading`): `{ eyebrow?, title (ReactNode, wrap emphasis in <strong>), description?, action?: {label, href}, tone?: "light"|"dark", align?: "left"|"center", size? }`. Every section opens with it.
- `MaskedTextReveal` (`@/components/ui/text-reveal-mask`): 21st.dev masked line/word/char reveal. Props `as`, `splitBy`, `stagger`, `delay`, `className`, children with `<strong>` emphasis. Use for hero headline (`splitBy="words"` or `"lines"`), big quotes, stats captions.
- `Reveal`, `Stagger`, `StaggerItem` (`@/components/ui/reveal`): fade-rise on scroll (once, expo-out). Wrap cards in `Stagger` + `StaggerItem` for 90ms cascades. `EXPO_OUT` is exported for custom transitions.
- `CountUp` (`@/components/ui/count-up`): `{ value, prefix?, suffix?, decimals?, duration? }` counts when in view.
- `Marquee` (`@/components/ui/marquee`): CSS infinite marquee; pass children, `duration`, `reverse`, `gap`.
- `Button` (`@/components/ui/button`): `variant` = `primary | white | outline | outline-white | ghost | ghost-white`, `size` = `sm | md | lg`, `arrow` (default true), `href` renders a Link.

## Motion rules (the "premium" is in the restraint)

1. Entrances: everything enters on scroll via `Reveal`/`Stagger` or `MaskedTextReveal`. Duration 0.8–1.0s, expo-out, 24–32px rise, stagger 80–100ms. Fire once.
2. Scroll-linked depth: use `useScroll` + `useTransform` for parallax on at most one or two layers per section (background glow drifts 40–80px, decorative shapes rotate ≤12°). Never parallax body text.
3. Hover: cards lift 4px + `shadow-card-hover` in 500ms expo; arrows translate 4px; images/glyphs scale ≤1.04. No color flashes.
4. Continuous motion is slow and ambient (marquee 40–60s loops, float 7s, shader `speed` ≤ 0.7). Nothing bounces. No springs with visible overshoot.
5. Always respect `useReducedMotion()` for custom motion (primitives already do).
6. Z-stack: decorative layers are `pointer-events-none` and `aria-hidden`.

## Section anatomy

```
<section id="…" className="section [bg]">
  <div className="container-x">
    <SectionHeading … />
    <div className="mt-14 md:mt-20">…content…</div>
  </div>
</section>
```

Blue/navy bands are full-bleed (`bg-brand-gradient noise relative overflow-hidden`), white text, with 1–2 blurred glow orbs (`absolute rounded-full bg-sky/30 blur-[120px]`) positioned off-canvas corners. Alternate rhythm top-to-bottom: white → white → blue band → white → navy banner → white → blue band → white → ash → white/blue CTA → black footer.

## Accessibility & quality bar

- Semantic landmarks (`header`, `nav`, `main` sections, `footer`), one `h1` (hero), `h2` per section, `h3` for cards.
- Links/buttons have visible focus (`focus-visible` ring is global). Decorative SVG gets `aria-hidden`.
- Mobile first: every section must look intentional at 375px and 1440px. Card rows become horizontal snap-scroll (`hide-scrollbar`, `snap-x`) or stack. Hero headline must fit at 375px without horizontal scroll.
- No layout shift: reserve heights for animated counters and marquees.
- Keep components self-contained: one file per section, exporting a single named component with no required props. `"use client"` only where hooks/motion are used (most section files will be client components; that is fine).

## Verification each author must run

```
npx tsc --noEmit
npx eslint src/components/sections/<your-files>
```

Both must be clean. Do not run `next build` or `next dev` (another process owns them). Do not touch files you do not own.
