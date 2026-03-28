import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import ParallaxImage from "@/components/ui/ParallaxImage";

// Generate static params
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudy(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projects.find(p => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = projects.findIndex(p => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pt-32 pb-0">
      <header className="page-padding mb-16">
        <h1 className="text-[clamp(40px,12vw,180px)] leading-[0.9] font-display font-medium tracking-tight mb-12">
          {project.title}
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border">
          <div>
            <h4 className="text-caption text-text-muted mb-2">Role</h4>
            <p className="text-body font-medium">{project.category}</p>
          </div>
          <div>
            <h4 className="text-caption text-text-muted mb-2">Year</h4>
            <p className="text-body font-medium">{project.year}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-caption text-text-muted mb-2">Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-surface rounded-full text-xs tracking-wider uppercase border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="w-full h-[70vh] relative overflow-hidden mb-24">
        <ParallaxImage 
          src={project.cover}
          alt={`${project.title} Hero`}
          className="w-full h-full"
          priority
        />
      </div>

      <div className="page-padding grid grid-cols-1 md:grid-cols-12 gap-16 mb-32 section-padding mx-auto max-w-7xl">
        <div className="md:col-span-4">
          <h2 className="text-h2 font-display text-accent sticky top-32">Overview</h2>
        </div>
        <div className="md:col-span-8 flex flex-col gap-8 text-xl text-text-muted font-light leading-relaxed">
          <p className="text-text-primary md:text-2xl">{project.description}</p>
          <p>This project pushed the boundaries of what is possible in modern frontend architectures. By decoupling the presentation layer from the backend logic, we were able to craft an experience that is both performant and visually striking.</p>
          <p>Every interaction was meticulously planned—from the initial page load sequence to the micro-animations scattered throughout the user journey.</p>
        </div>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="w-full space-y-32 mb-32">
          {project.images.map((img, i) => (
            <div key={i} className="page-padding w-full h-[80vh] relative overflow-hidden">
               <ParallaxImage 
                 src={img}
                 alt={`${project.title} Detail ${i + 1}`}
                 className="w-full h-full rounded-sm"
               />
            </div>
          ))}
        </div>
      )}

      {/* Next Project CTA */}
      <div className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-bg group border-t border-border">
        <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
          <ParallaxImage 
            src={nextProject.cover}
            alt={nextProject.title}
            className="w-full h-full"
          />
        </div>
        <Link href={`/work/${nextProject.slug}`} className="relative z-10 flex flex-col items-center justify-center p-12 text-center group">
          <p className="text-caption uppercase tracking-widest text-accent mb-6 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">Next Project</p>
          <h2 className="text-display transition-transform duration-700 ease-out group-hover:scale-110">
            {nextProject.title}
          </h2>
        </Link>
      </div>
    </article>
  );
}
