"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = text.split(" ");
    if (words.length === 0) return;

    containerRef.current.innerHTML = "";
    const chars: HTMLElement[] = [];

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.style.display = "inline-block";
        charSpan.style.transformOrigin = "top left";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });

      containerRef.current!.appendChild(wordSpan);

      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.style.display = "inline-block";
        spaceSpan.innerHTML = "&nbsp;";
        containerRef.current!.appendChild(spaceSpan);
      }
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(chars, 
        { y: 80, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay]);

  return (
    <div ref={containerRef} className={`${className}`} style={{ perspective: "1000px" }}>
      {text}
    </div>
  );
}
