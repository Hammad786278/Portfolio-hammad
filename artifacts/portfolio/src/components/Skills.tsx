import { useRef, useState, useEffect, Suspense, Component, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line, Text } from "@react-three/drei";

class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
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
  } catch { return false; }
}

const stackData = [
  {
    id: "AI",
    name: "Artificial Intelligence",
    tools: ["OpenAI", "Anthropic", "LangChain", "RAG", "Vector DBs"],
    description: "Building intelligent systems that reason, generate, and adapt — from LLM pipelines to retrieval-augmented architectures.",
    stat: "12+ AI systems shipped",
    color: "#dccab0",
    icon: "◈",
  },
  {
    id: "FS",
    name: "Full-Stack Web",
    tools: ["Next.js", "React", "Node.js", "Postgres", "tRPC"],
    description: "End-to-end web applications with type-safe APIs, real-time features, and production-grade infrastructure.",
    stat: "20+ web apps deployed",
    color: "#c4a882",
    icon: "⬡",
  },
  {
    id: "ML",
    name: "Machine Learning",
    tools: ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "MLOps"],
    description: "Training, evaluating, and deploying ML models at scale — from research prototypes to production pipelines.",
    stat: "8+ models in production",
    color: "#b89070",
    icon: "⬢",
  },
  {
    id: "CV",
    name: "Computer Vision",
    tools: ["OpenCV", "YOLO", "MediaPipe", "ResNet", "CUDA"],
    description: "Real-time visual intelligence for edge devices and cloud — detection, segmentation, and tracking at speed.",
    stat: "5+ CV products shipped",
    color: "#a07858",
    icon: "◉",
  },
  {
    id: "AT",
    name: "Automation",
    tools: ["n8n", "Workflow Design", "Custom Nodes", "Integrations"],
    description: "Connecting systems and eliminating manual work — custom n8n nodes, event-driven pipelines, and API orchestration.",
    stat: "40+ services automated",
    color: "#906848",
    icon: "⟳",
  },
];

const NODE_POSITIONS: [number, number, number][] = [
  [0, 2, 0],
  [-2.5, 0.5, 1],
  [2.5, 0.5, -1],
  [-1.5, -2, -0.5],
  [1.5, -2, 0.5],
];

