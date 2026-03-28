import Link from "next/link";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function Footer() {
  return (
    <footer className="relative bg-surface mt-24 overflow-hidden">
      {/* Background Image Parallax */}
      <div className="absolute inset-0 opacity-20">
        <ParallaxImage 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract dark background"
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 page-padding section-padding flex flex-col items-center text-center">
        <h2 className="text-display mb-2">Let&apos;s build something</h2>
        <span className="text-display italic text-accent opacity-90 block mb-12">remarkable.</span>
        
        <Link 
          href="mailto:hello@rachitamrute.com" 
          className="text-h2 hover:text-accent transition-colors duration-300 mb-16 relative"
        >
          hello@rachitamrute.com
          <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-accent transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100" />
        </Link>
        
        <div className="flex gap-6 mb-24">
          <Link href="#" className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:border-accent hover:text-accent font-sans text-sm transition-colors">GH</Link>
          <Link href="#" className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:border-accent hover:text-accent font-sans text-sm transition-colors">IN</Link>
          <Link href="#" className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:border-accent hover:text-accent font-sans text-sm transition-colors">X</Link>
          <Link href="#" className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:border-accent hover:text-accent font-sans text-sm transition-colors">DR</Link>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-caption text-text-muted border-t border-border pt-8">
          <p>© {new Date().getFullYear()} Rachit Amrute</p>
          <p className="mt-4 md:mt-0">Designed & built by Rachit</p>
        </div>
      </div>
    </footer>
  );
}
