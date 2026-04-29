import { useRef, useState, useEffect, Suspense, Component, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Code2, Network, Eye, Layers } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, Text } from "@react-three/drei";

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

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function CanvasFallback() {
  return null;
}

const skills = [
  {
    category: "Artificial Intelligence",
    icon: Brain,
    description: "LLMs, RAG architectures, prompt engineering, agentic systems.",
    tech: ["OpenAI", "LangChain", "Hugging Face", "PyTorch"],
  },
  {
    category: "Full-Stack Web",
    icon: Code2,
    description: "Scalable, high-performance web applications from database to UI.",
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js"],
  },
  {
    category: "Machine Learning",
    icon: Network,
    description: "Predictive modeling, data pipelines, model optimization & deployment.",
    tech: ["TensorFlow", "Scikit-Learn", "Pandas", "MLOps"],
  },
  {
    category: "Computer Vision",
    icon: Eye,
    description: "Object detection, image segmentation, facial recognition systems.",
    tech: ["OpenCV", "YOLO", "ResNet", "CUDA"],
  },
  {
    category: "Automation (n8n)",
    icon: Layers,
    description: "Complex workflow orchestration, API integrations, ETL pipelines.",
    tech: ["n8n", "Zapier", "Webhooks", "Custom Nodes"],
  }
];

const NODE_POSITIONS: [number, number, number][] = [
  [0, 2, 0],
  [-2.5, 0.5, 1],
  [2.5, 0.5, -1],
  [-1.5, -2, -0.5],
  [1.5, -2, 0.5]
];

function Constellation() {
  const groupRef = useRef<any>();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {skills.map((skill, i) => (
        <group key={i} position={NODE_POSITIONS[i]}>
          <Sphere args={[0.3, 16, 16]}>
            <meshStandardMaterial 
              color="#f59e0b" 
              emissive="#f59e0b"
              emissiveIntensity={0.5}
              roughness={0.2} 
              metalness={0.8}
            />
          </Sphere>
          <Text
            position={[0, -0.6, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKw.woff"
          >
            {skill.category}
          </Text>
        </group>
      ))}

      {/* Connections */}
      <Line points={[NODE_POSITIONS[0], NODE_POSITIONS[1]]} color="#ea580c" lineWidth={1} transparent opacity={0.3} />
      <Line points={[NODE_POSITIONS[0], NODE_POSITIONS[2]]} color="#ea580c" lineWidth={1} transparent opacity={0.3} />
      <Line points={[NODE_POSITIONS[1], NODE_POSITIONS[3]]} color="#ea580c" lineWidth={1} transparent opacity={0.3} />
      <Line points={[NODE_POSITIONS[2], NODE_POSITIONS[4]]} color="#ea580c" lineWidth={1} transparent opacity={0.3} />
      <Line points={[NODE_POSITIONS[3], NODE_POSITIONS[4]]} color="#ea580c" lineWidth={1} transparent opacity={0.3} />
      <Line points={[NODE_POSITIONS[1], NODE_POSITIONS[4]]} color="#ea580c" lineWidth={1} transparent opacity={0.1} />
    </group>
  );
}

export default function Skills() {
  const [webglOk, setWebglOk] = useState(false);
  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="skills" className="relative w-full py-40 bg-background border-y border-border/20" ref={containerRef}>
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none hidden lg:block">
        {webglOk ? (
          <WebGLBoundary fallback={<CanvasFallback />}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#f59e0b" />
                <Constellation />
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
          className="mb-24 text-center"
        >
          <div className="font-mono text-secondary mb-6 text-xs tracking-[0.2em] uppercase">
            &gt; initializing modules...
          </div>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-foreground">
            Technical <span className="text-primary italic">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 bg-card/40 backdrop-blur-xl border border-border/40 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(245,158,11,0.1)] perspective-1000 transform-style-3d"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 translate-z-[20px]">
                  <div className="mb-6 p-4 inline-flex bg-background/50 backdrop-blur border border-border/50 text-muted-foreground group-hover:text-primary transition-colors duration-500">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-serif mb-3 text-foreground group-hover:text-primary transition-colors">{skill.category}</h3>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-light">
                    {skill.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skill.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-background/50 border border-border/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 right-10 font-mono text-[10px] text-muted-foreground/20 pointer-events-none select-none hidden lg:block tracking-widest"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i}>{`01001000 01100001 01101101 ${i}`}</div>
        ))}
      </motion.div>
    </section>
  );
}
