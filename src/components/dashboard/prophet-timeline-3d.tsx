"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { prophets, type Prophet } from "@/lib/data/prophets";

const TIMELINE_LENGTH = 50;
const ULU_AL_AZM_COLOUR = new THREE.Color("#f59e0b");
const REGULAR_COLOUR = new THREE.Color("#22d3ee");

function getProphetPosition(prophet: Prophet): THREE.Vector3 {
  const x = ((prophet.era - 1) / 23) * TIMELINE_LENGTH - TIMELINE_LENGTH / 2;
  const z = (prophet.era % 2 === 0 ? 1 : -1) * (1 + Math.random() * 0.5);
  return new THREE.Vector3(x, 0, z);
}

function ProphetNode({
  prophet,
  position,
  isHovered,
  onHover,
  onClick,
}: {
  prophet: Prophet;
  position: THREE.Vector3;
  isHovered: boolean;
  onHover: (p: Prophet | null) => void;
  onClick: (p: Prophet) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const colour = prophet.isUlulAzm ? ULU_AL_AZM_COLOUR : REGULAR_COLOUR;
  const baseSize = 0.2 + (prophet.mentionCount / 136) * 0.6;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y =
      position.y + Math.sin(t * 0.6 + position.x * 0.2) * 0.12;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Pillar from ground */}
      <mesh position={[0, -position.y / 2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, Math.abs(position.y) || 0.01, 8]} />
        <meshStandardMaterial color="#334155" transparent opacity={0.3} />
      </mesh>

      {/* Sphere node */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(prophet);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(prophet);
        }}
      >
        <sphereGeometry args={[baseSize, 24, 24]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={isHovered ? 1 : 0.4}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={isHovered ? 1 : 0.9}
        />
      </mesh>

      {/* Ring for Ulu al-Azm */}
      {prophet.isUlulAzm && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[baseSize + 0.15, 0.03, 8, 32]} />
          <meshStandardMaterial
            color={ULU_AL_AZM_COLOUR}
            emissive={ULU_AL_AZM_COLOUR}
            emissiveIntensity={0.8}
          />
        </mesh>
      )}

      {/* Name label */}
      <Text
        position={[0, baseSize + 0.35, 0]}
        fontSize={isHovered ? 0.4 : 0.28}
        color={isHovered ? "#ffffff" : "#94a3b8"}
        anchorX="center"
        anchorY="bottom"
      >
        {prophet.name}
      </Text>

      {/* Mention count */}
      {isHovered && (
        <Text
          position={[0, -(baseSize + 0.3), 0]}
          fontSize={0.2}
          color="#64748b"
          anchorX="center"
          anchorY="top"
        >
          {prophet.mentionCount} mentions
        </Text>
      )}
    </group>
  );
}

function TimelineAxis() {
  const points: THREE.Vector3[] = [
    new THREE.Vector3(-TIMELINE_LENGTH / 2 - 1, 0, 0),
    new THREE.Vector3(TIMELINE_LENGTH / 2 + 1, 0, 0),
  ];

  return (
    <>
      <Line
        points={points}
        color="#334155"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />
      {/* Start label */}
      <Text
        position={[-TIMELINE_LENGTH / 2 - 2, 0, 0]}
        fontSize={0.35}
        color="#64748b"
        anchorX="right"
        anchorY="middle"
      >
        Earliest
      </Text>
      {/* End label */}
      <Text
        position={[TIMELINE_LENGTH / 2 + 2, 0, 0]}
        fontSize={0.35}
        color="#64748b"
        anchorX="left"
        anchorY="middle"
      >
        Latest
      </Text>
    </>
  );
}

