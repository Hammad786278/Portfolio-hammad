import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "AI Product Engineering",
    description: "End-to-end integration of LLMs, RAG architectures, and agentic systems into high-performance web applications."
  },
  {
    id: "02",
    title: "Full-Stack Web Apps",
    description: "Scalable, resilient architectures from database to UI. React, Node.js, Next.js, and modern cloud infrastructure."
  },
  {
    id: "03",
    title: "Computer Vision Pipelines",
    description: "Custom object detection, image segmentation, and real-time edge-device vision systems using PyTorch and OpenCV."
  },
  {
    id: "04",
    title: "ML Model Training",
    description: "Predictive modeling, data pipelines, model optimization, and scalable deployment architectures."
  },
  {
    id: "05",
    title: "n8n Automation",
    description: "Complex workflow orchestration, custom nodes, and robust ETL pipelines to automate business operations."
  }
];

export default function Services() {
  return (
    <section id="services" className="relative w-full py-40 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
          <div className="font-mono text-xs text-primary mb-6 md:mb-0 tracking-[0.2em] uppercase">
            / 03 — SERVICES
          </div>
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-serif leading-none tracking-tight text-foreground text-balance md:text-right">
            What I <span className="text-muted-foreground italic">Deliver</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-border/30">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col md:flex-row md:items-center py-10 md:py-16 border-b border-border/30 hover:border-primary/50 transition-colors duration-500 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none" />
              
              <div className="font-mono text-xl text-primary md:w-1/6 mb-4 md:mb-0">
                {service.id}
              </div>
              
              <div className="md:w-2/6 pr-8">
                <h3 className="text-3xl md:text-5xl font-serif text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
              
              <div className="md:w-2/6 mt-4 md:mt-0">
                <p className="text-muted-foreground font-light text-lg">
                  {service.description}
                </p>
              </div>

              <div className="md:w-1/6 flex justify-end mt-6 md:mt-0 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <ArrowUpRight className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
