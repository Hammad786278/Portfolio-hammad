import { useRef, Suspense, Component, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Environment, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as random from "maath/random/dist/maath-random.esm";
import { ArrowDown } from "lucide-react";

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
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.05),_transparent_60%)]">
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(hsl(var(--primary)/0.2)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.2)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}

function ParticleField(props: any) {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(3000), { radius: 1.8 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#f59e0b" size={0.003} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
    </group>
  );
}

function DistortedCore() {
  const meshRef = useRef<any>();
  const matRef = useRef<any>();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (matRef.current) {
      matRef.current.distort = 0.3 + Math.sin(time * 0.5) * 0.1;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.4}>
      <MeshDistortMaterial
        ref={matRef}
        color="#0a0a0a"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.9}
        wireframe={true}
        emissive="#f59e0b"
        emissiveIntensity={0.2}
      />
    </Sphere>
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

export default function Hero() {
  const [webglOk, setWebglOk] = useState(false);
  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 6], fov: 45 }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#f59e0b" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ea580c" />
                <ParticleField />
                <DistortedCore />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        ) : (
          <CanvasFallback />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-background/40 backdrop-blur-md"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            System Online // Ready
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-[9rem] font-serif leading-none tracking-tight text-foreground mb-6 drop-shadow-2xl"
        >
          Hammad <span className="text-primary italic">Hussian</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light mb-12 tracking-wide"
        >
          Polymath Engineer. AI/ML Specialist. Full-Stack Developer.
          <br className="hidden md:block" /> Building intelligent systems end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-widest uppercase hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all duration-300"
          >
            &gt; Execute Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 font-mono text-sm tracking-widest uppercase transition-all duration-300"
          >
            Contact_Node
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/40"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Initialize sequence</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
