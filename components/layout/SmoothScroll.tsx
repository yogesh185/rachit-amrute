"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
       return;
    }
    const lenis = initLenis();
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
