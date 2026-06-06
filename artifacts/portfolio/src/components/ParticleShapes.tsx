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

// Unique programming-related shapes defined as point positions
const shapes = [
  // CPU Chip/Microprocessor
  {
    name: "CPU_CHIP",
    points: (() => {
      const pts: number[] = [];
      // Main square chip - more points for better definition
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        pts.push(Math.cos(angle) * 0.6, Math.sin(angle) * 0.6, 0);
      }
      // Inner circuits - multiple layers
      for (let layer = 0; layer < 3; layer++) {
        const radius = 0.45 - layer * 0.1;
        for (let i = 0; i < 80; i++) {
          const angle = (i / 80) * Math.PI * 2;
          pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        }
      }
      // Grid pattern inside
      for (let x = -0.4; x <= 0.4; x += 0.1) {
        for (let y = -0.4; y <= 0.4; y += 0.1) {
          pts.push(x, y, 0);
        }
      }
      // Pins radiating out - more detailed
      for (let side = 0; side < 4; side++) {
        for (let pin = 0; pin < 12; pin++) {
          const offset = (pin - 5.5) * 0.15;
          if (side === 0) { // top
            for (let p = 0; p < 5; p++) {
              pts.push(offset, 0.6 + p * 0.04, 0);
            }
          } else if (side === 1) { // right
            for (let p = 0; p < 5; p++) {
              pts.push(0.6 + p * 0.04, offset, 0);
            }
          } else if (side === 2) { // bottom
            for (let p = 0; p < 5; p++) {
              pts.push(offset, -0.6 - p * 0.04, 0);
            }
          } else { // left
            for (let p = 0; p < 5; p++) {
              pts.push(-0.6 - p * 0.04, offset, 0);
            }
          }
        }
      }
      return new Float32Array(pts);
    })(),
  },
  // Binary Tree
  {
    name: "BINARY_TREE",
    points: (() => {
      const pts: number[] = [];
      // Root node - more points for better circle
      for (let i = 0; i < 25; i++) {
        const angle = (i / 25) * Math.PI * 2;
        pts.push(Math.cos(angle) * 0.12, 0.8 + Math.sin(angle) * 0.12, 0);
      }
      // Level 1 - 2 nodes
      for (let node = 0; node < 2; node++) {
        const x = (node - 0.5) * 0.8;
        for (let i = 0; i < 20; i++) {
          const angle = (i / 20) * Math.PI * 2;
          pts.push(x + Math.cos(angle) * 0.1, 0.3 + Math.sin(angle) * 0.1, 0);
        }
        // Connection lines - more points for smooth lines
        for (let i = 0; i < 30; i++) {
          const t = i / 30;
          pts.push(t * x, 0.8 - t * 0.5, 0);
        }
      }
      // Level 2 - 4 leaf nodes
      for (let node = 0; node < 4; node++) {
        const x = (node - 1.5) * 0.5;
        for (let i = 0; i < 18; i++) {
          const angle = (i / 18) * Math.PI * 2;
          pts.push(x + Math.cos(angle) * 0.08, -0.3 + Math.sin(angle) * 0.08, 0);
        }
        // Connection to parent - smoother lines
        const parentX = Math.floor(node / 2) === 0 ? -0.4 : 0.4;
        for (let i = 0; i < 25; i++) {
          const t = i / 25;
          pts.push(parentX + t * (x - parentX), 0.3 - t * 0.6, 0);
        }
      }
      return new Float32Array(pts);
    })(),
  },
  // Git Branch Graph
  {
    name: "GIT_GRAPH",
    points: (() => {
      const pts: number[] = [];
      // Main branch (master/main)
      for (let i = 0; i < 50; i++) {
        pts.push((i / 50) * 1.6 - 0.8, 0, 0);
        // Commit nodes
        if (i % 10 === 0) {
          for (let j = 0; j < 8; j++) {
            const angle = (j / 8) * Math.PI * 2;
            pts.push((i / 50) * 1.6 - 0.8 + Math.cos(angle) * 0.08, Math.sin(angle) * 0.08, 0);
          }
        }
      }
      // Feature branch 1
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        const x = -0.3 + t * 0.8;
        const y = 0.4 + Math.sin(t * Math.PI) * 0.2;
        pts.push(x, y, 0);
        if (i % 8 === 0) {
          for (let j = 0; j < 6; j++) {
            const angle = (j / 6) * Math.PI * 2;
            pts.push(x + Math.cos(angle) * 0.06, y + Math.sin(angle) * 0.06, 0);
          }
        }
      }
      // Feature branch 2
      for (let i = 0; i < 25; i++) {
        const t = i / 25;
        const x = 0.1 + t * 0.6;
        const y = -0.4 - Math.sin(t * Math.PI) * 0.15;
        pts.push(x, y, 0);
        if (i % 7 === 0) {
          for (let j = 0; j < 6; j++) {
            const angle = (j / 6) * Math.PI * 2;
            pts.push(x + Math.cos(angle) * 0.06, y + Math.sin(angle) * 0.06, 0);
          }
        }
      }
      return new Float32Array(pts);
    })(),
  },
  // Neural Network
  {
    name: "NEURAL_NET",
    points: (() => {
      const pts: number[] = [];
      const layers = [4, 6, 5, 3]; // more neurons per layer
      const layerSpacing = 0.5;
      
      for (let l = 0; l < layers.length; l++) {
        const x = (l - 1.5) * layerSpacing;
        const neurons = layers[l];
        for (let n = 0; n < neurons; n++) {
          const y = (n - (neurons - 1) / 2) * 0.35;
          // Neuron circle - more detailed
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            pts.push(x + Math.cos(angle) * 0.1, y + Math.sin(angle) * 0.1, 0);
          }
          // Connections to next layer - denser lines
          if (l < layers.length - 1) {
            const nextX = (l + 1 - 1.5) * layerSpacing;
            const nextNeurons = layers[l + 1];
            for (let nn = 0; nn < nextNeurons; nn++) {
              const nextY = (nn - (nextNeurons - 1) / 2) * 0.35;
              for (let i = 0; i < 15; i++) {
                const t = i / 15;
                pts.push(x + t * (nextX - x), y + t * (nextY - y), 0);
              }
            }
          }
        }
      }
      return new Float32Array(pts);
    })(),
  },
  // Algorithm Flow / Flowchart
  {
    name: "ALGORITHM_FLOW",
    points: (() => {
      const pts: number[] = [];
      // Start circle
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        pts.push(Math.cos(angle) * 0.12, 0.8 + Math.sin(angle) * 0.12, 0);
      }
      // Arrow down
      for (let i = 0; i < 15; i++) pts.push(0, 0.8 - (i / 15) * 0.4, 0);
      
      // Decision diamond
      const diamondPts = [
        [0, 0.3], [0.25, 0.1], [0, -0.1], [-0.25, 0.1], [0, 0.3]
      ];
      for (let i = 0; i < diamondPts.length - 1; i++) {
        for (let j = 0; j < 12; j++) {
          const t = j / 12;
          const x = diamondPts[i][0] + t * (diamondPts[i + 1][0] - diamondPts[i][0]);
          const y = diamondPts[i][1] + t * (diamondPts[i + 1][1] - diamondPts[i][1]);
          pts.push(x, y, 0);
        }
      }
      
      // Left path
      for (let i = 0; i < 12; i++) pts.push(-0.25, 0.1 - (i / 12) * 0.3, 0);
      for (let i = 0; i < 15; i++) {
        pts.push(-0.5 + (i / 15) * 0.3, -0.2, 0);
        pts.push(-0.5 + (i / 15) * 0.3, -0.5, 0);
        pts.push(-0.5, -0.2 - (i / 15) * 0.3, 0);
        pts.push(-0.2, -0.2 - (i / 15) * 0.3, 0);
      }
      
      // Right path
      for (let i = 0; i < 12; i++) pts.push(0.25, 0.1 - (i / 12) * 0.3, 0);
      for (let i = 0; i < 15; i++) {
        pts.push(0.2 + (i / 15) * 0.3, -0.2, 0);
        pts.push(0.2 + (i / 15) * 0.3, -0.5, 0);
        pts.push(0.2, -0.2 - (i / 15) * 0.3, 0);
        pts.push(0.5, -0.2 - (i / 15) * 0.3, 0);
      }
      
      // Merge and end
      for (let i = 0; i < 10; i++) pts.push(0, -0.5 - (i / 10) * 0.2, 0);
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        pts.push(Math.cos(angle) * 0.12, -0.8 + Math.sin(angle) * 0.12, 0);
      }
      
      return new Float32Array(pts);
    })(),
  },
];

