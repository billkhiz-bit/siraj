"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  narrators,
  narratorLinks,
  generationColours,
  type Narrator,
} from "@/lib/data/narrators";

const GENERATION_LAYERS: Record<string, number> = {
  prophet: 8,
  companion: 4,
  "tabi'i": 0,
  "tabi-tabi'i": -4,
};

function getNodePosition(narrator: Narrator, index: number, totalInGen: number): THREE.Vector3 {
  const y = GENERATION_LAYERS[narrator.generation];
  const angle = (index / totalInGen) * Math.PI * 2;
  const radius = narrator.generation === "prophet" ? 0 : 5 + totalInGen * 0.3;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    y,
    Math.sin(angle) * radius
  );
}

function NarratorNode({
  narrator,
  position,
  isHovered,
  onHover,
  onClick,
}: {
  narrator: Narrator;
  position: THREE.Vector3;
  isHovered: boolean;
  onHover: (n: Narrator | null) => void;
  onClick: (n: Narrator) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colour = new THREE.Color(generationColours[narrator.generation]);
  const baseSize = 0.15 + (narrator.hadithCount / 5374) * 0.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = position.y + Math.sin(t * 0.4 + position.x) * 0.08;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      isHovered ? 1.2 : 0.5,
      0.1
    );
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(narrator);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(narrator);
        }}
      >
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      {(isHovered || narrator.generation === "prophet") && (
        <Text
          position={[0, baseSize + 0.4, 0]}
          fontSize={0.35}
          color="#e2e8f0"
          anchorX="center"
          anchorY="bottom"
        >
          {narrator.name}
        </Text>
      )}
    </group>
  );
}

function NetworkEdge({
  start,
  end,
  hadithCount,
  isHighlighted,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  hadithCount: number;
  isHighlighted: boolean;
}) {
  const opacity = isHighlighted ? 0.7 : 0.15;
  const lineWidth = 0.5 + (hadithCount / 5374) * 2;

  const midPoint = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  midPoint.y += 0.8;

  return (
    <Line
      points={[start, midPoint, end]}
      color={isHighlighted ? "#f59e0b" : "#475569"}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
    />
  );
}