function Scene({
  hoveredProphet,
  onHover,
  onClick,
}: {
  hoveredProphet: Prophet | null;
  onHover: (p: Prophet | null) => void;
  onClick: (p: Prophet) => void;
}) {
  const positions = prophets.map((p) => getProphetPosition(p));

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 5]} intensity={1.5} />
      <pointLight position={[0, 10, 0]} intensity={1} color="#f59e0b" />
      <pointLight position={[-15, 5, 5]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[15, 5, -5]} intensity={0.6} color="#a78bfa" />

      <TimelineAxis />

      {prophets.map((prophet, i) => (
        <ProphetNode
          key={prophet.id}
          prophet={prophet}
          position={positions[i]}
          isHovered={hoveredProphet?.id === prophet.id}
          onHover={onHover}
          onClick={onClick}
        />
      ))}

      <Stars radius={50} depth={40} count={1000} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan
        minDistance={5}
        maxDistance={50}
        autoRotate={false}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 1.8}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function ProphetTimeline3D() {
  const [hoveredProphet, setHoveredProphet] = useState<Prophet | null>(null);
  
  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);

  const displayProphet = selectedProphet || hoveredProphet;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
            Ulu al-Azm (Resolute Messengers)
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400" />
            Prophets &amp; Messengers
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Click a prophet to read their story
        </p>
      </div>

      <div className="relative flex flex-col gap-4 md:flex-row">
        <div className={`relative overflow-hidden rounded-xl border border-border bg-[#0a0a1a] ${selectedProphet ? "h-[350px] w-full md:h-[560px] md:w-2/3" : "h-[350px] w-full md:h-[560px]"}`}>
          <Canvas
            camera={{ position: [0, 8, 20], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor("#0a0a1a");
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
          >
            <Scene hoveredProphet={displayProphet} onHover={setHoveredProphet} onClick={setSelectedProphet} />
          </Canvas>

          {hoveredProphet && !selectedProphet && (
            <div
              className="pointer-events-auto absolute left-6 bottom-6 max-h-[45%] max-w-sm overflow-y-auto rounded-lg border border-border bg-popover/90 px-5 py-4 shadow-xl backdrop-blur-sm"
              
              
            >
              <p className="font-mono text-xl font-bold text-foreground">
                {hoveredProphet.nameArabic}
              </p>
              <p className="text-sm font-medium text-foreground">
                {hoveredProphet.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {hoveredProphet.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="font-medium" style={{ color: hoveredProphet.isUlulAzm ? "#f59e0b" : "#22d3ee" }}>
                  {hoveredProphet.mentionCount} mentions
                </span>
                {hoveredProphet.isUlulAzm && (
                  <span className="text-amber-500">Ulu al-Azm</span>
                )}
              </div>
              <p className="mt-1 text-[10px] text-amber-500/70">Click to read their story</p>
            </div>
          )}

          <div className="pointer-events-none absolute right-6 bottom-6 text-xs text-muted-foreground/50">
            Drag to pan · Scroll to zoom · Click for story
          </div>
        </div>

        {/* Biography panel */}
        {selectedProphet && (
          <div className="h-[400px] w-full overflow-y-auto rounded-xl border border-border bg-card p-5 md:h-[560px] md:w-1/3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-2xl font-bold text-foreground" dir="rtl">
                  {selectedProphet.nameArabic}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {selectedProphet.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedProphet(null)}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span
                className="rounded-md px-2 py-0.5 font-medium"
                style={{
                  color: selectedProphet.isUlulAzm ? "#f59e0b" : "#22d3ee",
                  backgroundColor: (selectedProphet.isUlulAzm ? "#f59e0b" : "#22d3ee") + "15",
                }}
              >
                {selectedProphet.isUlulAzm ? "Ulu al-Azm" : "Prophet"}
              </span>
              <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                {selectedProphet.mentionCount} mentions
              </span>
              <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                Surahs: {selectedProphet.surahs.join(", ")}
              </span>
            </div>

            {selectedProphet.biography && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Story</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedProphet.biography}
                </p>
              </div>
            )}

            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Key Events</p>
              <ul className="mt-2 space-y-1.5">
                {selectedProphet.keyEvents.map((event) => (
                  <li key={event} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: selectedProphet.isUlulAzm ? "#f59e0b" : "#22d3ee" }} />
                    {event}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Referenced In</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedProphet.surahs.map((s) => (
                  <a
                    key={s}
                    href={`/surah/${s}`}
                    className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Surah {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
