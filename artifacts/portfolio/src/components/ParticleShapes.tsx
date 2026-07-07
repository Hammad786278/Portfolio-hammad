import { useRef, Suspense, Component, useState, useEffect, useMemo, type ReactNode, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "next-themes";

class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// Exciting AI and programming-related shapes that are visually stunning
const shapes = [
  // AI Brain Neural Network - Complex and Beautiful
  {
    name: "AI_BRAIN",
    points: (() => {
      const pts: number[] = [];
      
      // Brain outline (organic curves)
      for (let i = 0; i < 200; i++) {
        const angle = (i / 200) * Math.PI * 2;
        const radius = 0.7 + 0.15 * Math.sin(angle * 3) + 0.1 * Math.cos(angle * 5);
        pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8, 0);
      }
      
      // Neural pathways (lightning-like patterns)
      const centers = [
        [-0.3, 0.2], [0.3, 0.2], [-0.2, -0.3], [0.2, -0.3], [0, 0.1], [-0.1, -0.1], [0.1, -0.1]
      ];
      
      for (let c = 0; c < centers.length; c++) {
        const [cx, cy] = centers[c];
        // Neural nodes
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2;
          pts.push(cx + Math.cos(angle) * 0.08, cy + Math.sin(angle) * 0.08, 0);
        }
        
        // Connections to other nodes
        for (let other = c + 1; other < centers.length; other++) {
          const [ox, oy] = centers[other];
          const distance = Math.sqrt((ox - cx) ** 2 + (oy - cy) ** 2);
          if (distance < 0.6) {
            for (let i = 0; i < 30; i++) {
              const t = i / 30;
              const x = cx + t * (ox - cx) + 0.05 * Math.sin(t * Math.PI * 4);
              const y = cy + t * (oy - cy) + 0.03 * Math.cos(t * Math.PI * 6);
              pts.push(x, y, 0);
            }
          }
        }
      }
      
      return new Float32Array(pts);
    })(),
  },

  // Molecular DNA Helix - Programming DNA
  {
    name: "DNA_HELIX",
    points: (() => {
      const pts: number[] = [];
      
      // Double helix structure
      for (let i = 0; i < 400; i++) {
        const t = (i / 400) * 4 * Math.PI;
        const y = (i / 400) * 1.6 - 0.8;
        
        // First strand
        const x1 = Math.cos(t) * 0.3;
        const z1 = Math.sin(t) * 0.2;
        pts.push(x1, y, z1);
        
        // Second strand (180 degrees offset)
        const x2 = Math.cos(t + Math.PI) * 0.3;
        const z2 = Math.sin(t + Math.PI) * 0.2;
        pts.push(x2, y, z2);
        
        // Base pairs connecting the strands
        if (i % 10 === 0) {
          for (let j = 0; j < 8; j++) {
            const connT = j / 8;
            pts.push(x1 + connT * (x2 - x1), y, z1 + connT * (z2 - z1));
          }
        }
      }
      
      return new Float32Array(pts);
    })(),
  },

  // Code Matrix Rain Effect
  {
    name: "MATRIX_CODE",
    points: (() => {
      const pts: number[] = [];
      
      // Vertical code streams
      for (let col = 0; col < 12; col++) {
        const x = (col - 5.5) * 0.15;
        
        for (let row = 0; row < 60; row++) {
          const y = (row / 60) * 1.6 - 0.8;
          
          // Create varying brightness effect
          if (Math.random() > 0.3) {
            pts.push(x + (Math.random() - 0.5) * 0.03, y, 0);
          }
        }
        
        // Bright leading character
        for (let i = 0; i < 15; i++) {
          const angle = (i / 15) * Math.PI * 2;
          const brightY = 0.7 - (col * 0.1) % 1.4;
          pts.push(x + Math.cos(angle) * 0.05, brightY + Math.sin(angle) * 0.05, 0);
        }
      }
      
      // Digital rain drops
      for (let drop = 0; drop < 50; drop++) {
        const x = (Math.random() - 0.5) * 1.4;
        const startY = 0.8;
        
        for (let i = 0; i < 20; i++) {
          const y = startY - i * 0.08;
          pts.push(x, y, 0);
        }
      }
      
      return new Float32Array(pts);
    })(),
  },

  // Quantum Computing Circuit
  {
    name: "QUANTUM_CIRCUIT",
    points: (() => {
      const pts: number[] = [];
      
      // Quantum gates and qubits
      const qubits = 5;
      const gates = 8;
      
      for (let q = 0; q < qubits; q++) {
        const y = (q - 2) * 0.25;
        
        // Qubit line
        for (let i = 0; i < 100; i++) {
          const x = (i / 100) * 1.6 - 0.8;
          pts.push(x, y, 0);
        }
        
        // Quantum gates
        for (let g = 0; g < gates; g++) {
          const gx = (g - 3.5) * 0.2;
          
          // Gate representation
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            pts.push(gx + Math.cos(angle) * 0.06, y + Math.sin(angle) * 0.06, 0);
          }
          
          // Entanglement lines
          if (q < qubits - 1 && g % 2 === 0) {
            const nextY = ((q + 1) - 2) * 0.25;
            for (let i = 0; i < 15; i++) {
              const t = i / 15;
              pts.push(gx, y + t * (nextY - y), Math.sin(t * Math.PI) * 0.1);
            }
          }
        }
      }
      
      // Quantum superposition visualization
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 4;
        const radius = 0.4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.3;
        const z = Math.sin(angle * 2) * 0.15;
        pts.push(x, y, z);
      }
      
      return new Float32Array(pts);
    })(),
  },

  // Blockchain Network
  {
    name: "BLOCKCHAIN",
    points: (() => {
      const pts: number[] = [];
      
      // Chain of blocks
      const blocks = 7;
      for (let b = 0; b < blocks; b++) {
        const x = (b - 3) * 0.25;
        
        // Block structure
        const blockPts = [
          [-0.1, -0.1], [0.1, -0.1], [0.1, 0.1], [-0.1, 0.1], [-0.1, -0.1]
        ];
        
        for (let i = 0; i < blockPts.length - 1; i++) {
          for (let j = 0; j < 15; j++) {
            const t = j / 15;
            const px = blockPts[i][0] + t * (blockPts[i + 1][0] - blockPts[i][0]);
            const py = blockPts[i][1] + t * (blockPts[i + 1][1] - blockPts[i][1]);
            pts.push(x + px, py, 0);
          }
        }
        
        // Hash visualization inside block
        for (let h = 0; h < 30; h++) {
          const hx = x + (Math.random() - 0.5) * 0.15;
          const hy = (Math.random() - 0.5) * 0.15;
          pts.push(hx, hy, 0);
        }
        
        // Chain connections
        if (b < blocks - 1) {
          for (let i = 0; i < 20; i++) {
            const cx = x + 0.1 + (i / 20) * 0.15;
            pts.push(cx, 0, 0);
            
            // Cryptographic links
            for (let j = 0; j < 5; j++) {
              const angle = (j / 5) * Math.PI * 2;
              pts.push(cx + Math.cos(angle) * 0.02, Math.sin(angle) * 0.02, 0);
            }
          }
        }
      }
      
      // Network nodes around the chain
      const nodes = 12;
      for (let n = 0; n < nodes; n++) {
        const angle = (n / nodes) * Math.PI * 2;
        const radius = 0.6;
        const nx = Math.cos(angle) * radius;
        const ny = Math.sin(angle) * radius;
        
        // Node circle
        for (let i = 0; i < 15; i++) {
          const nodeAngle = (i / 15) * Math.PI * 2;
          pts.push(nx + Math.cos(nodeAngle) * 0.05, ny + Math.sin(nodeAngle) * 0.05, 0);
        }
        
        // Connections to center
        for (let i = 0; i < 10; i++) {
          const t = i / 10;
          pts.push(nx * (1 - t), ny * (1 - t), 0);
        }
      }
      
      return new Float32Array(pts);
    })(),
  },

  // Artificial Intelligence Eye/Iris Scanner
  {
    name: "AI_EYE",
    points: (() => {
      const pts: number[] = [];
      
      // Outer eye boundary
      for (let i = 0; i < 150; i++) {
        const angle = (i / 150) * Math.PI * 2;
        const radius = 0.6 + 0.1 * Math.sin(angle * 2);
        pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.7, 0);
      }
      
      // Iris rings (multiple layers)
      for (let ring = 0; ring < 5; ring++) {
        const radius = 0.5 - ring * 0.08;
        for (let i = 0; i < 120; i++) {
          const angle = (i / 120) * Math.PI * 2;
          pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        }
      }
      
      // Pupil
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2;
        pts.push(Math.cos(angle) * 0.12, Math.sin(angle) * 0.12, 0);
      }
      
      // Scanning lines
      for (let scan = 0; scan < 8; scan++) {
        const angle = (scan / 8) * Math.PI * 2;
        for (let i = 0; i < 30; i++) {
          const radius = (i / 30) * 0.5;
          pts.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        }
      }
      
      // Digital crosshairs
      for (let i = 0; i < 60; i++) {
        const t = (i / 60) * 0.8 - 0.4;
        pts.push(t, 0, 0); // horizontal
        pts.push(0, t, 0); // vertical
      }
      
      // HUD elements around the eye
      const hudRadius = 0.8;
      for (let segment = 0; segment < 12; segment++) {
        const startAngle = (segment / 12) * Math.PI * 2;
        const endAngle = startAngle + Math.PI / 8;
        
        for (let i = 0; i < 20; i++) {
          const angle = startAngle + (i / 20) * (endAngle - startAngle);
          pts.push(Math.cos(angle) * hudRadius, Math.sin(angle) * hudRadius, 0);
        }
      }
      
      return new Float32Array(pts);
    })(),
  },
];

