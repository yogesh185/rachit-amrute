"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: 1 | -1;
  className?: string;
}

export default function Marquee({ items, speed = 20, direction = -1, className = "" }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // We render items array 4 times to ensure seamless scrolling
    // so track width is enough. We'll animate halfway.
    const containerWidth = track.scrollWidth;

    const tween = gsap.to(track, {
      x: direction === -1 ? `-${containerWidth / 2}px` : `${containerWidth / 2}px`,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    const onEnter = () => tween.pause();
    const onLeave = () => tween.play();

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div 
      ref={marqueeRef} 
      className={`overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div 
        ref={trackRef} 
        className="inline-flex w-max"
        style={{ transform: direction === 1 ? 'translateX(-50%)' : 'translateX(0)' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="inline-block">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
