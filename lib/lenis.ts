import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

export const initLenis = () => {
  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};