function ParticleCloud({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<any>();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    const updateStep = isMobile ? 2 : 1; // Update every other particle on mobile for performance
    
    if (phase === "forming") {
      // Move particles toward target shape - balanced speed
      for (let i = 0; i < particleCount; i += updateStep) {
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
      const time = state.clock.elapsedTime;
      for (let i = 0; i < particleCount; i += updateStep) {
        const i3 = i * 3;
        positions[i3] += Math.sin(time * 0.6 + i) * 0.0012; // Moderate floating
        positions[i3 + 1] += Math.cos(time * 0.6 + i) * 0.0012;
      }
    } else if (phase === "bursting") {
      // Explode outward - moderate speed
      for (let i = 0; i < particleCount; i += updateStep) {
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
        color={isDark ? "#dccab0" : "#b38728"}
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={phase === "bursting" ? 0.4 : 0.8}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
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
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setWebglOk(detectWebGL());
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-background border-t border-border/20 overflow-hidden">
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
              / AI IN MOTION
            </div>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-serif leading-[0.9] tracking-tighter text-foreground mb-8">
              Future <span className="text-muted-foreground italic">Unleashed</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Witness the beauty of artificial intelligence and cutting-edge technology as particles dance through quantum circuits, neural networks, and blockchain architectures — the future of code visualized.
            </p>
          </motion.div>

          {/* Right: 3D Particle Animation */}
          <div className="w-full lg:w-1/2 h-[500px] relative">
            <div className="absolute inset-0">
              {webglOk && isInView ? (
                <WebGLBoundary fallback={null}>
                  <Canvas 
                    camera={{ position: [0, 0, 5], fov: 50 }} 
                    gl={{ 
                      antialias: false, 
                      powerPreference: "high-performance",
                      alpha: false,
                      stencil: false,
                      depth: true
                    }} 
                    dpr={isMobile ? 0.75 : 1}
                    frameloop="always"
                    performance={{ min: 0.5 }}
                  >
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <ParticleCloud isMobile={isMobile} />
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
