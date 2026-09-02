import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { techNodes, type TechNode } from "../../data/skills";
import { useDeviceCapabilities } from "../../hooks/useDeviceCapabilities";
import { useAppContext } from "../../context/AppContext";
import "../TechUniverse/TechUniverse.css";

function ConstellationNode({
  node,
  isHovered,
  onHover,
}: {
  node: TechNode;
  isHovered: boolean;
  onHover: (n: TechNode | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = isHovered ? 1.5 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    meshRef.current.position.y = node.y + Math.sin(state.clock.elapsedTime + node.x) * 0.05;
  });

  const colors: Record<string, string> = {
    language: "#ff6b4a",
    framework: "#7c9cff",
    tool: "#2dd4bf",
    concept: "#fbbf24",
  };

  return (
    <group position={[node.x, node.y, 0]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => onHover(node)}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={colors[node.category]}
          emissive={colors[node.category]}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
        />
      </mesh>
      {isHovered && (
        <Text
          position={[0, 0.35, 0]}
          fontSize={0.12}
          color="#e8e4dc"
          anchorX="center"
        >
          {node.label}
        </Text>
      )}
    </group>
  );
}

function ConstellationScene({
  hoveredId,
  onHover,
}: {
  hoveredId: string | null;
  onHover: (n: TechNode | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const connections = useMemo(() => {
    const lines: { from: TechNode; to: TechNode }[] = [];
    techNodes.forEach((node) => {
      node.related.forEach((relId) => {
        const target = techNodes.find((t) => t.id === relId);
        if (target) lines.push({ from: node, to: target });
      });
    });
    return lines;
  }, []);

  return (
    <group ref={groupRef}>
      <color attach="background" args={["#040406"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={1} />
      {connections.map(({ from, to }, i) => (
        <Line
          key={`${from.id}-${to.id}-${i}`}
          points={[
            [from.x, from.y, 0],
            [to.x, to.y, 0],
          ]}
          color="#333"
          lineWidth={0.5}
          transparent
          opacity={0.4}
        />
      ))}
      {techNodes.map((node) => (
        <ConstellationNode
          key={node.id}
          node={node}
          isHovered={hoveredId === node.id}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

export default function TechUniverse() {
  const [hovered, setHovered] = useState<TechNode | null>(null);
  const { setMode } = useAppContext();
  const { isMobile } = useDeviceCapabilities();

  const handleHover = (node: TechNode | null) => {
    setHovered(node);
    setMode(node ? "explore" : "default");
  };

  return (
    <section id="stack" className="tech-universe section" aria-label="Technology constellation">
      <p className="section-label">CHAPTER 06 — TECH STACK AS A UNIVERSE</p>
      <h2 className="section-title">
        Tech<br />Constellation
      </h2>

      {!isMobile && (
        <div className="tech-universe__canvas">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <ConstellationScene
                hoveredId={hovered?.id ?? null}
                onHover={handleHover}
              />
            </Suspense>
          </Canvas>
          <div className="tech-universe__tooltip">
            {hovered ? (
              <>
                <p className="tech-universe__tooltip-label">TECHNOLOGY</p>
                <p className="tech-universe__tooltip-name">{hovered.label}</p>
                <p className="tech-universe__tooltip-level">
                  EXPERIENCE: {hovered.level}%
                </p>
                <p className="tech-universe__tooltip-related">
                  Related: {hovered.related.join(", ")}
                </p>
              </>
            ) : (
              <p className="tech-universe__tooltip-related">
                Hover a node to explore connections
              </p>
            )}
          </div>
        </div>
      )}

      <div className="tech-universe__list">
        {techNodes.map((node) => (
          <span key={node.id} className="tech-universe__chip">
            {node.label} · {node.level}%
          </span>
        ))}
      </div>
    </section>
  );
}
