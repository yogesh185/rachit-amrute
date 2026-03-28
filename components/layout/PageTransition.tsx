"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname && children) {
      if (document.documentElement.classList.contains('is-first-load')) {
        document.documentElement.classList.remove('is-first-load');
        return;
      }
      
      const ctx = gsap.context(() => {
        // Slide down the overlay
        gsap.fromTo(overlayRef.current, { y: "-100%" }, {
          y: "0%",
          duration: 0.6,
          ease: "expo.inOut",
          onComplete: () => {
            setDisplayChildren(children);

            // Hide the overlay by sliding down continuing
            gsap.to(overlayRef.current, {
              y: "100%",
              duration: 0.6,
              ease: "expo.inOut",
              onComplete: () => {
                gsap.set(overlayRef.current, { y: "-100%" });
              }
            });
          }
        });
      });
      return () => ctx.revert();
    }
  }, [pathname, children]);

  useEffect(() => {
      document.documentElement.classList.add('is-first-load');
  }, []);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center transform -translate-y-full pointer-events-none"
      >
        <div className="text-white text-4xl font-display tracking-widest">
          RA
        </div>
      </div>
      {displayChildren}
    </>
  );
}
