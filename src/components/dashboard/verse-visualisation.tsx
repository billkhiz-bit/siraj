"use client";

import { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Verse } from "@/lib/quran-api";
import type { Surah } from "@/lib/data/surahs";

const LONG_VERSE_COLOUR = new THREE.Color("#f59e0b");
const SHORT_VERSE_COLOUR = new THREE.Color("#34d399");

function VerseBar({
  verse,
  index,
  total,
  maxWords,
  isHovered,
  onHover,
  onClick,
}: {
  verse: Verse & { wordCount: number };
  index: number;
  total: number;
  maxWords: number;
  isHovered: boolean;
  onHover: (v: (Verse & { wordCount: number }) | null) => void;
  onClick: (v: (Verse & { wordCount: number })) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const height = (verse.wordCount / maxWords) * 8;

  // Colour gradient: short verses = green, long = amber
  const ratio = verse.wordCount / maxWords;
  const colour = new THREE.Color().lerpColors(SHORT_VERSE_COLOUR, LONG_VERSE_COLOUR, ratio);

  // Position in a line or arc depending on verse count
  const useArc = total > 30;
  let x: number, z: number;
  if (useArc) {
    const angle = (index / total) * Math.PI * 1.5 - Math.PI * 0.75;
    const radius = 12;
    x = Math.cos(angle) * radius;
    z = Math.sin(angle) * radius;
  } else {
    const spacing = Math.min(1.2, 30 / total);
    x = (index - total / 2) * spacing;
    z = 0;
  }

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(
      mat.emissiveIntensity,
      isHovered ? 0.8 : 0.35,
      0.12
    );
    const targetScale = isHovered ? 1.2 : 1;
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <group position={[x, 0, z]} rotation={useArc ? [0, -Math.atan2(z, x) + Math.PI / 2, 0] : [0, 0, 0]}>
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(verse);
          document.body.style.cursor = "pointer";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(verse);
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <boxGeometry args={[0.6, height, 0.6]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={isHovered ? 1 : 0.9}
        />
      </mesh>

      {/* Verse number */}
      {(isHovered || total <= 20) && (
        <Text
          position={[0, -0.4, 0.5]}
          fontSize={0.22}
          color="#94a3b8"
          anchorX="center"
        >
          {verse.verse_number}
        </Text>
      )}
    </group>
  );
}

function Scene({
  verses,
  hoveredVerse,
  onHover,
  onClick,
}: {
  verses: (Verse & { wordCount: number })[];
  hoveredVerse: (Verse & { wordCount: number }) | null;
  onHover: (v: (Verse & { wordCount: number }) | null) => void;
  onClick: (v: (Verse & { wordCount: number })) => void;
}) {
  const maxWords = Math.max(...verses.map((v) => v.wordCount), 1);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} />
      <pointLight position={[0, 12, 0]} intensity={1} color="#f59e0b" />
      <pointLight position={[-8, 5, 8]} intensity={0.6} color="#22d3ee" />

      <gridHelper args={[30, 30, "#1e293b", "#0f172a"]} position={[0, -0.01, 0]} />

      {verses.map((verse, i) => (
        <VerseBar
          key={verse.verse_key}
          verse={verse}
          index={i}
          total={verses.length}
          maxWords={maxWords}
          isHovered={hoveredVerse?.verse_key === verse.verse_key}
          onHover={onHover}
          onClick={onClick}
        />
      ))}

      <Stars radius={40} depth={30} count={600} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan
        minDistance={5}
        maxDistance={35}
        autoRotate={verses.length > 30}
        autoRotateSpeed={0.2}
        target={[0, 2, 0]}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.4} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function VerseVisualisation({
  verses,
  surah,
}: {
  verses: Verse[];
  surah: Surah;
}) {
  const [hoveredVerse, setHoveredVerse] = useState<(Verse & { wordCount: number }) | null>(null);
  const [pinnedVerse, setPinnedVerse] = useState<(Verse & { wordCount: number }) | null>(null);
  const displayVerse = pinnedVerse || hoveredVerse;

  const enrichedVerses = useMemo(
    () =>
      verses.map((v) => ({
        ...v,
        wordCount: v.text_uthmani.trim().split(/\s+/).length,
      })),
    [verses]
  );

  const stats = useMemo(() => {
    const words = enrichedVerses.map((v) => v.wordCount);
    const totalWords = words.reduce((a, b) => a + b, 0);
    const longest = enrichedVerses.reduce((a, b) => (a.wordCount > b.wordCount ? a : b));
    const shortest = enrichedVerses.reduce((a, b) => (a.wordCount < b.wordCount ? a : b));
    return { totalWords, avgWords: Math.round(totalWords / words.length), longest, shortest };
  }, [enrichedVerses]);

  return (
    <div className="flex flex-col gap-4">
      {/* Stats row */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>{surah.ayatCount} ayat</span>
        <span>{stats.totalWords.toLocaleString()} words</span>
        <span>Avg {stats.avgWords} words/ayah</span>
        <span>Longest: Ayah {stats.longest.verse_number} ({stats.longest.wordCount} words)</span>
        <span>Shortest: Ayah {stats.shortest.verse_number} ({stats.shortest.wordCount} words)</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-sm bg-emerald-400" /> Short
          <span className="inline-block h-2 w-2 rounded-sm bg-amber-500 ml-2" /> Long
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[280px] w-full overflow-hidden rounded-xl border border-border bg-[#0a0a1a] md:h-[420px]">
        <Canvas
          camera={{ position: [0, 8, 16], fov: 55 }}
          gl={{ antialias: true, alpha: false }}
          onPointerMissed={() => setPinnedVerse(null)}
          onCreated={({ gl }) => {
            gl.setClearColor("#0a0a1a");
            gl.toneMapping = THREE.ACESFilmicToneMapping;
          }}
        >
          <Scene
            verses={enrichedVerses}
            hoveredVerse={hoveredVerse}
            onHover={setHoveredVerse}
            onClick={setPinnedVerse}
          />
        </Canvas>

        {displayVerse && (
          <div
            className="pointer-events-auto absolute left-6 bottom-6 max-h-[55%] max-w-lg overflow-y-auto rounded-lg border border-border bg-popover/95 px-5 py-4 shadow-xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Ayah {displayVerse.verse_number} · {displayVerse.wordCount} words · Juz {displayVerse.juz_number} · Page {displayVerse.page_number}
              </p>
              {pinnedVerse && (
                <button
                  onClick={() => setPinnedVerse(null)}
                  className="shrink-0 text-[10px] text-muted-foreground hover:text-foreground"
                >
                  Unpin
                </button>
              )}
            </div>
            <p className="mt-2 text-right font-mono text-lg leading-loose text-foreground" dir="rtl">
              {displayVerse.text_uthmani}
            </p>
            {displayVerse.translation && (
              <p className="mt-1 text-sm text-foreground/80">
                {displayVerse.translation}
              </p>
            )}
            {!pinnedVerse && (
              <p className="mt-2 text-[10px] text-amber-500/70">Click a bar to pin</p>
            )}
          </div>
        )}

        <div className="pointer-events-none absolute right-6 bottom-6 text-xs text-muted-foreground/50">
          Drag to orbit · Scroll to zoom · Hover for text
        </div>
      </div>
    </div>
  );
}
