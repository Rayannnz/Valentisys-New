import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "white" | "outline" | "outline-white" | "ghost" | "ghost-white";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-500 ease-expo focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-[0_12px_32px_-12px_rgba(90,48,217,0.6)]",
  white: "bg-white text-ink hover:bg-brand-50 hover:shadow-[0_12px_32px_-12px_rgba(255,255,255,0.5)]",
  outline: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-white": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
  ghost: "text-ink hover:text-brand-600 px-0!",
  "ghost-white": "text-white hover:text-sky-light px-0!",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

/** Pill button. Pass `href` for a link, otherwise renders a <button>. */
export function Button({ href, variant = "primary", size = "md", arrow = true, className, children, type = "button", onClick }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform duration-500 ease-expo group-hover/btn:translate-x-1"
          strokeWidth={2.25}
          aria-hidden
        />
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
