"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SplitText from "@/components/ui/SplitText";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function AboutPage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="page-padding mb-16">
        <h1 className="text-display font-medium mb-8">
          <SplitText text="About Me." delay={0.2} />
        </h1>
        <div className="w-full h-[60vh] relative rounded-sm overflow-hidden mb-24">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"
            alt="Rachit Amrute coding"
            className="w-full h-full"
            priority
          />
        </div>
      </section>

      {/* Content 2-column */}
      <section className="page-padding section-padding grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-7 flex flex-col gap-6 text-xl md:text-h3 text-text-muted font-light leading-relaxed">
          <p className="text-text-primary font-normal">
            I am a software engineer and designer who believes in the power of well-crafted digital experiences. With a background in both technical development and visual design, I bring a unique perspective to every project I touch.
          </p>
          <p>
            My journey started when I built my first website at 14. Since then, I've worked with startups, agencies, and enterprise clients to build scalable applications that don't just work—they feel magical to use.
          </p>
          <p>
            I specialize in the React ecosystem, specifically Next.js, and focus heavily on animation and interaction design using GSAP and WebGL. When I'm not coding, you can find me taking photographs or learning about architecture.
          </p>
        </div>
        <div className="md:col-span-5 relative h-[600px] hidden md:block">
          <div className="sticky top-32 w-full h-[400px] overflow-hidden">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
              alt="Workspace"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="page-padding section-padding bg-surface content-visibility-auto">
        <h2 className="text-h1 mb-16"><SplitText text="Experience" /></h2>
        
        <div ref={timelineRef} className="relative pl-8 md:pl-0 max-w-4xl mx-auto">
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-[1px] bg-border hidden md:block" />
          <div ref={lineRef} className="absolute left-[7px] md:left-1/2 top-0 w-[2px] bg-accent h-0 hidden md:block origin-top" />

          {/* Timeline Item 1 */}
          <div className="relative flex flex-col md:flex-row justify-between mb-24 md:even:flex-row-reverse group">
            <div className="absolute left-[-33px] md:left-[50%] md:ml-[-6px] top-2 w-3 h-3 rounded-full border-2 border-accent bg-bg z-10 hidden md:block" />
            <div className="md:w-[45%]">
              <span className="text-accent text-caption mb-2 block">2022 — Present</span>
              <h3 className="text-h2 font-display mb-1">Senior Frontend Engineer</h3>
              <p className="text-text-muted">TechNova Solutions</p>
            </div>
            <div className="md:w-[45%] mt-4 md:mt-0 text-text-muted">
              Led the frontend architecture for the core product. Implemented a custom design system, integrated GSAP for micro-interactions, and mentored junior developers.
            </div>
          </div>

          {/* Timeline Item 2 */}
          <div className="relative flex flex-col md:flex-row justify-between mb-24 lg:flex-row-reverse group">
            <div className="absolute left-[-33px] md:left-[50%] md:ml-[-6px] top-2 w-3 h-3 rounded-full border-2 border-accent bg-bg z-10 hidden md:block" />
            <div className="md:w-[45%] text-left md:text-right">
              <span className="text-accent text-caption mb-2 block">2019 — 2022</span>
              <h3 className="text-h2 font-display mb-1">Full-Stack Developer</h3>
              <p className="text-text-muted">Creative Agency X</p>
            </div>
            <div className="md:w-[45%] mt-4 md:mt-0 text-text-muted text-left">
              Developed award-winning marketing websites and e-commerce platforms using Next.js and Shopify.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
