import { useRef, Suspense, Component, useState, useEffect, useMemo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Programming shapes defined as point positions
const shapes = [
  // Curly braces {}
  {
    name: "CURLY_BRACES",
    points: (() => {
      const pts: number[] = [];
      // Left brace
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        const x = -0.8 + Math.sin(t) * 0.15;
        const y = (i / 40) * 2 - 1;
        pts.push(x, y, 0);
      }
      // Right brace
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        const x = 0.8 - Math.sin(t) * 0.15;
        const y = (i / 40) * 2 - 1;
        pts.push(x, y, 0);
      }
      return new Float32Array(pts);
    })(),
  },
  // Angle brackets <>
  {
    name: "ANGLE_BRACKETS",
    points: (() => {
      const pts: number[] = [];
      // Left <
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        pts.push(-0.8 + t * 0.4, 1 - t * 2, 0);
      }
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        pts.push(-0.4 - t * 0.4, -1 + t * 2, 0);
      }
      // Right >
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        pts.push(0.4 + t * 0.4, 1 - t * 2, 0);
      }
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        pts.push(0.8 - t * 0.4, -1 + t * 2, 0);
      }
      return new Float32Array(pts);
    })(),
  },
  // Square brackets []
  {
    name: "SQUARE_BRACKETS",
    points: (() => {
      const pts: number[] = [];
      // Left [
      for (let i = 0; i < 30; i++) pts.push(-0.8, (i / 30) * 2 - 1, 0);
      for (let i = 0; i < 20; i++) pts.push(-0.8 + (i / 20) * 0.3, 1, 0);
      for (let i = 0; i < 20; i++) pts.push(-0.8 + (i / 20) * 0.3, -1, 0);
      // Right ]
      for (let i = 0; i < 30; i++) pts.push(0.8, (i / 30) * 2 - 1, 0);
      for (let i = 0; i < 20; i++) pts.push(0.5 + (i / 20) * 0.3, 1, 0);
      for (let i = 0; i < 20; i++) pts.push(0.5 + (i / 20) * 0.3, -1, 0);
      return new Float32Array(pts);
    })(),
  },
  // Function arrow =>
  {
    name: "ARROW",
    points: (() => {
      const pts: number[] = [];
      // Line
      for (let i = 0; i < 40; i++) pts.push((i / 40) * 1.2 - 0.6, 0, 0);
      // Arrow head
      for (let i = 0; i < 20; i++) {
        const t = i / 20;
        pts.push(0.6 - t * 0.3, t * 0.4, 0);
        pts.push(0.6 - t * 0.3, -t * 0.4, 0);
      }
      return new Float32Array(pts);
    })(),
  },
  // Lambda λ
  {
    name: "LAMBDA",
    points: (() => {
      const pts: number[] = [];
      for (let i = 0; i < 40; i++) {
        const t = i / 40;
        const x = -0.6 + t * 1.2;
        const y = Math.abs(Math.sin(t * Math.PI * 2)) * 0.8;
        pts.push(x, y, 0);
      }
      return new Float32Array(pts);
    })(),
  },
];

function ParticleCloud() {
  const pointsRef = useRef<any>();
  const [shapeIndex, setShapeIndex] = useState(0);
  const [phase, setPhase] = useState<"forming" | "formed" | "bursting">("forming");
  
  const particleCount = 3000;
  
  // Random starting positions for particles
  const randomPositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  // Current target shape
  const targetShape = useMemo(() => {
    const shape = shapes[shapeIndex];
    const shapePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const idx = (i % (shape.points.length / 3)) * 3;
      const jitter = 0.08;
      shapePositions[i * 3] = shape.points[idx] + (Math.random() - 0.5) * jitter;
      shapePositions[i * 3 + 1] = shape.points[idx + 1] + (Math.random() - 0.5) * jitter;
      shapePositions[i * 3 + 2] = shape.points[idx + 2] + (Math.random() - 0.5) * jitter;
    }
    return shapePositions;
  }, [shapeIndex]);

  const velocities = useMemo(() => {
    const vels = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      vels[i * 3] = (Math.random() - 0.5) * 0.02;
      vels[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return vels;
  }, []);

  useEffect(() => {
    const formTimer = setTimeout(() => setPhase("formed"), 2000);
    const holdTimer = setTimeout(() => setPhase("bursting"), 4500);
    const burstTimer = setTimeout(() => {
      setShapeIndex((prev) => (prev + 1) % shapes.length);
      setPhase("forming");
    }, 6000);
    
    return () => {
      clearTimeout(formTimer);
      clearTimeout(holdTimer);
      clearTimeout(burstTimer);
    };
  }, [shapeIndex]);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    if (phase === "forming") {
      // Move particles toward target shape
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const dx = targetShape[i3] - positions[i3];
        const dy = targetShape[i3 + 1] - positions[i3 + 1];
        const dz = targetShape[i3 + 2] - positions[i3 + 2];
        positions[i3] += dx * 0.05;
        positions[i3 + 1] += dy * 0.05;
        positions[i3 + 2] += dz * 0.05;
      }
    } else if (phase === "formed") {
      // Gentle floating around shape
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(Date.now() * 0.001 + i) * 0.002;
        positions[i3 + 1] += Math.cos(Date.now() * 0.001 + i) * 0.002;
      }
    } else if (phase === "bursting") {
      // Explode outward
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3] * 3;
        positions[i3 + 1] += velocities[i3 + 1] * 3;
        positions[i3 + 2] += velocities[i3 + 2] * 3;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={phase === "forming" ? randomPositions : targetShape} stride={3}>
      <PointMaterial
        transparent
        color="#dccab0"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={phase === "bursting" ? 0.3 : 0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch { return false; }
}

export default function ParticleShapes() {
  const [webglOk, setWebglOk] = useState(false);
  
  useEffect(() => {
    setWebglOk(detectWebGL());
  }, []);

  return (
    <section className="relative w-full py-40 bg-background border-t border-border/20 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="font-mono text-xs text-primary mb-8 tracking-[0.2em] uppercase">
              / CODE IN MOTION
            </div>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-serif leading-[0.9] tracking-tighter text-foreground mb-8">
              Living <span className="text-muted-foreground italic">Syntax</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Watch as thousands of particles coalesce into the symbols that define our craft — forming, holding, then exploding into new patterns. Code is never static; it evolves.
            </p>
          </motion.div>

          {/* Right: 3D Particle Animation */}
          <div className="w-full lg:w-1/2 h-[500px] relative">
            <div className="absolute inset-0">
              {webglOk ? (
                <WebGLBoundary fallback={null}>
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <ParticleCloud />
                    </Suspense>
                  </Canvas>
                </WebGLBoundary>
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
