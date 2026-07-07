import { useRef, Suspense, Component, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
        color={isDark ? "#dccab0" : "#b38728"}
        wireframe={true}
        transparent={true}
        opacity={isDark ? 0.05 : 0.08}
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
    <section id="about" className="relative w-full py-40 overflow-hidden bg-background">
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

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="font-mono text-xs text-primary mb-12 tracking-[0.2em] uppercase">
          / 02 — MANIFESTO
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h2 className="text-[clamp(3rem,6vw,6rem)] font-serif leading-[0.9] tracking-tighter text-foreground italic text-balance pr-8">
              "I build systems that think, scale, and execute under pressure."
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="text-xl text-muted-foreground leading-relaxed font-light">
              <p>
                As a polymath engineer, I bridge the gap between complex machine learning models and highly scalable production web applications. I don't just write code; I architect intelligent end-to-end systems.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 pt-8 border-t border-border/30">
              <div className="flex items-start gap-4">
                <span className="font-mono text-primary text-sm mt-1">01.</span>
                <p className="font-mono text-sm tracking-wide uppercase text-foreground">Ship under pressure</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-primary text-sm mt-1">02.</span>
                <p className="font-mono text-sm tracking-wide uppercase text-foreground">Models in production</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-primary text-sm mt-1">03.</span>
                <p className="font-mono text-sm tracking-wide uppercase text-foreground">Automation as leverage</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
