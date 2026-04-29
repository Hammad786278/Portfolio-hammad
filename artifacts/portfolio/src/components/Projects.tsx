import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import projectVision from "@/assets/project-vision.png";
import projectSaas from "@/assets/project-saas.png";
import projectN8n from "@/assets/project-n8n.png";
import projectMl from "@/assets/project-ml.png";

const projects = [
  {
    id: "01",
    title: "OmniSight.ai",
    role: "Lead CV Engineer",
    year: "2024",
    status: "PRODUCTION",
    description: "Real-time edge-device computer vision system for industrial defect detection.",
    stack: ["PyTorch", "YOLOv8", "TensorRT", "React", "FastAPI"],
    image: projectVision,
  },
  {
    id: "02",
    title: "NeuroFlow",
    role: "Automation Architect",
    year: "2023",
    status: "LIVE",
    description: "Enterprise-grade n8n workflow engine connecting 40+ microservices autonomously.",
    stack: ["n8n", "Node.js", "Docker", "PostgreSQL", "Redis"],
    image: projectN8n,
  },
  {
    id: "03",
    title: "Cognitive SaaS",
    role: "Full-Stack Dev",
    year: "2023",
    status: "ACQUIRED",
    description: "AI-powered document intelligence platform serving enterprise clients.",
    stack: ["Next.js", "LangChain", "OpenAI API", "Tailwind", "Prisma"],
    image: projectSaas,
  },
  {
    id: "04",
    title: "Synapse",
    role: "ML Engineer",
    year: "2022",
    status: "INTERNAL",
    description: "Distributed machine learning training pipeline with automated hyperparameter tuning.",
    stack: ["Kubernetes", "Apache Airflow", "TensorFlow", "Python"],
    image: projectMl,
  },
  {
    id: "05",
    title: "Operator",
    role: "AI Agent Dev",
    year: "2024",
    status: "BETA",
    description: "Autonomous LLM agent capable of navigating web interfaces and executing complex multi-step workflows.",
    stack: ["Anthropic Claude", "Puppeteer", "TypeScript", "Vite"],
    image: null,
    bgClass: "bg-primary/10",
    code: "PRJ_05 // OPERATOR"
  }
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
    
    const rotateX = ((y - centerY) / centerY) * -2;
    const rotateY = ((x - centerX) / centerX) * 2;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
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
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
          <div className="bg-primary text-primary-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest flex items-center gap-2 rounded-full">
            View Case <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
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
