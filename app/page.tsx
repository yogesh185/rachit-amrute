import Hero from "@/components/sections/Hero";
import IntroStatement from "@/components/sections/IntroStatement";
import SelectedWork from "@/components/sections/SelectedWork";
import AboutTeaser from "@/components/sections/AboutTeaser";
import SkillsMarquee from "@/components/sections/SkillsMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <SelectedWork />
      <AboutTeaser />
      <SkillsMarquee />
      {/* Testimonials could go here later if needed */}
    </>
  );
}
