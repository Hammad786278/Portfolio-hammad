import { useRef, useState, useEffect, Suspense, Component, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const stackData = [
  { id: "AI", name: "Artificial Intelligence", tools: ["OpenAI", "Anthropic", "LangChain", "RAG", "Vector DBs"] },
  { id: "FS", name: "Full-Stack Web", tools: ["Next.js", "React", "Node.js", "Postgres", "tRPC"] },
  { id: "ML", name: "Machine Learning", tools: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "MLOps"] },
  { id: "CV", name: "Computer Vision", tools: ["OpenCV", "YOLO", "MediaPipe", "ResNet", "CUDA"] },
  { id: "AT", name: "Automation", tools: ["n8n", "Workflow Design", "Custom Nodes", "Integrations"] }
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
      {stackData.map((skill, i) => (
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
            {skill.id}
          </Text>
        </group>
      ))}

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

  return (
    <section id="skills" className="relative w-full py-40 bg-background border-t border-border/20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none hidden lg:block right-1/2">
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

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2 min-h-[400px]">
             {/* 3D area placeholder for mobile or visual balance */}
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="font-mono text-xs text-primary mb-12 tracking-[0.2em] uppercase">
              / 04 — SKILLS CONSTELLATION
            </div>
            <h2 className="text-[clamp(3rem,6vw,6rem)] font-serif leading-[0.9] tracking-tighter text-foreground mb-16">
              Technical <span className="text-muted-foreground italic">Stack</span>
            </h2>

            <div className="flex flex-col gap-10">
              {stackData.map((stack, i) => (
                <motion.div 
                  key={stack.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-border/30 group"
                >
                  <div className="font-mono text-xl text-primary md:w-1/4">
                    {stack.id}
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="font-mono text-sm tracking-widest text-foreground uppercase mb-4">{stack.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.tools.map((tool, j) => (
                        <span key={j} className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-background/50 border border-border/50 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
