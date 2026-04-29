import { useRef } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Hammad didn't just build the feature; he architected a system that completely transformed our data pipeline. Rare combination of ML intuition and full-stack execution.",
    author: "Sarah J.",
    role: "CTO, DataSphere",
  },
  {
    quote: "The computer vision model he deployed increased our detection accuracy by 40% while cutting latency in half. A true professional.",
    author: "Marcus T.",
    role: "VP Engineering, VisionaryTech",
  }
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="font-mono text-xs text-primary mb-24 tracking-[0.2em] uppercase text-center">
          / 08 — ENDORSEMENTS
        </div>

        <div className="flex flex-col gap-32 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end text-right'}`}
            >
              <h4 className="text-3xl md:text-5xl font-serif italic text-foreground mb-8 leading-snug">
                "{t.quote}"
              </h4>
              <div className="font-mono text-sm tracking-widest text-primary uppercase">
                {t.author} <span className="text-muted-foreground">// {t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
