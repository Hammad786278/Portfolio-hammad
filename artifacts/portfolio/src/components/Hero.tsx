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
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.15),_transparent_60%)]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--primary)/0.4)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.4)_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  );
}

function ParticleField(props: any) {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#00ffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
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
      matRef.current.distort = 0.4 + Math.sin(time) * 0.1;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.2}>
      <MeshDistortMaterial
        ref={matRef}
        color="#0a0a0a"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        emissive="#00ffff"
        emissiveIntensity={0.5}
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
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 5], fov: 45 }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <ParticleField />
                <DistortedCore />
                <Environment preset="city" />
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
          className="mb-4 inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md"
        >
          <span className="font-mono text-sm text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            System Online // Ready for deployment
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 drop-shadow-lg"
        >
          Hammad <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Hussian</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light mb-10"
        >
          Polymath Engineer. AI/ML Specialist. Full-Stack Developer.
          <br className="hidden md:block" /> Building intelligent systems end-to-end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-md bg-primary text-primary-foreground font-mono font-medium tracking-wide hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300"
          >
            &gt; Execute Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-md bg-transparent border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 font-mono font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            Contact_Node
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll to initialize</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
