import { clients } from "@/content/site";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";

// Copy not present in site.ts; derived locally per DESIGN.md.
const LABEL = ["Trusted by 400+", "growing businesses"];

const monogram = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[a-z]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function ClientMarquee() {
  return (
    <section aria-label={LABEL.join(" ")} className="border-b border-line bg-white py-10 md:py-14">
      <div className="container-x grid items-center gap-8 md:grid-cols-12">
        <Reveal y={12} className="min-w-0 md:col-span-3">
          <p className="eyebrow leading-relaxed">
            {LABEL[0]}
            <br />
            {LABEL[1]}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="min-w-0 md:col-span-9">
          <Marquee duration={50} gap="4rem">
            {clients.map((name) => (
              <div key={name} className="group/logo flex items-center gap-3 whitespace-nowrap">
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-lg border border-line bg-ash text-xs font-extrabold text-ink-500"
                >
                  {monogram(name)}
                </span>
                <span className="text-lg font-bold tracking-tight text-ink-400 transition-colors duration-500 group-hover/logo:text-ink">
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}
