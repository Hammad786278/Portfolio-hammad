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
        color="#f59e0b"
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        emissive="#ea580c"
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
      {/* 3D Element positioned to the right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none hidden lg:block">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#f59e0b" />
                <RotatingKnot />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        ) : (
          <CanvasFallback />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="inline-flex items-center justify-center p-5 border border-primary/20 bg-background/50 backdrop-blur text-primary mb-10">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-6xl md:text-8xl font-serif tracking-tight text-foreground mb-8">
            Initiate <span className="text-primary italic">Connection.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
            Currently open for new opportunities. Whether you have a question about machine learning, need a complex system built, or just want to say hi, my inbox is open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full max-w-2xl p-10 md:p-14 border border-border/40 bg-card/40 backdrop-blur-xl relative overflow-hidden group perspective-1000 transform-style-3d hover:border-primary/30 transition-colors duration-500">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="font-mono text-xs text-muted-foreground mb-12 flex items-center justify-between border-b border-border/40 pb-6 uppercase tracking-widest">
              <span>status: <span className="text-primary animate-pulse">AVAILABLE</span></span>
              <span>latency: 12ms</span>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-sm text-foreground/80 mb-10 tracking-widest uppercase">
                &gt; Ping hammad@example.dev...
              </p>
              <a
                href="mailto:hammad@example.dev"
                className="group/btn relative flex items-center justify-center gap-4 w-full py-6 bg-primary text-primary-foreground font-mono text-sm font-bold overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_0_rgba(245,158,11,0)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                <Mail className="w-5 h-5 relative z-10" />
                <span className="relative z-10 uppercase tracking-[0.2em]">Transmit Message</span>
                <Send className="w-4 h-4 relative z-10 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
              </a>
            </div>
            
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full translate-z-[-10px] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
