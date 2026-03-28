"use client";

import { useState, useRef, useCallback } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Text, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import {
  collections,
  topicCategoryColours,
  type HadithCollection,
} from "@/lib/data/hadith-collections";

const COLLECTION_COLOURS: Record<string, string> = {
  bukhari: "#f59e0b",
  muslim: "#22d3ee",
  tirmidhi: "#a78bfa",
  "abu-dawud": "#34d399",
  nasai: "#f87171",
  "ibn-majah": "#60a5fa",
};

const COLLECTION_API_IDS: Record<string, string> = {
  bukhari: "eng-bukhari",
  muslim: "eng-muslim",
  tirmidhi: "eng-tirmidhi",
  "abu-dawud": "eng-abudawud",
  nasai: "eng-nasai",
  "ibn-majah": "eng-ibnmajah",
};

interface SampleHadith {
  number: number;
  text: string;
}

function CollectionTower({
  collection,
  index,
  isSelected,
  isHovered,
  onHover,
  onClick,
}: {
  collection: HadithCollection;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (c: HadithCollection | null) => void;
  onClick: (c: HadithCollection) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const colour = new THREE.Color(COLLECTION_COLOURS[collection.id]);
  const height = (collection.totalHadith / 7563) * 8;
  const authHeight = (collection.authenticHadith / 7563) * 8;
  const spacing = 3.5;
  const x = (index - (collections.length - 1) / 2) * spacing;
  const active = isHovered || isSelected;

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = active ? 1.08 : 1;
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={[x, 0, 0]}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(collection);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(collection);
      }}
    >
      {/* Total hadith tower (translucent) */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[1.8, height, 1.8]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={active ? 0.5 : 0.2}
          transparent
          opacity={0.35}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Authentic hadith tower (solid) */}
      <mesh position={[0, authHeight / 2, 0]}>
        <boxGeometry args={[1.2, authHeight, 1.2]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={active ? 0.7 : 0.4}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Collection name */}
      <Text
        position={[0, -0.5, 1.2]}
        fontSize={0.3}
        color={active ? "#ffffff" : "#94a3b8"}
        anchorX="center"
        anchorY="top"
        rotation={[-0.3, 0, 0]}
      >
        {collection.name.replace("Sahih ", "").replace("Sunan ", "").replace("Jami' ", "")}
      </Text>

      {/* Count on top */}
      <Text position={[0, height + 0.3, 0]} fontSize={0.25} color="#e2e8f0" anchorX="center" anchorY="bottom">
        {collection.totalHadith.toLocaleString()}
      </Text>
    </group>
  );
}

