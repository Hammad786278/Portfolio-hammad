import { motion } from "framer-motion";
import { Terminal, Mail, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-32 bg-black/50 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 text-primary mb-6 ring-1 ring-primary/20">
            <Terminal className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Initiate Connection.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Currently open for new opportunities. Whether you have a question about machine learning, need a complex system built, or just want to say hi, my inbox is open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            
            <div className="font-mono text-sm text-muted-foreground mb-6 flex items-center justify-between border-b border-border/50 pb-4">
              <span>status: <span className="text-emerald-500">AVAILABLE</span></span>
              <span>latency: 12ms</span>
            </div>

            <div className="space-y-4 text-center">
              <p className="font-mono text-foreground mb-8">
                &gt; Ping hammad@example.dev...
              </p>
              <a
                href="mailto:hammad@example.dev"
                className="group relative inline-flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground font-mono font-bold rounded-md overflow-hidden transition-all hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10 uppercase tracking-widest">Transmit Message</span>
                <Send className="w-4 h-4 relative z-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
