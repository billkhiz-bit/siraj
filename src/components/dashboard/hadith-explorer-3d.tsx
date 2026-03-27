"use client";

import { useState, useRef } from "react";
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

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = isHovered || isSelected ? 1.08 : 1;
    groupRef.current.scale.x = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.1
    );
    groupRef.current.scale.z = THREE.MathUtils.lerp(
      groupRef.current.scale.z,
      targetScale,
      0.1
    );
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(collection);
    document.body.style.cursor = "pointer";
  };

  return (
    <group
      ref={groupRef}
      position={[x, 0, 0]}
      onPointerOver={handlePointerOver}
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
          emissiveIntensity={isHovered || isSelected ? 0.5 : 0.2}
          transparent
          opacity={0.35}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Authentic hadith tower (solid, inner) */}
      <mesh position={[0, authHeight / 2, 0]}>
        <boxGeometry args={[1.2, authHeight, 1.2]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={isHovered || isSelected ? 0.7 : 0.4}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Collection name */}
      <Text
        position={[0, -0.5, 1.2]}
        fontSize={0.3}
        color={isHovered || isSelected ? "#ffffff" : "#94a3b8"}
        anchorX="center"
        anchorY="top"
        rotation={[-0.3, 0, 0]}
      >
        {collection.name.replace("Sahih ", "").replace("Sunan ", "").replace("Jami' ", "")}
      </Text>

      {/* Count label on top */}
      <Text
        position={[0, height + 0.3, 0]}
        fontSize={0.25}
        color="#e2e8f0"
        anchorX="center"
        anchorY="bottom"
      >
        {collection.totalHadith.toLocaleString()}
      </Text>
    </group>
  );
}

function TopicBreakdown({
  collection,
}: {
  collection: HadithCollection;
}) {
  const sorted = [...collection.topics].sort((a, b) => b.hadithCount - a.hadithCount);
  const maxCount = sorted[0]?.hadithCount || 1;

  return (
    <group position={[0, 0, -6]}>
      <Text
        position={[0, 5, 0]}
        fontSize={0.4}
        color="#e2e8f0"
        anchorX="center"
      >
        {collection.name}: Topic Breakdown
      </Text>

      {sorted.slice(0, 8).map((topic, i) => {
        const width = (topic.hadithCount / maxCount) * 8;
        const y = 4 - i * 0.7;
        const colour = new THREE.Color(
          topicCategoryColours[topic.category] || "#64748b"
        );

        return (
          <group key={topic.name} position={[0, y, 0]}>
            <mesh position={[width / 2 - 4, 0, 0]}>
              <boxGeometry args={[width, 0.45, 0.3]} />
              <meshStandardMaterial
                color={colour}
                emissive={colour}
                emissiveIntensity={0.4}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>
            <Text
              position={[-4.2, 0, 0]}
              fontSize={0.2}
              color="#94a3b8"
              anchorX="right"
              anchorY="middle"
            >
              {topic.name}
            </Text>
            <Text
              position={[width - 3.8, 0, 0.3]}
              fontSize={0.18}
              color="#e2e8f0"
              anchorX="left"
              anchorY="middle"
            >
              {topic.hadithCount}
            </Text>
          </group>
        );
      })}
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

      {/* Floor grid */}
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

      {selectedCollection && <TopicBreakdown collection={selectedCollection} />}

      <Stars radius={40} depth={30} count={800} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan
        minDistance={8}
        maxDistance={35}
        autoRotate={!selectedCollection}
        autoRotateSpeed={0.3}
        target={[0, 3, selectedCollection ? -3 : 0]}
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
  const displayCollection = hoveredCollection || selectedCollection;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(
                selectedCollection?.id === col.id ? null : col
              )}
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
          Outer = total · Inner = authentic · Click to expand
        </p>
      </div>

      <div className="relative h-[560px] w-full overflow-hidden rounded-xl border border-border bg-[#0a0a1a]">
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
            onHover={setHoveredCollection}
            onSelect={(c) =>
              setSelectedCollection(selectedCollection?.id === c.id ? null : c)
            }
          />
        </Canvas>

        {displayCollection && (
          <div className="pointer-events-none absolute left-6 bottom-6 rounded-lg border border-border bg-popover/90 px-5 py-4 shadow-xl backdrop-blur-sm">
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
              <span>
                {Math.round(
                  (displayCollection.authenticHadith / displayCollection.totalHadith) * 100
                )}
                % auth rate
              </span>
            </div>
            <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
              {displayCollection.description}
            </p>
          </div>
        )}

        <div className="pointer-events-none absolute right-6 bottom-6 text-xs text-muted-foreground/50">
          Drag to orbit · Click tower to see topics
        </div>
      </div>
    </div>
  );
}
