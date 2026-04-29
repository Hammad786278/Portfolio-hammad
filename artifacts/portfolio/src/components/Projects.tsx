import { useRef, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import projectVision from "@/assets/project-vision.png";
import projectSaas from "@/assets/project-saas.png";
import projectN8n from "@/assets/project-n8n.png";
import projectMl from "@/assets/project-ml.png";

const projects = [
  {
    id: "01",
    title: "OmniSight.ai",
    description: "Real-time edge-device computer vision system for industrial defect detection.",
    stack: ["PyTorch", "YOLOv8", "TensorRT", "React", "FastAPI"],
    image: projectVision,
  },
  {
    id: "02",
    title: "NeuroFlow Orchestrator",
    description: "Enterprise-grade n8n workflow engine connecting 40+ microservices autonomously.",
    stack: ["n8n", "Node.js", "Docker", "PostgreSQL", "Redis"],
    image: projectN8n,
  },
  {
    id: "03",
    title: "Cognitive SaaS",
    description: "AI-powered document intelligence platform serving enterprise clients.",
    stack: ["Next.js", "LangChain", "OpenAI API", "Tailwind", "Prisma"],
    image: projectSaas,
  },
  {
    id: "04",
    title: "Synapse Pipeline",
    description: "Distributed machine learning training pipeline with automated hyperparameter tuning.",
    stack: ["Kubernetes", "Apache Airflow", "TensorFlow", "Python"],
    image: projectMl,
  }
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Glow effect following mouse
    const glow = cardRef.current.querySelector('.glow-effect') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(var(--primary) / 0.15) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const glow = cardRef.current.querySelector('.glow-effect') as HTMLElement;
    if (glow) {
      glow.style.background = 'transparent';
    }
  };

  return (
    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -10 : 10 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-3/5 perspective-1000"
      >
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative border border-border/30 bg-card overflow-hidden shadow-2xl transition-transform duration-300 ease-out will-change-transform transform-style-3d"
        >
          <div className="glow-effect absolute inset-0 pointer-events-none z-20 transition-background duration-200" />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto aspect-video object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-widest bg-background/80 backdrop-blur-md px-3 py-1.5 border border-primary/20 text-primary uppercase">
            STATUS: ONLINE
          </div>
          
          {/* Glowing edge on hover */}
          <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors duration-500 z-30 pointer-events-none" />
        </div>
      </motion.div>

      {/* Content side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-2/5 flex flex-col justify-center"
      >
        <div className="font-mono text-primary text-sm font-bold mb-4 tracking-[0.2em]">
          {project.id}_
        </div>
        <h3 className="text-4xl lg:text-5xl font-serif text-foreground mb-6 group-hover:text-primary transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-light">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-3 mb-10">
          {project.stack.map((tech: string) => (
            <span key={tech} className="px-4 py-2 bg-background border border-border/50 text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:border-primary/30 transition-colors duration-500">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-6">
          <a href="#" className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-mono text-xs uppercase tracking-widest hover:scale-[1.02]">
            Live Demo <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 bg-transparent text-foreground border border-border hover:border-primary/50 transition-all font-mono text-xs uppercase tracking-widest">
            Source <Github className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-40 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="font-mono text-secondary mb-6 text-xs tracking-[0.2em] uppercase">
              ~/workspace/deployments $ ls -la
            </div>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-foreground">
              Featured <span className="text-muted-foreground italic">Deployments</span>
            </h2>
          </div>
          <a href="#" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors pb-2 border-b border-transparent hover:border-primary/50">
            View full repository <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
