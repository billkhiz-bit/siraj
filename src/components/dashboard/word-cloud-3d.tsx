"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { quranicWords, wordCategories, type QuranicWord } from "@/lib/data/words";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type FilterMode = "all" | "divine" | "action" | "concept" | "nature" | "person" | "time";

const categoryColourMap: Record<string, THREE.Color> = {};
wordCategories.forEach((c) => {
  categoryColourMap[c.key] = new THREE.Color(c.colour);
});

function fibonacciSphere(index: number, total: number, radius: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = goldenAngle * index;
  return new THREE.Vector3(
    Math.cos(theta) * radiusAtY * radius,
    y * radius,
    Math.sin(theta) * radiusAtY * radius
  );
}

function WordNode({
  word,
  position,
  maxFreq,
  onHover,
  onClick,
  isHovered,
}: {
  word: QuranicWord;
  position: THREE.Vector3;
  maxFreq: number;
  onHover: (w: QuranicWord | null) => void;
  onClick: (w: QuranicWord) => void;
  isHovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const colour = categoryColourMap[word.category] || new THREE.Color("#ffffff");
  const size = 0.4 + (word.frequency / maxFreq) * 1.8;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y =
      position.y + Math.sin(t * 0.5 + position.x) * 0.15;
    // Billboard effect: face camera without mirroring
    const camPos = state.camera.position.clone();
    camPos.y = groupRef.current.position.y;
    groupRef.current.lookAt(camPos);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(word);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(word);
      }}
    >
      <Text
        fontSize={size}
        color={colour}
        anchorX="center"
        anchorY="middle"
        outlineWidth={isHovered ? 0.05 : 0}
        outlineColor="#ffffff"
      >
        {word.arabic}
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          transparent
          opacity={isHovered ? 1 : 0.85}
        />
      </Text>
    </group>
  );
}

