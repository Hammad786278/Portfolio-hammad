import { useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "DISCOVERY",
    desc: "Understanding the domain, constraints, and objectives. Mapping the data."
  },
  {
    id: "02",
    title: "ARCHITECTURE",
    desc: "Designing the system topology. Selecting models, frameworks, and infrastructure."
  },
  {
    id: "03",
    title: "BUILD",
    desc: "Iterative development. Training models, writing core logic, building the UI."
  },
  {
    id: "04",
    title: "SHIP",
    desc: "Deployment, monitoring, and handoff. Ensuring 100% uptime in production."
  }
];

export default function Process() {
  return (
    <section id="process" className="relative w-full py-40 bg-background overflow-hidden border-t border-border/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="font-mono text-xs text-primary mb-12 tracking-[0.2em] uppercase">
          / 06 — PROCESS
        </div>
        
        <h2 className="text-[clamp(3rem,8vw,8rem)] font-serif leading-none tracking-tight text-foreground mb-32">
          Methodology <span className="text-muted-foreground italic">&</span> Execution
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
          <div className="absolute top-8 left-0 right-0 h-px bg-border/40 hidden md:block"></div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-full bg-background border border-primary/40 flex items-center justify-center font-mono text-primary text-xl mb-8 relative z-10 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                {step.id}
              </div>
              <h3 className="text-2xl font-mono tracking-tighter text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground font-light text-lg">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