function Scene({
  selectedCollection,
  hoveredCollection,
  onHover,
  onSelect,
}: {
  selectedCollection: HadithCollection | null;
  hoveredCollection: HadithCollection | null;
  onHover: (c: HadithCollection | null) => void;
  onSelect: (c: HadithCollection) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} />
      <pointLight position={[0, 12, 0]} intensity={1} color="#f59e0b" />
      <pointLight position={[-8, 5, 8]} intensity={0.6} color="#22d3ee" />
      <pointLight position={[8, 5, -8]} intensity={0.6} color="#a78bfa" />

      <gridHelper args={[30, 30, "#1e293b", "#0f172a"]} position={[0, -0.01, 0]} />

      {collections.map((col, i) => (
        <CollectionTower
          key={col.id}
          collection={col}
          index={i}
          isSelected={selectedCollection?.id === col.id}
          isHovered={hoveredCollection?.id === col.id}
          onHover={onHover}
          onClick={onSelect}
        />
      ))}

      <Stars radius={40} depth={30} count={800} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan
        minDistance={8}
        maxDistance={35}
        autoRotate={!selectedCollection}
        autoRotateSpeed={0.3}
        target={[0, 3, 0]}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.4} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function HadithExplorer3D() {
  const [selectedCollection, setSelectedCollection] = useState<HadithCollection | null>(null);
  const [hoveredCollection, setHoveredCollection] = useState<HadithCollection | null>(null);
  
  const [sampleHadiths, setSampleHadiths] = useState<SampleHadith[]>([]);
  const [loadingHadiths, setLoadingHadiths] = useState(false);
  const displayCollection = hoveredCollection || selectedCollection;

  const handleSelect = useCallback(async (col: HadithCollection) => {
    const toggling = selectedCollection?.id === col.id;
    setSelectedCollection(toggling ? null : col);
    if (toggling) {
      setSampleHadiths([]);
      return;
    }

    // Fetch sample hadiths from free API
    const apiId = COLLECTION_API_IDS[col.id];
    if (!apiId) return;

    setLoadingHadiths(true);
    try {
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${apiId}/1.min.json`
      );
      const data = await res.json();
      const hadiths: SampleHadith[] = (data.hadiths || [])
        .slice(0, 10)
        .map((h: { hadithnumber: number; text: string }) => ({
          number: h.hadithnumber,
          text: h.text,
        }));
      setSampleHadiths(hadiths);
    } catch {
      setSampleHadiths([]);
    }
    setLoadingHadiths(false);
  }, [selectedCollection]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => handleSelect(col)}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors ${
                selectedCollection?.id === col.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: COLLECTION_COLOURS[col.id] }}
              />
              {col.name.replace("Sahih ", "").replace("Sunan ", "").replace("Jami' ", "")}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Click a collection to explore
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* 3D Canvas */}
        <div className={`relative overflow-hidden rounded-xl border border-border bg-[#0a0a1a] ${selectedCollection ? "h-[350px] w-full md:h-[560px] md:w-1/2" : "h-[350px] w-full md:h-[560px]"}`}>
          <Canvas
            camera={{ position: [0, 8, 16], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor("#0a0a1a");
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
          >
            <Scene
              selectedCollection={selectedCollection}
              hoveredCollection={hoveredCollection}
              onHover={(c) => { setHoveredCollection(c); }}
              onSelect={handleSelect}
            />
          </Canvas>

          {displayCollection && !selectedCollection && (
            <div
              className="pointer-events-auto absolute left-6 bottom-6 max-h-[45%] max-w-sm overflow-y-auto rounded-lg border border-border bg-popover/90 px-5 py-4 shadow-xl backdrop-blur-sm"
              
              
            >
              <p className="font-mono text-xl font-bold text-foreground">
                {displayCollection.nameArabic}
              </p>
              <p className="text-sm font-medium text-foreground">
                {displayCollection.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {displayCollection.compiler} (d. {displayCollection.deathYear} AH)
              </p>
              <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                <span>{displayCollection.totalHadith.toLocaleString()} total</span>
                <span>{displayCollection.authenticHadith.toLocaleString()} authentic</span>
              </div>
              <p className="mt-1 text-[10px] text-amber-500/70">Click to explore topics and hadiths</p>
            </div>
          )}

          <div className="pointer-events-none absolute right-6 bottom-6 text-xs text-muted-foreground/50">
            Drag to orbit · Click tower to explore
          </div>
        </div>

        {/* Detail panel */}
        {selectedCollection && (
          <div className="h-[400px] w-full overflow-y-auto rounded-xl border border-border bg-card p-5 md:h-[560px] md:w-1/2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-2xl font-bold text-foreground" dir="rtl">
                  {selectedCollection.nameArabic}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {selectedCollection.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedCollection.compiler} (d. {selectedCollection.deathYear} AH)
                </p>
              </div>
              <button
                onClick={() => { setSelectedCollection(null); setSampleHadiths([]); }}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="mt-3 flex gap-3 text-xs">
              <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                {selectedCollection.totalHadith.toLocaleString()} total
              </span>
              <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                {selectedCollection.authenticHadith.toLocaleString()} authentic
              </span>
              <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">
                {Math.round((selectedCollection.authenticHadith / selectedCollection.totalHadith) * 100)}% auth rate
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {selectedCollection.description}
            </p>

            {/* Topic breakdown */}
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
                Topic Breakdown
              </p>
              <div className="mt-2 space-y-1.5">
                {[...selectedCollection.topics]
                  .sort((a, b) => b.hadithCount - a.hadithCount)
                  .map((topic) => {
                    const width = (topic.hadithCount / selectedCollection.topics[0].hadithCount) * 100;
                    return (
                      <div key={topic.name} className="flex items-center gap-2">
                        <span className="w-28 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                          {topic.name}
                        </span>
                        <div className="flex-1">
                          <div
                            className="h-4 rounded-sm"
                            style={{
                              width: `${Math.max(width, 3)}%`,
                              backgroundColor: topicCategoryColours[topic.category] || "#64748b",
                              opacity: 0.7,
                            }}
                          />
                        </div>
                        <span className="w-10 font-mono text-[10px] text-muted-foreground">
                          {topic.hadithCount}
                        </span>
                      </div>
                    );
                  })}
              </div>

              {/* Category legend */}
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(topicCategoryColours).map(([cat, colour]) => (
                  <span key={cat} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: colour }} />
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample hadiths */}
            <div className="mt-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
                Sample Hadiths (Book 1)
              </p>

              {loadingHadiths && (
                <p className="mt-3 font-mono text-xs text-muted-foreground">Loading hadiths...</p>
              )}

              <div className="mt-2 space-y-3">
                {sampleHadiths.map((h) => (
                  <div key={h.number} className="rounded-lg border border-border bg-accent/20 p-3">
                    <p className="font-mono text-[10px] text-amber-500/80">
                      Hadith #{h.number}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {h.text.length > 400 ? h.text.slice(0, 400) + "..." : h.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
