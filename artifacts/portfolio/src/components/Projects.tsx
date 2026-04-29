import { useRef } from "react";
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
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "02",
    title: "NeuroFlow Orchestrator",
    description: "Enterprise-grade n8n workflow engine connecting 40+ microservices autonomously.",
    stack: ["n8n", "Node.js", "Docker", "PostgreSQL", "Redis"],
    image: projectN8n,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "03",
    title: "Cognitive SaaS",
    description: "AI-powered document intelligence platform serving enterprise clients.",
    stack: ["Next.js", "LangChain", "OpenAI API", "Tailwind", "Prisma"],
    image: projectSaas,
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "04",
    title: "Synapse Pipeline",
    description: "Distributed machine learning training pipeline with automated hyperparameter tuning.",
    stack: ["Kubernetes", "Apache Airflow", "TensorFlow", "Python"],
    image: projectMl,
    color: "from-orange-500 to-red-600",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">
              ~/workspace/deployments $ ls -la
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Featured <span className="text-muted-foreground italic">Deployments</span>
            </h2>
          </div>
          <a href="#" className="font-mono text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
            View full repository <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={project.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center group`}>
                
                {/* Image side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-3/5 perspective-1000"
                >
                  <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-10`} />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-auto aspect-video object-cover"
                    />
                    <div className="absolute top-4 right-4 z-20 font-mono text-xs bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white/80 border border-white/10">
                      STATUS: ONLINE
                    </div>
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
                  <div className="font-mono text-primary text-xl font-bold mb-2">
                    {project.id}_
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-muted text-xs font-mono text-foreground border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 rounded-md transition-all font-mono text-sm">
                      <ArrowUpRight className="w-4 h-4" /> Live Demo
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-transparent text-foreground hover:bg-muted border border-border rounded-md transition-all font-mono text-sm">
                      <Github className="w-4 h-4" /> Source
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
