"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const cursorText = useRef<HTMLSpanElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop without reduced motion and strictly relying on mouse events, not touch
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || 
        window.innerWidth < 768 || ('ontouchstart' in window)) {
      return;
    }
    
    requestAnimationFrame(() => setIsDesktop(true));
    
    const ctx = gsap.context(() => {
      // Setup quick setters for performance
      const xDot = gsap.quickSetter(cursorDot.current, "x", "px");
      const yDot = gsap.quickSetter(cursorDot.current, "y", "px");
      
      const onMouseMove = (e: MouseEvent) => {
        xDot(e.clientX);
        yDot(e.clientY);
        
        // Ring follows with lag
        gsap.to(cursorRing.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", onMouseMove);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div 
        ref={cursorDot} 
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" 
      />
      <div 
        ref={cursorRing} 
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference hidden md:flex"
      >
        <span ref={cursorText} className="text-[10px] text-accent opacity-0 uppercase tracking-widest font-sans font-medium">
          View
        </span>
      </div>
    </>
  );
}