function ParticleCloud() {
  const pointsRef = useRef<any>();
  const [shapeIndex, setShapeIndex] = useState(0);
  const [phase, setPhase] = useState<"forming" | "formed" | "bursting">("forming");
  
  const particleCount = 20000; // Increased particle count for more dots
  
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
    const scale = 2.5; // Made shapes significantly bigger
    const jitter = 0.02; // Reduced jitter further for more accurate shapes
    for (let i = 0; i < particleCount; i++) {
      const idx = (i % (shape.points.length / 3)) * 3;
      shapePositions[i * 3] = shape.points[idx] * scale + (Math.random() - 0.5) * jitter;
      shapePositions[i * 3 + 1] = shape.points[idx + 1] * scale + (Math.random() - 0.5) * jitter;
      shapePositions[i * 3 + 2] = shape.points[idx + 2] * scale + (Math.random() - 0.5) * jitter;
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
    const formTimer = setTimeout(() => setPhase("formed"), 4000); // Balanced timing
    const holdTimer = setTimeout(() => setPhase("bursting"), 8000); // Moderate hold
    const burstTimer = setTimeout(() => {
      setShapeIndex((prev) => (prev + 1) % shapes.length);
      setPhase("forming");
    }, 10000); // Balanced complete cycle
    
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
      // Move particles toward target shape - balanced speed
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const dx = targetShape[i3] - positions[i3];
        const dy = targetShape[i3 + 1] - positions[i3 + 1];
        const dz = targetShape[i3 + 2] - positions[i3 + 2];
        positions[i3] += dx * 0.025; // Balanced formation speed
        positions[i3 + 1] += dy * 0.025;
        positions[i3 + 2] += dz * 0.025;
      }
    } else if (phase === "formed") {
      // Gentle floating around shape - moderate speed
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(Date.now() * 0.0006 + i) * 0.0012; // Moderate floating
        positions[i3 + 1] += Math.cos(Date.now() * 0.0006 + i) * 0.0012;
      }
    } else if (phase === "bursting") {
      // Explode outward - moderate speed
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3] * 1.6; // Moderate burst speed
        positions[i3 + 1] += velocities[i3 + 1] * 1.6;
        positions[i3 + 2] += velocities[i3 + 2] * 1.6;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={phase === "forming" ? randomPositions : targetShape} stride={3}>
      <PointMaterial
        transparent
        color="#dccab0"
        size={0.025} // Increased dot size
        sizeAttenuation={true}
        depthWrite={false}
        opacity={phase === "bursting" ? 0.4 : 0.9} // Slightly higher opacity
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
