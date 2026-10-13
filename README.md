# Valentisys — premium B2B services landing page

Single-page marketing site for an AI-native technology services company, modelled on the feel of tkxel.com: deep electric-blue bands, generous white sections, confident 800-weight headlines, restrained scroll animation.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production check:

```bash
npm run build && npm start
```

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 — every token (colors, type scale, surfaces, motion) lives in `src/app/globals.css`
- `motion` (Framer Motion successor) for entrances, parallax and hover
- Lenis for inertial smooth scrolling (`src/components/smooth-scroll.tsx`)
- `@paper-design/shaders-react` MeshGradient for the live hero background
- 21st.dev `MaskedTextReveal` (soralabs/text-reveal-mask) for masked headline reveals

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/site.ts` | All copy, nav, stats, case studies, podcasts, insights, footer. Change the brand here. |
| `src/components/ui/` | Shared primitives: `SectionHeading`, `Reveal`/`Stagger`, `CountUp`, `Marquee`, `Button`, `MaskedTextReveal` |
| `src/components/sections/` | One file per page section, mounted in order in `src/app/page.tsx` |
| `DESIGN.md` | The design brief every section follows (tokens, motion rules, anatomy) |

## Customising

- **Brand name / copy:** edit `src/content/site.ts` only; components never hard-code text.
- **Colors:** adjust the `--color-brand-*` scale in `globals.css`; bands use `bg-brand-gradient` and `bg-ink-gradient`.
- **Motion intensity:** `Reveal`/`Stagger` defaults are in `src/components/ui/reveal.tsx`; the hero shader `speed` and the marquee `duration` are props on those components.
- **Form:** `cta-contact.tsx` validates client-side and shows a success state; wire `onSubmit` to your CRM or a route handler.
