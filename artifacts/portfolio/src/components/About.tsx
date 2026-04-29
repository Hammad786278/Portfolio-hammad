import { useRef, Suspense, Component, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { Code2, Brain, Cpu, Database } from "lucide-react";

class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function CanvasFallback() {
  return null;
}

function BackgroundWireframe() {
  const meshRef = useRef<any>();
  const matRef = useRef<any>();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.05;
      meshRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[3, 1]} position={[2, 0, -2]}>
      <meshBasicMaterial
        color="#f59e0b"
        wireframe={true}
        transparent={true}
        opacity={0.05}
      />
    </Icosahedron>
  );
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

export default function About() {
  const [webglOk, setWebglOk] = useState(false);
  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  return (
    <section id="about" className="relative w-full py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <BackgroundWireframe />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        ) : (
          <CanvasFallback />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="font-mono text-primary mb-6 text-xs tracking-[0.2em] uppercase">
            ~/whoami $ cat background.txt
          </div>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-foreground">
            Engineering <span className="text-muted-foreground italic">Intelligence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-xl text-muted-foreground leading-relaxed font-light"
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
            
            <div className="pt-12 border-t border-border/30 grid grid-cols-2 gap-12">
              <div>
                <div className="text-4xl font-serif text-primary mb-3">5+</div>
                <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground/60">Years Shipping<br/>Production Code</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-secondary mb-3">100%</div>
                <div className="text-xs font-mono tracking-widest uppercase text-muted-foreground/60">System<br/>Reliability</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative perspective-1000"
          >
            <div className="aspect-square border border-border/20 bg-background/40 backdrop-blur-md p-10 relative overflow-hidden group shadow-2xl transform-style-3d hover:rotate-y-[5deg] hover:-rotate-x-[5deg] transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Abstract code visualizer */}
              <div className="h-full flex flex-col justify-center space-y-5 font-mono text-sm opacity-80 translate-z-[50px]">
                <div className="flex items-center text-primary"><Code2 className="w-4 h-4 mr-3 opacity-50" /> <span className="text-muted-foreground">class</span> <span className="text-foreground ml-2">Engineer</span> {'{'}</div>
                <div className="pl-8 flex items-center text-secondary"><Brain className="w-4 h-4 mr-3 opacity-50" /> <span className="text-muted-foreground">constructor</span>() {'{'}</div>
                <div className="pl-16 text-muted-foreground/70">this.domain = <span className="text-primary/80">"AI & ML"</span>;</div>
                <div className="pl-16 text-muted-foreground/70">this.stack = <span className="text-primary/80">"Full-Stack"</span>;</div>
                <div className="pl-16 text-muted-foreground/70">this.passion = <span className="text-primary/80">"Computer Vision"</span>;</div>
                <div className="pl-8 text-muted-foreground">{'}'}</div>
                <div className="pl-8 flex items-center text-primary"><Cpu className="w-4 h-4 mr-3 opacity-50" /> <span className="text-muted-foreground">async</span> <span className="text-foreground ml-2">buildSystem</span>() {'{'}</div>
                <div className="pl-16 text-muted-foreground/70">await this.trainModel();</div>
                <div className="pl-16 text-muted-foreground/70">await this.deployAPI();</div>
                <div className="pl-16 text-muted-foreground/70"><span className="text-secondary/80">return new</span> Product();</div>
                <div className="pl-8 text-muted-foreground">{'}'}</div>
                <div className="flex items-center text-muted-foreground"><Database className="w-4 h-4 mr-3 opacity-50" /> {'}'}</div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full translate-z-[-20px]" />
              <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full translate-z-[-20px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
