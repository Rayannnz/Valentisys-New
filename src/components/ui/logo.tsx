import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Black wordmark + violet mark, for white surfaces. */
  light: { src: "/logo-light.png", width: 940, height: 248 },
  /** White wordmark + violet mark, for dark surfaces. */
  dark: { src: "/logo-dark.png", width: 940, height: 248 },
  /** The V mark only. */
  mark: { src: "/logo-mark.png", width: 361, height: 242 },
} as const;

type LogoProps = {
  variant?: keyof typeof VARIANTS;
  /** Size with an h-* class; width follows the aspect ratio. */
  className?: string;
  /** Pass "" when the logo is decorative (e.g. on cover art). */
  alt?: string;
  priority?: boolean;
};

export function Logo({ variant = "light", className, alt = site.name, priority }: LogoProps) {
  const v = VARIANTS[variant];
  return (
    <Image
      src={v.src}
      alt={alt}
      width={v.width}
      height={v.height}
      priority={priority}
      sizes="240px"
      className={cn("h-8 w-auto select-none", className)}
      draggable={false}
    />
  );
}
