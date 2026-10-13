"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Global inertial scrolling. Lenis drives the real window scroll, so motion's useScroll keeps working. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, autoRaf: true, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
