import { motion } from "framer-motion";
import { Code2, Brain, Cpu, Database } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative w-full py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="font-mono text-primary mb-4 text-sm tracking-widest uppercase">
            ~/whoami $ cat background.txt
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Engineering <span className="text-muted-foreground italic">Intelligence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I don't just write code; I architect intelligent systems. As a polymath engineer, I bridge the gap between complex machine learning models and highly scalable production web applications.
            </p>
            <p>
              My expertise lies in training sophisticated computer vision models and deploying them into intuitive, fast, and resilient Full-Stack environments. I believe in end-to-end ownership.
            </p>
            <p>
              When I'm not building core infrastructure, I'm wiring up intricate automation pipelines with n8n, ensuring that complex workflows operate with zero friction.
            </p>
            
            <div className="pt-8 border-t border-border/50 grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2 font-mono">5+</div>
                <div className="text-sm font-mono text-muted-foreground">Years Shipping<br/>Production Code</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2 font-mono">100%</div>
                <div className="text-sm font-mono text-muted-foreground">System<br/>Reliability</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Abstract code visualizer */}
              <div className="h-full flex flex-col justify-center space-y-4 font-mono text-sm opacity-80">
                <div className="flex items-center text-primary"><Code2 className="w-4 h-4 mr-2" /> <span className="text-muted-foreground">class</span> <span className="text-foreground">Engineer</span> {'{'}</div>
                <div className="pl-6 flex items-center text-secondary"><Brain className="w-4 h-4 mr-2" /> <span className="text-muted-foreground">constructor</span>() {'{'}</div>
                <div className="pl-12 text-muted-foreground">this.domain = "AI & ML";</div>
                <div className="pl-12 text-muted-foreground">this.stack = "Full-Stack";</div>
                <div className="pl-12 text-muted-foreground">this.passion = "Computer Vision";</div>
                <div className="pl-6">{'}'}</div>
                <div className="pl-6 flex items-center text-primary"><Cpu className="w-4 h-4 mr-2" /> <span className="text-muted-foreground">async</span> <span className="text-foreground">buildSystem</span>() {'{'}</div>
                <div className="pl-12 text-muted-foreground">await this.trainModel();</div>
                <div className="pl-12 text-muted-foreground">await this.deployAPI();</div>
                <div className="pl-12 text-muted-foreground">return new Product();</div>
                <div className="pl-6">{'}'}</div>
                <div className="flex items-center text-secondary"><Database className="w-4 h-4 mr-2" /> {'}'}</div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 blur-[60px] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
