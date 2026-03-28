"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function IntroStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = "I build digital products that marry engineering precision with thoughtful design — shipped with care.";
    const words = text.split(" ");
    
    textRef.current.innerHTML = "";
    const spans: HTMLSpanElement[] = [];

    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.className = "text-text-muted transition-colors duration-300";
      textRef.current!.appendChild(span);
      spans.push(span);
    });

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        color: "var(--color-text-primary)",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding page-padding min-h-[60vh] flex items-center justify-center">
      <h2 
        ref={textRef} 
        className="text-[clamp(32px,5vw,64px)] leading-[1.2] font-display max-w-5xl text-center"
      >
        {/* Populated by GSAP */}
      </h2>
    </section>
  );
}
