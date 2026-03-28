"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Hexagon } from "lucide-react";
import { gsap } from "@/lib/gsap";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !modalRef.current || !closeBtnRef.current) return;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      
      // Animate background overlay
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      
      // Animate modal card up
      gsap.fromTo(modalRef.current, 
        { y: 50, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
      );

      // Animate close button up
      gsap.fromTo(closeBtnRef.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", delay: 0.2 }
      );
      
    } else {
      document.body.style.overflow = "";
      
      gsap.to([modalRef.current, closeBtnRef.current], { 
        y: 20, 
        autoAlpha: 0, 
        duration: 0.3, 
        ease: "power2.in" 
      });
      gsap.to(overlayRef.current, { 
        autoAlpha: 0, 
        duration: 0.4, 
        ease: "power2.in", 
        delay: 0.1 
      });
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Bottom Floating Navbar */}
      <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[400px] z-40">
        <div className="bg-[#181818] border border-white/10 shadow-2xl flex items-center justify-between px-6 py-4 rounded-sm">
          <Link href="/" className="text-white hover:text-white/70 transition-colors">
            <Hexagon size={24} strokeWidth={1.5} />
          </Link>
          
          <span className="text-white text-xs font-sans font-semibold tracking-[0.2em] uppercase">
            {pathname === "/" ? "Home" : pathname.replace("/", "")}
          </span>
          
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white hover:text-white/70 transition-colors"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Menu Modal Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md invisible opacity-0 flex flex-col items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === overlayRef.current) setIsMenuOpen(false);
        }}
      >
        <div 
          ref={modalRef}
          className="bg-[#121212] w-full max-w-[400px] p-10 flex flex-col invisible opacity-0 shadow-2xl border border-white/5"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-8">Menu</span>
          
          <nav className="flex flex-col gap-3 mb-12">
            {["About", "Work", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`}
                className="text-white text-4xl tracking-tight font-sans hover:text-white/70 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex justify-between items-start text-sm text-white/60 mb-12">
            <div className="flex flex-col gap-2">
              <Link href="#" className="hover:text-white transition-colors">News</Link>
              <Link href="#" className="hover:text-white transition-colors">Showroom</Link>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <a href="tel:02081567290" className="hover:text-white transition-colors">020 8156 7290</a>
              <a href="mailto:sales@fluid.glass" className="hover:text-white transition-colors">sales@fluid.glass</a>
            </div>
          </div>

          <Link 
            href="/contact"
            className="w-full bg-[#1A1A1A] hover:bg-[#222] transition-colors text-white py-4 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Get a quote
          </Link>
        </div>

        <button 
          ref={closeBtnRef}
          onClick={() => setIsMenuOpen(false)}
          className="mt-6 bg-[#121212] border border-white/5 p-4 text-white hover:text-white/70 transition-colors invisible opacity-0 shadow-xl"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}
