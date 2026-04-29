import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Code2, Network, Eye, Layers } from "lucide-react";

const skills = [
  {
    category: "Artificial Intelligence",
    icon: Brain,
    description: "LLMs, RAG architectures, prompt engineering, agentic systems.",
    tech: ["OpenAI", "LangChain", "Hugging Face", "PyTorch"],
    color: "from-primary to-blue-500"
  },
  {
    category: "Full-Stack Web",
    icon: Code2,
    description: "Scalable, high-performance web applications from database to UI.",
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    category: "Machine Learning",
    icon: Network,
    description: "Predictive modeling, data pipelines, model optimization & deployment.",
    tech: ["TensorFlow", "Scikit-Learn", "Pandas", "MLOps"],
    color: "from-indigo-500 to-secondary"
  },
  {
    category: "Computer Vision",
    icon: Eye,
    description: "Object detection, image segmentation, facial recognition systems.",
    tech: ["OpenCV", "YOLO", "ResNet", "CUDA"],
    color: "from-secondary to-purple-500"
  },
  {
    category: "Automation (n8n)",
    icon: Layers,
    description: "Complex workflow orchestration, API integrations, ETL pipelines.",
    tech: ["n8n", "Zapier", "Webhooks", "Custom Nodes"],
    color: "from-purple-500 to-pink-500"
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="skills" className="relative w-full py-32 bg-black/40 border-y border-border/50" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="font-mono text-secondary mb-4 text-sm tracking-widest uppercase">
            &gt; initializing modules...
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Technical <span className="text-primary">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="mb-4 p-3 inline-flex rounded-lg bg-background border border-border text-foreground group-hover:text-primary transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground">{skill.category}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {skill.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skill.tech.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs font-mono rounded bg-muted/50 border border-border text-muted-foreground group-hover:border-primary/20 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Decorative background elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 right-10 font-mono text-xs text-muted-foreground/20 pointer-events-none select-none hidden lg:block"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>{`01001000 01100001 01101101 ${i}`}</div>
        ))}
      </motion.div>
    </section>
  );
}
