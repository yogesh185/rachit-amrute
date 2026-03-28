"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function AboutTeaser() {
  const containerRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(numberRef.current,
        { innerHTML: 0 },
        {
          innerHTML: 7,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(lineRef.current,
        { width: 0 },
        { 
          width: "100%", 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding page-padding pt-0">
      <div ref={lineRef} className="h-[1px] bg-border mb-16 w-full" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-3">
          <h2 className="text-display leading-none text-accent relative">
            <span ref={numberRef}>0</span>+
          </h2>
          <p className="text-caption text-text-muted mt-4">Years of experience</p>
        </div>
        
        <div className="lg:col-span-6">
          <p className="text-[28px] md:text-h2 text-text-primary leading-[1.3] font-light mb-12">
            I am a multidisciplinary developer and designer based in Pune. I partner with ambitious brands and founders to create digital experiences that function flawlessly and look stunning. My approach bridges the gap between technical complexity and intuitive design.
          </p>
          <MagneticButton>
            <Link href="/about" className="group flex items-center gap-4 text-h3 font-display hover:text-accent transition-colors">
              More about me 
              <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
            </Link>
          </MagneticButton>
        </div>

        <div className="lg:col-span-3 flex text-text-muted flex-row lg:flex-col gap-8 justify-between lg:text-right overflow-hidden flex-wrap">
          <div>
            <span className="text-h2 block text-text-primary">42</span>
            <span className="text-caption">Projects Delivered</span>
          </div>
          <div>
            <span className="text-h2 block text-text-primary">12</span>
            <span className="text-caption">Global Clients</span>
          </div>
          <div>
            <span className="text-h2 block text-text-primary">3</span>
            <span className="text-caption">Continents</span>
          </div>
        </div>
      </div>
    </section>
  );
}
