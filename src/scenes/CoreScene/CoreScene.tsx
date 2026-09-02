import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Group } from "three";
import { coreNodes, type CoreNodeId } from "../../data/skills";

const NODE_INFO: Record<
  CoreNodeId,
  { title: string; description: string; tags: string[]; envColor: string }
> = {
  code: {
    title: "CODE",
    description:
      "The foundation — writing clean, maintainable software across Java, Python, C++, and TypeScript.",
    tags: ["Java", "Python", "C++", "TypeScript", "OOP"],
    envColor: "#ff6b4a",
  },
  ai: {
    title: "AI",
    description:
      "Machine learning, computer vision, RAG pipelines, and intelligent systems that solve real problems.",
    tags: ["TensorFlow", "OpenCV", "FAISS", "QLoRA", "Scikit-learn"],
    envColor: "#7c9cff",
  },
  web: {
    title: "WEB",
    description:
      "Full-stack web experiences — React frontends, REST APIs, and responsive interfaces.",
    tags: ["React", "JavaScript", "Node.js", "FastAPI", "HTML/CSS"],
    envColor: "#4ade80",
  },
  systems: {
    title: "SYSTEMS",
    description:
      "Desktop applications, database design, and offline-first systems built for reliability.",
    tags: ["JavaFX", "MySQL", "Maven", "CRUD", "Authentication"],
    envColor: "#fbbf24",
  },
  problem: {
    title: "PROBLEM SOLVING",
    description:
      "Breaking complex challenges into solvable pieces — algorithms, optimization, and debugging.",
    tags: ["A* Search", "Data Structures", "Optimization", "Debugging"],
    envColor: "#f472b6",
  },
  design: {
    title: "DESIGN",
    description:
      "Crafting interfaces people want to use — Figma prototypes, CSS systems, and UX thinking.",
    tags: ["Figma", "CSS", "UX", "Responsive Design"],
    envColor: "#a78bfa",
  },
  learning: {
    title: "LEARNING",
    description:
      "Continuous growth — Oracle OCI certification, new frameworks, and always shipping the next experiment.",
    tags: ["Oracle OCI", "Certifications", "Open Source", "Experimentation"],
    envColor: "#2dd4bf",
  },
};

function CoreOrb({
  activeNode,
  mouse,
}: {
  activeNode: CoreNodeId;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<Group>(null);
  const envColor = NODE_INFO[activeNode].envColor;

  const nodePositions = useMemo(() => {
    const radius = 2.2;
    return coreNodes.map((n) => {
      const rad = (n.angle * Math.PI) / 180;
      return {
        id: n.id,
        pos: [Math.cos(rad) * radius, Math.sin(rad) * radius, 0] as [number, number, number],
        color: n.color,
        label: n.label,
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.1 + mouse.current.x * 0.3;
    group.current.rotation.x = mouse.current.y * 0.2;
  });

  return (
    <group ref={group}>
      <color attach="background" args={["#040406"]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 4]} intensity={1.5} color={envColor} />
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={envColor}
          emissive={envColor}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      {nodePositions.map((node) => {
        const isActive = node.id === activeNode;
        const toCenter: [number, number, number] = [
          -node.pos[0],
          -node.pos[1],
          -node.pos[2],
        ];
        return (
          <group key={node.id} position={node.pos}>
            <mesh scale={isActive ? 1.4 : 1}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isActive ? 0.8 : 0.2}
              />
            </mesh>
            <Line
              points={[[0, 0, 0], toCenter]}
              color={isActive ? node.color : "#333"}
              lineWidth={isActive ? 2 : 0.5}
              transparent
              opacity={isActive ? 0.8 : 0.2}
            />
          </group>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 64]} />
        <meshBasicMaterial color="#333" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function CoreScene({
  activeNode,
  mouse,
}: {
  activeNode: CoreNodeId;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <CoreOrb activeNode={activeNode} mouse={mouse} />
    </>
  );
}

interface CoreCanvasProps {
  activeNode: CoreNodeId;
}

export function CoreCanvas({ activeNode }: CoreCanvasProps) {
  const mouse = useRef({ x: 0, y: 0 });

  const onPointerMove = (e: React.PointerEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div className="developer-core__canvas-wrap" onPointerMove={onPointerMove}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <CoreScene activeNode={activeNode} mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export { NODE_INFO };
