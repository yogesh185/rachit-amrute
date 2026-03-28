export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  images: string[];
}

export const projects: ProjectItem[] = [
  {
    slug: "fluid-ecommerce",
    title: "Fluid E-Commerce",
    category: "Web Development",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=2070&auto=format&fit=crop",
    description: "A high-performance headless e-commerce experience showcasing the future of digital retail.",
    stack: ["Next.js", "Shopify", "Tailwind", "GSAP"],
    images: []
  },
  {
    slug: "fintech-dashboard",
    title: "FinTech Dashboard",
    category: "Product Design",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    description: "Financial dashboard with real-time data visualization and complex state management.",
    stack: ["React", "D3.js", "Figma", "Node.js"],
    images: []
  },
  {
    slug: "creative-agency",
    title: "Creative Agency",
    category: "Frontend",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    description: "An awe-inspiring animated portfolio developed for an elite creative agency.",
    stack: ["Three.js", "React", "GSAP", "Contentful"],
    images: []
  }
];
