"use client";

import { awards, type Award } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const GRADIENT_ID = "valentisys-award-gradient";
const C = { x: 48, y: 46 };

const pt = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: +(C.x + r * Math.cos(rad)).toFixed(2), y: +(C.y + r * Math.sin(rad)).toFixed(2) };
};

// Left laurel branch: 7 leaves fanned from bottom (118°) to top (244°); the right branch mirrors it.
const LEAVES = Array.from({ length: 7 }, (_, i) => {
  const deg = 118 + i * 21;
  return { ...pt(deg, 34), rotate: deg - 22, ry: +(6.6 - i * 0.35).toFixed(2) };
});
const STEM_FROM = pt(112, 31);
const STEM_TO = pt(250, 31);
const STEM = `M${STEM_FROM.x} ${STEM_FROM.y} A31 31 0 0 1 ${STEM_TO.x} ${STEM_TO.y}`;
const STAR = Array.from({ length: 10 }, (_, k) => {
  const p = pt(-90 + k * 36, k % 2 ? 3.4 : 8);
  return `${p.x},${p.y}`;
}).join(" ");

const medallionClass =
  "size-20 shrink-0 text-ink-300 transition-colors duration-500 ease-expo group-hover:text-brand-600 sm:size-24";

function Branch() {
  return (
    <>
      <path d={STEM} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      {LEAVES.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="2.6"
          ry={l.ry}
          fill="currentColor"
          transform={`rotate(${l.rotate} ${l.x} ${l.y})`}
        />
      ))}
    </>
  );
}

function Laurel() {
  return (
    <svg aria-hidden viewBox="0 0 96 96" fill="none" className={medallionClass}>
      <Branch />
      <g transform="matrix(-1 0 0 1 96 0)">
        <Branch />
      </g>
      <circle cx={C.x} cy={C.y} r="20" fill={`url(#${GRADIENT_ID})`} />
      <circle cx={C.x} cy={C.y} r="16" stroke="white" strokeOpacity="0.35" />
      <polygon points={STAR} fill="white" />
    </svg>
  );
}

function CertShield({ name }: { name: string }) {
  const [first, ...rest] = name.split(" ");
  return (
    <svg aria-hidden viewBox="0 0 96 96" fill="none" className={medallionClass}>
      <path
        d="M48 10 78 21v24c0 20-13 34-30 42-17-8-30-22-30-42V21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="fill-white transition-colors duration-500 ease-expo group-hover:fill-brand-50"
      />
      <path
        d="M48 16 72 25v20c0 16-10 28-24 35-14-7-24-19-24-35V25Z"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeDasharray="2 3"
      />
      <g textAnchor="middle" className="fill-ink-600 transition-colors duration-500 ease-expo group-hover:fill-brand-600">
        <text x="48" y="44" fontSize="11" fontWeight="700" letterSpacing="1.2">
          {first}
        </text>
        <text x="48" y="59" fontSize="12" fontWeight="800">
          {rest.join(" ")}
        </text>
      </g>
    </svg>
  );
}

function AwardTile({ award }: { award: Award }) {
  return (
    <div className="group card card-hover flex aspect-[4/5] min-h-full flex-col items-center justify-center gap-4 p-4 text-center transition-[translate,box-shadow] sm:p-6">
      <p className="text-[10px] font-semibold tracking-[0.22em] text-ink-500 uppercase">{award.issuer}</p>
      {award.kind === "award" ? <Laurel /> : <CertShield name={award.name} />}
      <h3 className="text-sm leading-snug font-semibold text-ink">{award.name}</h3>
    </div>
  );
}

export function Awards() {
  const [head, emphasis] = awards.title.split(", ");
  return (
    <section className="section relative bg-white">
      {/* Shared gradient for every laurel medallion (one definition, no duplicate ids). */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a30d9" />
            <stop offset="1" stopColor="#bda2f6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-x">
        <SectionHeading
          align="center"
          title={
            <>
              {head}, <strong>{emphasis}</strong>
            </>
          }
        />
        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-20 lg:grid-cols-5">
          {awards.items.map((a) => (
            // 10 tiles: center the orphan on the 3-col layout, two clean rows on lg.
            <StaggerItem key={a.name} className="sm:last:col-start-2 lg:last:col-start-auto">
              <AwardTile award={a} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
