"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;

      gsap.to(button, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
      gsap.to(textRef.current, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      gsap.to(textRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full ${className}`}
      onClick={onClick}
    >
      <span ref={textRef} className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </button>
  );
}
