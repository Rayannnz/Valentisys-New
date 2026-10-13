import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ArrowUpRight, Play, Quote } from "lucide-react";
import { insights, webinar, type Insight } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const DOC_LINES = ["w-full", "w-11/12", "w-4/5", "w-full", "w-3/5"];

/** Decorative, type-specific cover art. Pure CSS/SVG; hidden from assistive tech. */
function Cover({ type }: { type: Insight["type"] }) {
  if (type === "Webinar") {
    return (
      <div aria-hidden className="relative aspect-[16/10] overflow-hidden bg-brand-gradient">
        <div className="absolute -right-14 -top-20 size-56 rounded-full bg-sky/30 blur-3xl" />
        <Logo variant="dark" alt="" className="absolute left-5 top-4 h-5" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur transition-transform duration-500 ease-expo group-hover:scale-[1.04]">
            <Play className="ml-0.5 size-5 fill-white text-white" strokeWidth={1.5} />
          </span>
        </div>
        <div className="absolute bottom-4 left-5 flex -space-x-2">
          {webinar.speakers.map((s) => (
            <span
              key={s.initials}
              className="grid size-8 place-items-center rounded-full bg-linear-to-br from-white to-sky-light text-[10px] font-bold text-brand-700 ring-2 ring-brand-600"
            >
              {s.initials}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "White paper") {
    return (
      <div aria-hidden className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#f6f2ff,#ede4ff)]">
        <div className="absolute -bottom-12 -right-12 size-48 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="absolute left-1/2 top-[14%] aspect-[3/4] w-[52%] -translate-x-1/2 rotate-[-6deg] overflow-hidden rounded-xl border border-line bg-white shadow-card-hover transition duration-700 ease-expo group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
          <div className="bg-brand-gradient px-[9%] pb-[10%] pt-[9%]">
            <Logo variant="dark" alt="" className="h-2.5" />
            <span className="mt-[12%] block h-1.5 w-4/5 rounded-full bg-white/90" />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/60" />
          </div>
          <div className="space-y-2 px-[9%] pt-[10%]">
            {DOC_LINES.map((w, i) => (
              <span key={i} className={`block h-1 rounded-full bg-ink-300/70 ${w}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden className="relative aspect-[16/10] overflow-hidden bg-ink-gradient">
      <div className="absolute -right-8 -top-12 size-40 rounded-full border border-white/10" />
      <div className="absolute -right-24 -top-28 size-72 rounded-full border border-white/[0.06]" />
      <Quote
        className="absolute bottom-4 left-5 size-24 text-white/10 transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
        strokeWidth={1.25}
      />
    </div>
  );
}

export function Insights() {
  return (
    <section id="insights" className="section bg-ash">
      <div className="container-x">
        <SectionHeading eyebrow={insights.eyebrow} title={insights.title} action={insights.action} />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {insights.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              {/* `card` transitions `transform`, but Tailwind v4 lifts via `translate` — include it so the lift eases. */}
              <Link
                href="#"
                className="group card card-hover flex h-full flex-col overflow-hidden transition-[translate,box-shadow]!"
              >
                <Cover type={item.type} />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="pill">{item.type}</span>
                    <span className="text-xs text-ink-500">{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug text-ink transition-colors duration-500 ease-expo group-hover:text-brand-600">
                    {item.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-ink">
                    Read more
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-[3px] group-hover:translate-x-[3px]"
                      strokeWidth={2.25}
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
