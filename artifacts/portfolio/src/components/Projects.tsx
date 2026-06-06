import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";

import projectVision from "@/assets/project-vision.png";
import projectSaas from "@/assets/project-saas.png";
import projectN8n from "@/assets/project-n8n.png";
import projectMl from "@/assets/project-ml.png";

const projects = [
  {
    id: "01",
    title: "Human Edge Detection",
    role: "CV Engineer",
    year: "2024",
    status: "LIVE",
    description: "Real-time human pose and edge detection system using deep learning — identifies body contours, joint positions, and motion vectors from live video streams.",
    stack: ["OpenCV", "MediaPipe", "PyTorch", "CUDA", "FastAPI", "React"],
    image: projectVision,
  },
  {
    id: "02",
    title: "Printoj",
    role: "Full-Stack Dev",
    year: "2025",
    status: "LIVE",
    description: "End-to-end print-on-demand platform for custom shirts and business cards — design editor, product configurator, order management, and fulfilment pipeline.",
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Tailwind"],
    image: projectSaas,
  },
  {
    id: "03",
    title: "Fake News Detector",
    role: "ML Engineer",
    year: "2024",
    status: "PRODUCTION",
    description: "NLP-powered misinformation detection pipeline that classifies news articles in real time using fine-tuned transformer models and cross-source fact verification.",
    stack: ["Python", "HuggingFace", "BERT", "FastAPI", "React", "PostgreSQL"],
    image: projectMl,
  },
  {
    id: "04",
    title: "Full-Stack Web Suite",
    role: "Full-Stack Dev",
    year: "2023",
    status: "DELIVERED",
    description: "Collection of bespoke client websites with custom frontends and REST/GraphQL backends — covering landing pages, dashboards, and e-commerce storefronts.",
    stack: ["Next.js", "Express", "GraphQL", "Tailwind", "Prisma", "Vercel"],
    image: projectN8n,
  },
];

function ProjectCard({ project }: { project: any }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -1.5;
    const rotateY = ((x - centerX) / centerX) * 1.5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-8 mb-40 last:mb-0 group"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-[21/9] md:aspect-[21/9] bg-card border border-border/30 overflow-hidden relative cursor-pointer transition-transform duration-300 ease-out will-change-transform"
      >
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className={`w-full h-full ${project.bgClass} flex items-center justify-center`}>
            <div className="font-mono text-2xl md:text-4xl text-primary/50 tracking-[0.3em] font-bold">
              {project.code}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        
        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
          <div className="bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest flex items-center gap-2 rounded-full">
            View Case <ArrowUpRight className="w-4 h-4" />
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-3 flex flex-col gap-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <div className="flex justify-between border-b border-border/30 pb-2">
            <span>Year</span> <span className="text-foreground">{project.year}</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-2">
            <span>Role</span> <span className="text-foreground">{project.role}</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-2">
            <span>Status</span> <span className="text-primary">{project.status}</span>
          </div>
        </div>
        
        <div className="md:col-span-5">
          <h3 className="text-4xl md:text-6xl font-serif text-foreground mb-6 leading-none">
            {project.title}
          </h3>
          <p className="text-lg text-muted-foreground font-light text-balance">
            {project.description}
          </p>
        </div>

        <div className="md:col-span-4 flex flex-wrap gap-2 content-start">
          {project.stack.map((tech: string) => (
            <span key={tech} className="px-3 py-1.5 border border-border/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-40 bg-background border-t border-border/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="font-mono text-xs text-primary mb-12 tracking-[0.2em] uppercase">
          / 05 — SELECTED WORK
        </div>
        
        <h2 className="text-[clamp(3rem,8vw,8rem)] font-serif leading-none tracking-tight text-foreground mb-32">
          Featured <span className="text-muted-foreground italic">Case Studies</span>
        </h2>

        <div className="flex flex-col">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
