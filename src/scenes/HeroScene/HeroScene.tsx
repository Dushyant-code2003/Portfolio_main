import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Group } from "three";
import { useDeviceCapabilities } from "../../hooks/useDeviceCapabilities";

function FloatingCore({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.15 + mouse.current.x * 0.4;
    group.current.rotation.x = mouse.current.y * 0.25;
    group.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.2, 1]} />
          <MeshDistortMaterial
            color="#ff6b4a"
            emissive="#ff6b4a"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.35}
            speed={2}
          />
        </mesh>
      </Float>
      <mesh position={[2.2, 0.5, -1]}>
        <torusGeometry args={[0.4, 0.08, 16, 48]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.8, -0.3, 0.5]}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#e8e4dc" wireframe />
      </mesh>
    </group>
  );
}

function CodeFragments({ count }: { count: number }) {
  const fragments = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.5,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, [count]);

  return (
    <>
      {fragments.map((f) => (
        <FloatingFragment key={`${f.position.join("-")}-${f.speed}`} {...f} />
      ))}
    </>
  );
}

function FloatingFragment({
  position,
  speed,
  scale,
}: {
  position: [number, number, number];
  speed: number;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.7;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#8a8680" transparent opacity={0.6} />
    </mesh>
  );
}

function SceneContent({
  mouse,
  particleCount,
  enablePost,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  particleCount: number;
  enablePost: boolean;
}) {
  useFrame((state) => {
    state.camera.position.x = mouse.current.x * 0.6;
    state.camera.position.y = mouse.current.y * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#040406"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ff6b4a" />
      <pointLight position={[-4, -2, 3]} intensity={0.6} color="#2dd4bf" />
      <Stars radius={80} depth={40} count={particleCount} factor={3} fade speed={0.5} />
      <Sparkles count={Math.floor(particleCount / 2)} scale={8} size={2} speed={0.3} opacity={0.4} />
      <FloatingCore mouse={mouse} />
      <CodeFragments count={Math.min(20, Math.floor(particleCount / 15))} />
      {enablePost && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.4} intensity={0.8} />
          <Vignette offset={0.3} darkness={0.7} />
        </EffectComposer>
      )}
    </>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const { tier, isMobile, reducedMotion } = useDeviceCapabilities();

  const particleCount = tier === "high" ? 3000 : tier === "medium" ? 1500 : 600;
  const enablePost = tier === "high" && !isMobile && !reducedMotion;

  const onPointerMove = (e: React.PointerEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  if (isMobile || reducedMotion) {
    return <div className="hero__mobile-fallback" aria-hidden />;
  }

  return (
    <div className="hero__canvas" onPointerMove={onPointerMove}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={tier === "high" ? [1, 2] : [1, 1.5]}
        gl={{ antialias: tier !== "low", alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} particleCount={particleCount} enablePost={enablePost} />
        </Suspense>
      </Canvas>
    </div>
  );
}
