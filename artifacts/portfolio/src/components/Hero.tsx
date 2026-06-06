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
  const sphere = random.inSphere(new Float32Array(2000), { radius: 1.8 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={true} {...props}>
        <PointMaterial transparent color="#dccab0" size={0.003} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
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
    <Sphere ref={meshRef} args={[1, 48, 48]} scale={1.4}>
      <MeshDistortMaterial
        ref={matRef}
        color="#0a0a0a"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.9}
        wireframe={true}
        emissive="#dccab0"
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
  
  const textTitle = "Hammad Hussian";
  
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 6], fov: 45 }}
              gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
              frameloop="demand"
              onCreated={({ gl }) => {
                gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
              }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#dccab0" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b8a596" />
                <ParticleField />
                <DistortedCore />
              </Suspense>
            </Canvas>
          </WebGLBoundary>
        ) : (
          <CanvasFallback />
        )}
      </div>

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <div className="flex flex-col items-start w-full">
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

          <div className="relative mb-6">
            <h1 className="text-[clamp(4rem,14vw,16rem)] font-serif leading-[0.8] tracking-tighter text-foreground drop-shadow-2xl">
              {textTitle.split(" ").map((word, i) => (
                <span key={i} className={`block ${i === 1 ? 'italic text-primary ml-[10vw]' : ''}`}>
                  {word.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + (i * 0.2) + (j * 0.05), ease: [0.2, 0.65, 0.3, 0.9] }}
                      className="inline-block will-change-transform"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-col gap-6 ml-[10vw] max-w-2xl"
          >
             <p className="text-xl md:text-3xl text-muted-foreground font-light tracking-wide text-balance">
              Polymath Engineer. AI/ML Specialist. Full-Stack Developer. Building intelligent systems end-to-end.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-widest uppercase hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_8px_30px_-12px_hsl(var(--foreground)/0.25)] transition-all duration-300"
              >
                &gt; Execute Projects
              </a>
              <a
                href="tel:+923476446706"
                className="px-8 py-4 bg-transparent border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 font-mono text-sm tracking-widest uppercase transition-all duration-300"
              >
                Contact_Node
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress dots on the right edge */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-20 mix-blend-difference">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/40 mix-blend-difference"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Initialize sequence</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