function Scene({
  filter,
  hoveredWord,
  onHover,
  onClick,
}: {
  filter: FilterMode;
  hoveredWord: QuranicWord | null;
  onHover: (w: QuranicWord | null) => void;
  onClick: (w: QuranicWord) => void;
}) {
  const filtered = useMemo(() => {
    const words = filter === "all" ? quranicWords : quranicWords.filter((w) => w.category === filter);
    return words.sort((a, b) => b.frequency - a.frequency).slice(0, 60);
  }, [filter]);

  const maxFreq = filtered.length > 0 ? filtered[0].frequency : 1;

  const positions = useMemo(
    () => filtered.map((_, i) => fibonacciSphere(i, filtered.length, 10)),
    [filtered]
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 15, 0]} intensity={1.5} color="#f59e0b" />
      <pointLight position={[10, 5, 10]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#a78bfa" />

      {filtered.map((word, i) => (
        <WordNode
          key={word.transliteration}
          word={word}
          position={positions[i]}
          maxFreq={maxFreq}
          onHover={onHover}
          onClick={onClick}
          isHovered={hoveredWord?.transliteration === word.transliteration}
        />
      ))}

      <Stars radius={40} depth={30} count={1000} factor={2} fade speed={0.3} />

      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={30}
        autoRotate
        autoRotateSpeed={0.3}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

interface SearchResult {
  verse_key: string;
  text: string;
  translation?: string;
}

export function WordCloud3D() {
  const [filter, setFilter] = useState<FilterMode>("all");
  const [hoveredWord, setHoveredWord] = useState<QuranicWord | null>(null);
  
  const [selectedWord, setSelectedWord] = useState<QuranicWord | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const handleWordClick = async (word: QuranicWord) => {
    setSelectedWord(word);
    setSearching(true);
    try {
      // Search using Arabic text for accuracy, fall back to transliteration
      const arabicClean = word.arabic.replace(/[\u064B-\u065F\u0670]/g, ""); // strip tashkeel
      const res = await fetch(
        `https://api.quran.com/api/v4/search?q=${encodeURIComponent(arabicClean)}&size=10&page=1&language=en&translations=131`
      );
      const data = await res.json();
      const results: SearchResult[] = (data.search?.results || []).map(
        (r: { verse_key: string; text: string; translations?: Array<{ text: string }> }) => ({
          verse_key: r.verse_key,
          text: r.text,
          translation: r.translations?.[0]?.text?.replace(/<[^>]*>/g, "") ?? "",
        })
      );
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    }
    setSearching(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterMode)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {wordCategories.filter(c => c.key !== "place").map((cat) => (
              <TabsTrigger key={cat.key} value={cat.key}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <p className="text-xs text-muted-foreground">
          Click a word to find its ayahs
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className={`relative overflow-hidden rounded-xl border border-border bg-[#0a0a1a] ${selectedWord ? "h-[350px] w-full md:h-[560px] md:w-2/3" : "h-[350px] w-full md:h-[560px]"}`}>
          <Canvas
            camera={{ position: [0, 0, 18], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor("#0a0a1a");
              gl.toneMapping = THREE.ACESFilmicToneMapping;
            }}
          >
            <Scene filter={filter} hoveredWord={hoveredWord} onHover={(w) => { setHoveredWord(w); }} onClick={handleWordClick} />
          </Canvas>

          {hoveredWord && !selectedWord && (
            <div
              className="pointer-events-auto absolute left-6 bottom-6 max-h-[45%] max-w-sm overflow-y-auto rounded-lg border border-border bg-popover/90 px-5 py-4 shadow-xl backdrop-blur-sm"
              
              
            >
              <p className="font-mono text-xl font-bold text-foreground">
                {hoveredWord.arabic}
              </p>
              <p className="text-sm font-medium text-foreground">
                {hoveredWord.transliteration}
              </p>
              <p className="text-xs text-muted-foreground">
                &ldquo;{hoveredWord.meaning}&rdquo;
              </p>
              <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                <Badge variant="secondary">{hoveredWord.category}</Badge>
                <span>{hoveredWord.frequency.toLocaleString()} occurrences</span>
                {hoveredWord.root && <span>Root: {hoveredWord.root}</span>}
              </div>
              <p className="mt-1 text-[10px] text-amber-500/70">Click to find ayahs</p>
            </div>
          )}

          <div className="pointer-events-none absolute right-6 bottom-6 text-xs text-muted-foreground/50">
            Drag to orbit · Scroll to zoom · Click word for ayahs
          </div>
        </div>

        {/* Ayah results panel */}
        {selectedWord && (
          <div className="h-[400px] w-full overflow-y-auto rounded-xl border border-border bg-card p-5 md:h-[560px] md:w-1/3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-2xl font-bold text-foreground" dir="rtl">
                  {selectedWord.arabic}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {selectedWord.transliteration} &middot; &ldquo;{selectedWord.meaning}&rdquo;
                </p>
                <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                  <span>{selectedWord.frequency.toLocaleString()} occurrences</span>
                  {selectedWord.root && <span>Root: {selectedWord.root}</span>}
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
              Ayahs containing this word
            </p>

            {searching && (
              <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                Searching...
              </p>
            )}

            {!searching && searchResults.length === 0 && (
              <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                No results found
              </p>
            )}

            <div className="mt-3 space-y-3">
              {searchResults.map((r) => (
                <a
                  key={r.verse_key}
                  href={`/surah/${r.verse_key.split(":")[0]}`}
                  className="block rounded-lg border border-border bg-accent/20 p-3 transition-colors hover:bg-accent/40"
                >
                  <p className="font-mono text-[10px] text-amber-500/80">
                    Surah {r.verse_key.split(":")[0]}, Ayah {r.verse_key.split(":")[1]}
                  </p>
                  <p className="mt-1 text-right font-mono text-sm leading-loose text-foreground" dir="rtl">
                    {r.text}
                  </p>
                  {r.translation && (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {r.translation}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap gap-3">
        {wordCategories.filter(c => c.key !== "place").map((cat) => (
          <span key={cat.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: cat.colour }}
            />
            {cat.label}
          </span>
        ))}
      </div>
    </div>
  );
}
