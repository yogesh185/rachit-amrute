"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import SplitText from "@/components/ui/SplitText";

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image subtle scale in
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, { scale: 1.1 }, { scale: 1, duration: 2, ease: "power3.out" });
        
        // Parallax on scroll
        gsap.to(imageRef.current, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section relative w-full h-[100dvh] flex flex-col justify-between overflow-hidden bg-black">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Image 
          ref={imageRef}
          src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop" 
          alt="Hero Architecture Background" 
          fill
          className="object-cover"
          priority
        />
        {/* Dark gradient overlay at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Top Logo */}
      <div className="relative z-10 w-full pt-8 flex justify-center">
        <h1 className="text-white text-2xl md:text-3xl font-sans font-medium tracking-tight">Rachit Amrute</h1>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 w-full px-6 md:px-12 pb-32 md:pb-40 flex flex-col items-center text-center">
        <h2 className="text-white text-[clamp(40px,8vw,90px)] leading-[1.1] font-sans font-medium max-w-5xl tracking-tight mb-8">
          <SplitText text="Exceptional digital products for those who build with vision." delay={0.2} />
        </h2>
        
        <div className="flex items-center gap-4 text-white/70 uppercase tracking-widest text-xs font-medium">
          <span className="w-12 h-[1px] bg-white/30" />
          Scroll to explore
          <span className="w-12 h-[1px] bg-white/30" />
        </div>
      </div>
    </section>
  );
}
