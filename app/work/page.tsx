"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, Flip } from "@/lib/gsap";
import { projects } from "@/lib/data/projects";
import SplitText from "@/components/ui/SplitText";

const categories = ["All", "Web Development", "Product Design", "Frontend"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);
    
  const gridRef = useRef<HTMLDivElement>(null);

  const handleFilter = (category: string) => {
    if (category === activeFilter) return;
    
    // GSAP Flip animation
    const state = Flip.getState(".project-card");
    setActiveFilter(category);
    
    // Animate using timeout trick for React state changes
    setTimeout(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.05,
        onEnter: elements => gsap.fromTo(elements, 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.4 }
        ),
        onLeave: elements => gsap.to(elements, 
          { opacity: 0, scale: 0.9, duration: 0.4 }
        )
      });
    }, 0);
  };

  return (
    <div className="pt-32 pb-24 page-padding min-h-screen">
      <div className="mb-16">
        <h1 className="text-[clamp(40px,8vw,100px)] leading-none font-display font-medium mb-4">
          <SplitText text="Selected Work" delay={0.1} />
        </h1>
        <p className="text-text-muted text-h3 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-accent inline-block" />
          Showing {filteredProjects.length} projects
        </p>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-8 mb-16">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`text-h3 transition-colors relative pb-1 ${
              activeFilter === category ? "text-text-primary" : "text-text-muted hover:text-text-primary"
            }`}
          >
            {category}
            {activeFilter === category && (
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
        {filteredProjects.map((project, index) => (
          <Link 
            key={project.slug}
            href={`/work/${project.slug}`}
            className={`project-card group block w-full relative ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            data-flip-id={project.slug}
          >
            <div className={`relative w-full overflow-hidden bg-surface ${index % 3 === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
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
            <div className="mt-6">
              <h3 className="text-h2 font-display group-hover:text-accent transition-colors">{project.title}</h3>
              <div className="flex justify-between items-center mt-2 text-caption text-text-muted">
                <span className="uppercase tracking-widest">{project.category}</span>
                <span>{project.year}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