function Scene({
  hoveredNarrator,
  onHover,
  onClick,
}: {
  hoveredNarrator: Narrator | null;
  onHover: (n: Narrator | null) => void;
  onClick: (n: Narrator) => void;
}) {
  const positionMap = useMemo(() => {
    const map: Record<string, THREE.Vector3> = {};
    const byGeneration: Record<string, Narrator[]> = {};

    narrators.forEach((n) => {
      if (!byGeneration[n.generation]) byGeneration[n.generation] = [];
      byGeneration[n.generation].push(n);
    });

    Object.entries(byGeneration).forEach(([, group]) => {
      group.forEach((n, i) => {
        map[n.id] = getNodePosition(n, i, group.length);
      });
    });

    return map;
  }, []);

  const hoveredLinks = useMemo(() => {
    if (!hoveredNarrator) return new Set<number>();
    const set = new Set<number>();
    narratorLinks.forEach((link, i) => {
      if (link.source === hoveredNarrator.id || link.target === hoveredNarrator.id) {
        set.add(i);
      }
    });
    return set;
  }, [hoveredNarrator]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 15, 0]} intensity={1.5} color="#f59e0b" />
      <pointLight position={[8, 5, 8]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[-8, 5, -8]} intensity={0.8} color="#a78bfa" />

      {/* Edges */}
      {narratorLinks.map((link, i) => {
        const start = positionMap[link.source];
        const end = positionMap[link.target];
        if (!start || !end) return null;
        return (
          <NetworkEdge
            key={`${link.source}-${link.target}`}
            start={start}
            end={end}
            hadithCount={link.hadithCount}
            isHighlighted={hoveredLinks.has(i)}
          />
        );
      })}

      {/* Nodes */}
      {narrators.map((narrator) => (
        <NarratorNode
          key={narrator.id}
          narrator={narrator}
          position={positionMap[narrator.id]}
          isHovered={hoveredNarrator?.id === narrator.id}
          onHover={onHover}
          onClick={onClick}
        />
      ))}

      {/* Generation labels */}
      {Object.entries(GENERATION_LAYERS).map(([gen, y]) => (
        <Text
          key={gen}
          position={[-9, y, 0]}
          fontSize={0.4}
          color="#64748b"
          anchorX="right"
          anchorY="middle"
        >
          {gen === "tabi-tabi'i" ? "Tabi' al-Tabi'in" : gen.charAt(0).toUpperCase() + gen.slice(1) + (gen === "prophet" ? " ﷺ" : gen === "companion" ? "s" : gen === "tabi'i" ? "n" : "")}
        </Text>
      ))}

      <Stars radius={40} depth={30} count={800} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan
        minDistance={6}
        maxDistance={30}
        autoRotate
        autoRotateSpeed={0.2}
        target={[0, 2, 0]}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function IsnadNetwork3D() {
  const [hoveredNarrator, setHoveredNarrator] = useState<Narrator | null>(null);
  
  const [selectedNarrator, setSelectedNarrator] = useState<Narrator | null>(null);

  const displayNarrator = selectedNarrator || hoveredNarrator;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {Object.entries(generationColours).map(([gen, colour]) => (
            <span key={gen} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colour }}
              />
              {gen === "tabi-tabi'i" ? "Tabi' al-Tabi'in" : gen.charAt(0).toUpperCase() + gen.slice(1) + (gen === "companion" ? "s" : gen === "tabi'i" ? "n" : "")}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Click a node to read their story
        </p>
      </div>

      <div className="relative flex flex-col gap-4 md:flex-row">
        {/* 3D Canvas */}
        <div className={`relative overflow-hidden rounded-xl border border-border bg-[#0a0a1a] ${selectedNarrator ? "h-[350px] w-full md:h-[560px] md:w-2/3" : "h-[350px] w-full md:h-[560px]"}`}>
          <Canvas
            camera={{ position: [0, 6, 16], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor("#0a0a1a");
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
          >
            <Scene hoveredNarrator={displayNarrator} onHover={(n) => { setHoveredNarrator(n); }} onClick={setSelectedNarrator} />
          </Canvas>

          {/* Hover tooltip (only when no narrator is selected) */}
          {hoveredNarrator && !selectedNarrator && (
            <div
              className="pointer-events-auto absolute left-6 bottom-6 max-h-[45%] max-w-sm overflow-y-auto cursor-pointer rounded-lg border border-border bg-popover/90 px-5 py-4 shadow-xl backdrop-blur-sm"
              
              
            >
              <p className="font-mono text-xl font-bold text-foreground">
                {hoveredNarrator.nameArabic}
              </p>
              <p className="text-sm font-medium text-foreground">
                {hoveredNarrator.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {hoveredNarrator.description}
              </p>
              <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                <span
                  className="font-medium"
                  style={{ color: generationColours[hoveredNarrator.generation] }}
                >
                  {hoveredNarrator.generation}
                </span>
                {hoveredNarrator.hadithCount > 0 && (
                  <span>{hoveredNarrator.hadithCount.toLocaleString()} hadith narrated</span>
                )}
              </div>
              <p className="mt-1 text-[10px] text-amber-500/70">Click to read their story</p>
            </div>
          )}

          <div className="pointer-events-none absolute right-6 bottom-6 text-xs text-muted-foreground/50">
            Drag to orbit · Scroll to zoom · Click to read story
          </div>
        </div>

        {/* Biography panel */}
        {selectedNarrator && (
          <div className="h-[400px] w-full overflow-y-auto rounded-xl border border-border bg-card p-5 md:h-[560px] md:w-1/3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-2xl font-bold text-foreground" dir="rtl">
                  {selectedNarrator.nameArabic}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {selectedNarrator.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedNarrator(null)}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span
                className="rounded-md px-2 py-0.5 font-medium"
                style={{
                  color: generationColours[selectedNarrator.generation],
                  backgroundColor: generationColours[selectedNarrator.generation] + "15",
                }}
              >
                {selectedNarrator.generation}
              </span>
              {selectedNarrator.hadithCount > 0 && (
                <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                  {selectedNarrator.hadithCount.toLocaleString()} hadith
                </span>
              )}
              {selectedNarrator.deathYear && selectedNarrator.deathYear > 0 && (
                <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                  d. {selectedNarrator.deathYear} AH
                </span>
              )}
            </div>

            {/* Titles */}
            {selectedNarrator.titles && selectedNarrator.titles.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Titles</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedNarrator.titles.map((t) => (
                    <span key={t} className="rounded-md border border-amber-500/20 px-2 py-0.5 font-mono text-[11px] text-amber-500/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Biography */}
            {selectedNarrator.biography && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Biography</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedNarrator.biography}
                </p>
              </div>
            )}

            {/* Notable events */}
            {selectedNarrator.notableEvents && selectedNarrator.notableEvents.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Key Events</p>
                <ul className="mt-2 space-y-1.5">
                  {selectedNarrator.notableEvents.map((event) => (
                    <li key={event} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: generationColours[selectedNarrator.generation] }} />
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
