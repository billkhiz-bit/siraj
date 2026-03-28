"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Billboard } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { namesOfAllah, categoryColours, type NameOfAllah } from "@/lib/data/names-of-allah";

type FilterMode = "all" | "beauty" | "majesty" | "perfection";

const SPHERE_RADIUS = 9;

function fibSphere(index: number, total: number, radius: number): THREE.Vector3 {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const rAtY = Math.sqrt(1 - y * y);
  const theta = golden * index;
  return new THREE.Vector3(
    Math.cos(theta) * rAtY * radius,
    y * radius,
    Math.sin(theta) * rAtY * radius
  );
}

function NameNode({
  name,
  position,
  isHovered,
  onHover,
}: {
  name: NameOfAllah;
  position: THREE.Vector3;
  isHovered: boolean;
  onHover: (n: NameOfAllah | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const colour = new THREE.Color(categoryColours[name.category].colour);
  const size = isHovered ? 0.55 : 0.38;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y =
      position.y + Math.sin(t * 0.4 + name.number * 0.3) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(name);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "auto";
      }}
    >
      <Billboard>
        <Text
          fontSize={size}
          anchorX="center"
          anchorY="middle"
          outlineWidth={isHovered ? 0.02 : 0}
          outlineColor="#000000"
        >
          {name.arabic}
          <meshStandardMaterial
            color={colour}
            emissive={colour}
            emissiveIntensity={isHovered ? 1.2 : 0.5}
            transparent
            opacity={isHovered ? 1 : 0.85}
          />
        </Text>
      </Billboard>
    </group>
  );
}

function CentreAllah() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.4}
          transparent
          opacity={0.06}
          roughness={1}
        />
      </mesh>

      {/* Allah in Arabic */}
      <Billboard>
        <Text
          fontSize={1.8}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
        >
          الله
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.8}
          />
        </Text>
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.35}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          Allah
        </Text>
      </Billboard>
    </group>
  );
}

function Scene({
  filter,
  hoveredName,
  onHover,
}: {
  filter: FilterMode;
  hoveredName: NameOfAllah | null;
  onHover: (n: NameOfAllah | null) => void;
}) {
  const filtered = useMemo(() => {
    if (filter === "all") return namesOfAllah;
    return namesOfAllah.filter((n) => n.category === filter);
  }, [filter]);

  const positions = useMemo(
    () => filtered.map((_, i) => fibSphere(i, filtered.length, SPHERE_RADIUS)),
    [filtered]
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#f59e0b" distance={20} />
      <pointLight position={[10, 8, 10]} intensity={0.8} color="#22d3ee" distance={25} />
      <pointLight position={[-10, 8, -10]} intensity={0.8} color="#a78bfa" distance={25} />

      <CentreAllah />

      {filtered.map((name, i) => (
        <NameNode
          key={name.number}
          name={name}
          position={positions[i]}
          isHovered={hoveredName?.number === name.number}
          onHover={onHover}
        />
      ))}

      <Stars radius={70} depth={50} count={2500} factor={3} fade speed={0.2} />

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.15}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} intensity={0.7} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function Names3D() {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [hoveredName, setHoveredName] = useState<NameOfAllah | null>(null);

  const counts = useMemo(() => ({
    all: namesOfAllah.length,
    beauty: namesOfAllah.filter((n) => n.category === "beauty").length,
    majesty: namesOfAllah.filter((n) => n.category === "majesty").length,
    perfection: namesOfAllah.filter((n) => n.category === "perfection").length,
  }), []);

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-xl bg-[#030308]">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#030308");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.3;
        }}
      >
        <Scene filter={filter} hoveredName={hoveredName} onHover={setHoveredName} />
      </Canvas>

      {/* Top-left: Title */}
      <div className="pointer-events-none absolute left-5 top-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          Asma al-Husna
        </p>
      </div>

      {/* Left panel */}
      <div className="pointer-events-none absolute left-3 top-3 w-40 space-y-4 md:left-5 md:top-12 md:w-52">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
            ☽ The 99 Names of Allah
          </p>
          <p className="mt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
            &ldquo;And to Allah belong the most beautiful names, so invoke Him by them&rdquo; (Qur&apos;an 7:180)
          </p>
        </div>

        <div className="space-y-1 font-mono text-[11px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Names</span>
            <span className="text-foreground">99</span>
          </div>
          {Object.entries(categoryColours).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground">{val.label}</span>
              <span style={{ color: val.colour }}>
                {counts[key as keyof typeof counts]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Filter */}
      <div className="pointer-events-auto absolute right-5 top-12 w-48">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          ◉ Filter
        </p>
        <div className="space-y-1">
          {(["all", "beauty", "majesty", "perfection"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-[11px] transition-colors ${
                filter === key ? "bg-white/5 text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  backgroundColor: key === "all" ? "#f59e0b" : categoryColours[key].colour,
                  boxShadow: filter === key ? `0 0 6px ${key === "all" ? "#f59e0b" : categoryColours[key].colour}` : "none",
                }}
              />
              {key === "all" ? `All (${counts.all})` : `${categoryColours[key].label} (${counts[key]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Hovered name */}
      {hoveredName && (
        <div className="pointer-events-none absolute bottom-5 left-5 rounded border border-white/10 bg-black/90 px-5 py-4 backdrop-blur-sm">
          <p className="font-mono text-2xl font-bold text-foreground" dir="rtl">
            {hoveredName.arabic}
          </p>
          <p className="font-mono text-sm text-foreground">
            {hoveredName.transliteration}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            &ldquo;{hoveredName.meaning}&rdquo;
          </p>
          <div className="mt-2 flex gap-3 font-mono text-[10px] text-muted-foreground">
            <span style={{ color: categoryColours[hoveredName.category].colour }}>
              {categoryColours[hoveredName.category].label}
            </span>
            <span>#{hoveredName.number} of 99</span>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[10px] text-muted-foreground/40">
        DRAG TO ORBIT · SCROLL TO ZOOM
      </div>
    </div>
  );
}
