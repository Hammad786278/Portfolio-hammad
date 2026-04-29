import { useRef, Suspense, Component, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot } from "@react-three/drei";
import { motion } from "framer-motion";
import { Terminal, Mail, Send } from "lucide-react";

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

function RotatingKnot() {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[1, 0.3, 100, 16]}>
      <meshStandardMaterial 
        color="#dccab0"
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        emissive="#b8a596"
        emissiveIntensity={0.2}
      />
    </TorusKnot>
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

export default function Contact() {
  const [webglOk, setWebglOk] = useState(false);
  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  return (
    <section id="contact" className="relative w-full py-40 bg-background border-t border-border/20 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none hidden lg:block">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#dccab0" />
                <RotatingKnot />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        ) : (
          <CanvasFallback />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="font-mono text-xs text-primary mb-12 tracking-[0.2em] uppercase">
          / 09 — INITIATE CONNECTION
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-[clamp(4rem,10vw,10rem)] font-serif leading-[0.8] tracking-tighter text-foreground mb-8">
            LET'S BUILD <br/>
            <span className="italic text-muted-foreground">SOMETHING</span>
          </h2>
          <p className="text-[clamp(2rem,4vw,4rem)] font-serif italic text-primary leading-none">
            AT THE EDGE OF WHAT'S POSSIBLE.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <a
              href="mailto:hammad@example.dev"
              className="group relative flex items-center justify-between p-8 border border-border/40 bg-card/40 backdrop-blur-xl overflow-hidden transition-all hover:border-primary/50"
            >
              <div className="absolute inset-0 bg-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-2">
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Direct Line</span>
                <span className="font-mono text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">hammad@example.dev</span>
              </div>
              <Send className="w-6 h-6 text-primary relative z-10 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
            </a>
          </div>

          <div className="flex flex-col gap-6 font-mono text-sm tracking-widest uppercase">
            <div className="flex items-center gap-4">
              <span className="text-primary">01.</span>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Github // Code</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary">02.</span>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn // Network</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-primary">03.</span>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter // Thoughts</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
