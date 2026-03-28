"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Draw checkmark animation
    setTimeout(() => {
      if (pathRef.current) {
        gsap.fromTo(pathRef.current, 
          { strokeDasharray: 100, strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 1, ease: "power2.out" }
        );
      }
    }, 100);
  };

  return (
    <div className="pt-32 pb-24 page-padding min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-display font-medium leading-[0.9] mb-8">
            <SplitText text="Let&apos;s start a project." delay={0.2} />
          </h1>
          <p className="text-text-muted mb-12 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            Currently available for freelance — Q1 2025
          </p>
          
          <div className="flex flex-col gap-4 text-h3 font-light text-text-muted">
            <a href="mailto:hello@rachitamrute.com" className="hover:text-accent transition-colors">hello@rachitamrute.com</a>
            <p>Pune, India (IST — UTC+5:30)</p>
          </div>
        </div>

        <div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 mt-8 md:mt-0">
              <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-border py-4 text-h3 focus:outline-none focus:border-accent peer placeholder-transparent"
                  placeholder="Name"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-text-muted transition-all duration-300 peer-focus:-top-6 peer-focus:text-caption peer-focus:text-accent peer-valid:-top-6 peer-valid:text-caption peer-valid:text-text-muted cursor-text"
                >
                  What&apos;s your name?
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-border py-4 text-h3 focus:outline-none focus:border-accent peer placeholder-transparent"
                  placeholder="Email"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-text-muted transition-all duration-300 peer-focus:-top-6 peer-focus:text-caption peer-focus:text-accent peer-valid:-top-6 peer-valid:text-caption peer-valid:text-text-muted cursor-text"
                >
                  What&apos;s your email?
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-4 text-h3 focus:outline-none focus:border-accent peer placeholder-transparent resize-none"
                  placeholder="Message"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-text-muted transition-all duration-300 peer-focus:-top-6 peer-focus:text-caption peer-focus:text-accent peer-valid:-top-6 peer-valid:text-caption peer-valid:text-text-muted cursor-text"
                >
                  Tell me about your project
                </label>
              </div>

              <MagneticButton className="self-start">
                <button type="submit" className="px-8 py-4 bg-accent text-bg rounded-full text-sm uppercase tracking-widest font-medium hover:bg-text-primary transition-colors">
                  Send Message
                </button>
              </MagneticButton>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <svg className="w-24 h-24 text-accent" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="23" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-20" />
                <path 
                  ref={pathRef}
                  d="M14 26 L22 34 L38 16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeDasharray="100"
                  strokeDashoffset="100"
                />
              </svg>
              <h2 className="text-display text-accent">Sent!</h2>
              <p className="text-h3 text-text-muted">I&apos;ll get back to you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
