import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative w-full py-10 bg-background overflow-hidden border-y border-border/20 flex items-center">
      <div className="absolute inset-0 z-0 bg-primary/5"></div>
      
      <div className="relative z-10 flex w-full overflow-hidden" ref={containerRef}>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap items-center font-serif italic text-4xl md:text-6xl text-primary"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="px-4">AI ENGINEERING</span>
              <span className="font-mono text-sm text-muted-foreground not-italic px-4">//</span>
              <span className="px-4">FULL-STACK</span>
              <span className="font-mono text-sm text-muted-foreground not-italic px-4">//</span>
              <span className="px-4">COMPUTER VISION</span>
              <span className="font-mono text-sm text-muted-foreground not-italic px-4">//</span>
              <span className="px-4">N8N AUTOMATION</span>
              <span className="font-mono text-sm text-muted-foreground not-italic px-4">//</span>
              <span className="px-4">MACHINE LEARNING</span>
              <span className="font-mono text-sm text-muted-foreground not-italic px-4">//</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
