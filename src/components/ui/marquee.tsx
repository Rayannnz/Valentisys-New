import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
};

/** CSS-only infinite marquee. Children are duplicated; edges are masked. */
export function Marquee({ children, duration = 40, reverse, pauseOnHover = true, className, gap = "3rem" }: MarqueeProps) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden mask-fade-x", className)}
      style={{ "--marquee-duration": `${duration}s`, "--gap": gap } as React.CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center animate-marquee [gap:var(--gap)] pr-[var(--gap)]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
