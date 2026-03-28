"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { projects } from "@/lib/data/projects";
import MagneticButton from "@/components/ui/MagneticButton";

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-padding page-padding pt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-t border-border pt-12">
        <h2 className="text-display leading-tight">Selected Work <span className="text-text-muted text-h2 font-sans align-top relative top-4 ml-4">/ [03]</span></h2>
        <MagneticButton>
          <Link href="/work" className="text-button text-accent border-b border-accent pb-1 mt-8 md:mt-0 transition-opacity hover:opacity-70 uppercase tracking-widest text-sm">
            View all work →
          </Link>
        </MagneticButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        {projects.slice(0, 3).map((project, index) => (
          <Link 
            key={project.slug}
            href={`/work/${project.slug}`}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className={`group block w-full relative ${index === 1 ? 'md:mt-32' : ''}`}
          >
            <div className={`relative w-full overflow-hidden bg-surface ${index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
              <Image 
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center mix-blend-multiply">
                <span className="text-bg text-h2 font-display translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 delay-100">
                  {project.title}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-baseline">
              <h3 className="text-h2 font-display group-hover:text-accent transition-colors">{project.title}</h3>
              <span className="text-caption text-text-muted">{project.category} · {project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
