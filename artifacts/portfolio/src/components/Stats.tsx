import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ end, suffix = "", label }: { end: number, suffix?: string, label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / end));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col border-l border-border/30 pl-8">
      <div className="text-[clamp(4rem,10vw,8rem)] font-serif text-primary leading-none mb-4">
        {count}{suffix}
      </div>
      <div className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative w-full py-40 bg-background border-t border-border/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="font-mono text-xs text-primary mb-24 tracking-[0.2em] uppercase">
          / 07 — IMPACT
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <Counter end={5} suffix="+" label="Years Shipping" />
          <Counter end={40} suffix="+" label="Projects Delivered" />
          <Counter end={12} label="Models in Production" />
          <Counter end={60} suffix="+" label="Automations Live" />
        </div>
      </div>
    </section>
  );
}
