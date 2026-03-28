import Marquee from "@/components/ui/Marquee";

const skillsTop = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Figma", "AWS", "Three.js", "GSAP"];
const skillsBottom = ["Tailwind CSS", "Docker", "GraphQL", "UX/UI Design", "Framer Motion", "MongoDB", "Redux", "WebGL"];

export default function SkillsMarquee() {
  return (
    <section className="py-24 overflow-hidden bg-bg">
      <Marquee 
        speed={40} 
        direction={-1} 
        items={skillsTop.map(skill => (
          <span key={skill} className="text-h1 font-display uppercase text-text-primary mr-12 opacity-80">{skill}</span>
        ))} 
      />
      <div className="h-4 md:h-8" />
      <Marquee 
        speed={35} 
        direction={1} 
        items={skillsBottom.map(skill => (
          <span key={skill} className="text-h1 font-display uppercase text-accent mr-12 opacity-80">{skill}</span>
        ))} 
      />
    </section>
  );
}