function Constellation({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<any>();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {stackData.map((skill, i) => (
        <group key={i} position={NODE_POSITIONS[i]}>
          <Sphere args={[i === activeIndex ? 0.42 : 0.28, 16, 16]}>
            <meshStandardMaterial
              color={i === activeIndex ? "#dccab0" : "#4a4035"}
              emissive={i === activeIndex ? "#dccab0" : "#2a1f10"}
              emissiveIntensity={i === activeIndex ? 0.8 : 0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
          <Text
            position={[0, -0.65, 0]}
            fontSize={0.18}
            color={i === activeIndex ? "#ffffff" : "#555"}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKw.woff"
          >
            {skill.id}
          </Text>
        </group>
      ))}
      <Line points={[NODE_POSITIONS[0], NODE_POSITIONS[1]]} color="#b8a596" lineWidth={1} transparent opacity={0.25} />
      <Line points={[NODE_POSITIONS[0], NODE_POSITIONS[2]]} color="#b8a596" lineWidth={1} transparent opacity={0.25} />
      <Line points={[NODE_POSITIONS[1], NODE_POSITIONS[3]]} color="#b8a596" lineWidth={1} transparent opacity={0.25} />
      <Line points={[NODE_POSITIONS[2], NODE_POSITIONS[4]]} color="#b8a596" lineWidth={1} transparent opacity={0.25} />
      <Line points={[NODE_POSITIONS[3], NODE_POSITIONS[4]]} color="#b8a596" lineWidth={1} transparent opacity={0.25} />
      <Line points={[NODE_POSITIONS[1], NODE_POSITIONS[4]]} color="#b8a596" lineWidth={1} transparent opacity={0.1} />
    </group>
  );
}

function SkillDetailPanel({ skill, index }: { skill: typeof stackData[0]; index: number }) {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col justify-between p-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="text-4xl leading-none select-none"
          style={{ color: skill.color }}
        >
          {skill.icon}
        </motion.span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground/40 uppercase">
          {String(index + 1).padStart(2, "0")} / {stackData.length.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Name + description */}
      <div className="flex flex-col gap-3">
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: skill.color }}
        >
          {skill.name}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="text-sm text-foreground/70 font-light leading-relaxed"
        >
          {skill.description}
        </motion.p>
      </div>

      {/* Tools + stat */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.35 }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-wrap gap-1.5">
          {skill.tools.map((tool, j) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.28 + j * 0.05, duration: 0.25 }}
              className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider border"
              style={{
                borderColor: `${skill.color}45`,
                backgroundColor: `${skill.color}0a`,
                color: `${skill.color}cc`,
              }}
            >
              {tool}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-border/20">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: skill.color }}
          />
          <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground">
            {skill.stat}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [webglOk, setWebglOk] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  // Auto-cycle when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stackData.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovering]);

  const activeSkill = stackData[activeIndex];

  return (
    <section id="skills" className="relative w-full py-40 bg-background border-t border-border/20 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-start">

          {/* ── LEFT: interactive detail panel (fills the previously empty space) ── */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex flex-col gap-6">

            {/* 3D constellation */}
            <div className="w-full h-52 opacity-70 pointer-events-none">
              {webglOk ? (
                <WebGLBoundary fallback={null}>
                  <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: false, powerPreference: "high-performance", stencil: false }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} color="#dccab0" />
                      <Constellation activeIndex={activeIndex} />
                    </Suspense>
                  </Canvas>
                </WebGLBoundary>
              ) : null}
            </div>

            {/* Detail card */}
            <div className="relative w-full overflow-hidden border border-border/30 bg-card/40 backdrop-blur-sm" style={{ minHeight: "260px" }}>
              {/* Animated corner brackets */}
              <motion.div
                className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <div className="absolute top-0 left-0 w-full h-px" style={{ backgroundColor: activeSkill.color }} />
                <div className="absolute top-0 left-0 h-full w-px" style={{ backgroundColor: activeSkill.color }} />
              </motion.div>
              <motion.div
                className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-px" style={{ backgroundColor: activeSkill.color }} />
                <div className="absolute bottom-0 right-0 h-full w-px" style={{ backgroundColor: activeSkill.color }} />
              </motion.div>

              <AnimatePresence mode="wait">
                <SkillDetailPanel key={activeIndex} skill={activeSkill} index={activeIndex} />
              </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div className="flex gap-1.5">
              {stackData.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); setIsHovering(true); setTimeout(() => setIsHovering(false), 5000); }}
                  className="flex-1 transition-all duration-300"
                  style={{
                    height: i === activeIndex ? "2px" : "1px",
                    backgroundColor: i === activeIndex ? activeSkill.color : "hsl(var(--border))",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: heading + skill list (unchanged from original) ── */}
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
                  onMouseEnter={() => { setActiveIndex(i); setIsHovering(true); }}
                  onMouseLeave={() => setIsHovering(false)}
                  className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-border/30 group cursor-default relative"
                >
                  {/* Active left bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    animate={{ opacity: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ backgroundColor: stack.color }}
                  />

                  <div
                    className="font-mono text-xl md:w-1/4 transition-colors duration-300 pl-3"
                    style={{ color: activeIndex === i ? stack.color : "hsl(var(--primary))" }}
                  >
                    {stack.id}
                  </div>
                  <div className="md:w-3/4 pl-3 md:pl-0">
                    <h4 className="font-mono text-sm tracking-widest text-foreground uppercase mb-4 transition-colors duration-300">
                      {stack.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.tools.map((tool, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-background/50 border border-border/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-foreground"
                        >
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
