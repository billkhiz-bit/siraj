"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Stars, Billboard, Sphere, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { surahs, meccanCount, medinanCount, totalAyat, type Surah } from "@/lib/data/surahs";

const GLOBE_RADIUS = 4;
const MECCAN_COLOUR = new THREE.Color("#22d3ee");
const MEDINAN_COLOUR = new THREE.Color("#a78bfa");
// Amber accent used in UI overlays (CSS-side)

// Coordinates
const MAKKAH = { lat: 21.4225, lon: 39.8262 };
const MADINAH = { lat: 24.4672, lon: 39.6112 };

function latLonToXYZ(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Generate dot-matrix landmass points (simplified major continents)
function generateLandDots(): THREE.Vector3[] {
  const dots: THREE.Vector3[] = [];
  // Africa
  for (let lat = -35; lat <= 37; lat += 2.5) {
    const lonMin = lat < 0 ? 15 + Math.abs(lat) * 0.3 : lat < 15 ? 0 : -5;
    const lonMax = lat < 0 ? 45 : lat < 15 ? 50 : lat < 30 ? 40 : 32;
    for (let lon = lonMin; lon <= lonMax; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // Europe
  for (let lat = 36; lat <= 70; lat += 2.5) {
    const lonMin = lat < 45 ? -10 : lat < 55 ? -10 : -5;
    const lonMax = lat < 45 ? 30 : lat < 55 ? 40 : lat < 65 ? 35 : 30;
    for (let lon = lonMin; lon <= lonMax; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // Asia
  for (let lat = 10; lat <= 55; lat += 2.5) {
    const lonMin = 40;
    const lonMax = lat < 25 ? 80 : lat < 40 ? 120 : lat < 50 ? 140 : 135;
    for (let lon = lonMin; lon <= lonMax; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // Middle East / Arabian Peninsula (denser)
  for (let lat = 12; lat <= 38; lat += 1.5) {
    const lonMin = 32;
    const lonMax = lat < 25 ? 60 : 55;
    for (let lon = lonMin; lon <= lonMax; lon += 1.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // South/Southeast Asia
  for (let lat = -8; lat <= 28; lat += 2.5) {
    for (let lon = 68; lon <= 140; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // North America
  for (let lat = 15; lat <= 70; lat += 2.5) {
    const lonMin = lat < 30 ? -110 : lat < 50 ? -130 : -140;
    const lonMax = lat < 30 ? -75 : lat < 50 ? -60 : -55;
    for (let lon = lonMin; lon <= lonMax; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // South America
  for (let lat = -55; lat <= 12; lat += 2.5) {
    const lonMin = lat < -30 ? -75 : -80;
    const lonMax = lat < -20 ? -35 : lat < 0 ? -35 : -50;
    for (let lon = lonMin; lon <= lonMax; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  // Australia
  for (let lat = -40; lat <= -12; lat += 2.5) {
    for (let lon = 115; lon <= 153; lon += 2.5) {
      dots.push(latLonToXYZ(lat, lon, GLOBE_RADIUS));
    }
  }
  return dots;
}

function ParticleGlobe() {
  const dotsRef = useRef<THREE.Points>(null);
  const dots = useMemo(() => generateLandDots(), []);

  const positions = useMemo(() => {
    const arr = new Float32Array(dots.length * 3);
    dots.forEach((d, i) => {
      arr[i * 3] = d.x;
      arr[i * 3 + 1] = d.y;
      arr[i * 3 + 2] = d.z;
    });
    return arr;
  }, [dots]);

  return (
    <group>
      {/* Translucent sphere shell */}
      <Sphere args={[GLOBE_RADIUS - 0.02, 48, 48]}>
        <meshStandardMaterial
          color="#070714"
          transparent
          opacity={0.6}
          roughness={1}
          metalness={0}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Globe outline ring (equator) */}
      {[0, 23.5, -23.5].map((lat) => {
        const pts: THREE.Vector3[] = [];
        for (let lon = 0; lon <= 360; lon += 3) {
          pts.push(latLonToXYZ(lat, lon, GLOBE_RADIUS + 0.01));
        }
        return (
          <Line
            key={lat}
            points={pts}
            color="#1e293b"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        );
      })}

      {/* Dot-matrix landmasses */}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#475569"
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.75}
        />
      </points>
    </group>
  );
}

function CityBeacon({
  lat,
  lon,
  name,
  nameArabic,
  colour,
  count,
  isHovered,
  onHover,
}: {
  lat: number;
  lon: number;
  name: string;
  nameArabic: string;
  colour: THREE.Color;
  count: number;
  isHovered: boolean;
  onHover: (city: string | null) => void;
}) {
  const pos = latLonToXYZ(lat, lon, GLOBE_RADIUS);
  const outerPos = latLonToXYZ(lat, lon, GLOBE_RADIUS + 0.8);
  const beamRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.2;
      ringRef.current.scale.setScalar(s);
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.4 - Math.sin(t * 2) * 0.2;
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = isHovered ? 1.5 : 0.8 + Math.sin(t * 3) * 0.2;
    }
  });

  // Beam direction (radially outward)
  const normal = pos.clone().normalize();

  return (
    <group>
      {/* Base dot */}
      <mesh
        position={pos}
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
        <sphereGeometry args={[isHovered ? 0.25 : 0.18, 16, 16]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={1}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Vertical beam */}
      <mesh
        ref={beamRef}
        position={outerPos}
        quaternion={new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          normal
        )}
      >
        <cylinderGeometry args={[0.02, 0.06, 1.6, 8]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Pulse ring */}
      <mesh
        ref={ringRef}
        position={pos.clone().add(normal.clone().multiplyScalar(0.05))}
        quaternion={new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          normal
        )}
      >
        <torusGeometry args={[0.5, 0.03, 8, 32]} />
        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Label */}
      <Billboard position={outerPos.clone().add(normal.clone().multiplyScalar(1))}>
        <Text
          fontSize={isHovered ? 0.45 : 0.35}
          color={isHovered ? "#ffffff" : "#e2e8f0"}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.025}
          outlineColor="#000000"
        >
          {name}
        </Text>
        <Text
          position={[0, isHovered ? 0.5 : 0.4, 0]}
          fontSize={isHovered ? 0.22 : 0.18}
          color={isHovered ? "#94a3b8" : "#64748b"}
          anchorX="center"
        >
          {nameArabic} · {count} surahs
        </Text>
      </Billboard>
    </group>
  );
}

function SurahParticles({
  surahList,
  cityLat,
  cityLon,
  colour,
  hoveredSurah,
  onHover,
}: {
  surahList: Surah[];
  cityLat: number;
  cityLon: number;
  colour: THREE.Color;
  hoveredSurah: Surah | null;
  onHover: (s: Surah | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cityPos = latLonToXYZ(cityLat, cityLon, GLOBE_RADIUS + 2.2);
  const normal = cityPos.clone().normalize();
  const tangent = new THREE.Vector3(0, 1, 0).cross(normal).normalize();
  const bitangent = normal.clone().cross(tangent).normalize();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {surahList.map((surah, i) => {
        const angle = (i / surahList.length) * Math.PI * 2;
        const radius = 1.8;
        const pos = cityPos
          .clone()
          .add(tangent.clone().multiplyScalar(Math.cos(angle) * radius))
          .add(bitangent.clone().multiplyScalar(Math.sin(angle) * radius));
        const size = 0.06 + (surah.ayatCount / 286) * 0.18;
        const isHov = hoveredSurah?.number === surah.number;

        return (
          <mesh
            key={surah.number}
            position={pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHover(surah);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              onHover(null);
              document.body.style.cursor = "auto";
            }}
          >
            <sphereGeometry args={[isHov ? size * 2.5 : size, 12, 12]} />
            <meshStandardMaterial
              color={colour}
              emissive={colour}
              emissiveIntensity={isHov ? 2 : 0.8}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={isHov ? 1 : 0.85}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function HijrahArc() {
  const makkahPos = latLonToXYZ(MAKKAH.lat, MAKKAH.lon, GLOBE_RADIUS + 0.05);
  const madinahPos = latLonToXYZ(MADINAH.lat, MADINAH.lon, GLOBE_RADIUS + 0.05);
  const mid = makkahPos
    .clone()
    .add(madinahPos)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(GLOBE_RADIUS + 1.2);

  const curve = new THREE.QuadraticBezierCurve3(makkahPos, mid, madinahPos);
  const points = curve.getPoints(50);

  return (
    <Line
      points={points}
      color="#f59e0b"
      lineWidth={3}
      transparent
      opacity={0.85}
    />
  );
}

function Scene({
  layers,
  hoveredCity,
  hoveredSurah,
  onHoverCity,
  onHoverSurah,
}: {
  layers: { meccan: boolean; medinan: boolean; hijrah: boolean; cities: boolean };
  hoveredCity: string | null;
  hoveredSurah: Surah | null;
  onHoverCity: (c: string | null) => void;
  onHoverSurah: (s: Surah | null) => void;
}) {
  const meccanSurahs = useMemo(() => surahs.filter((s) => s.type === "meccan"), []);
  const medinanSurahs = useMemo(() => surahs.filter((s) => s.type === "medinan"), []);

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[8, 10, 5]} intensity={0.8} />
      <pointLight
        position={latLonToXYZ(MAKKAH.lat, MAKKAH.lon, GLOBE_RADIUS + 3)}
        intensity={1.5}
        color="#22d3ee"
        distance={15}
      />
      <pointLight
        position={latLonToXYZ(MADINAH.lat, MADINAH.lon, GLOBE_RADIUS + 3)}
        intensity={1.5}
        color="#a78bfa"
        distance={15}
      />

      <ParticleGlobe />

      {layers.cities && (
        <>
          <CityBeacon
            lat={MAKKAH.lat}
            lon={MAKKAH.lon}
            name="MAKKAH"
            nameArabic="مكة المكرمة"
            colour={MECCAN_COLOUR}
            count={meccanCount}
            isHovered={hoveredCity === "MAKKAH"}
            onHover={onHoverCity}
          />
          <CityBeacon
            lat={MADINAH.lat}
            lon={MADINAH.lon}
            name="MADINAH"
            nameArabic="المدينة المنورة"
            colour={MEDINAN_COLOUR}
            count={medinanCount}
            isHovered={hoveredCity === "MADINAH"}
            onHover={onHoverCity}
          />
        </>
      )}

      {layers.hijrah && <HijrahArc />}

      {layers.meccan && (
        <SurahParticles
          surahList={meccanSurahs}
          cityLat={MAKKAH.lat}
          cityLon={MAKKAH.lon}
          colour={MECCAN_COLOUR}
          hoveredSurah={hoveredSurah}
          onHover={onHoverSurah}
        />
      )}

      {layers.medinan && (
        <SurahParticles
          surahList={medinanSurahs}
          cityLat={MADINAH.lat}
          cityLon={MADINAH.lon}
          colour={MEDINAN_COLOUR}
          hoveredSurah={hoveredSurah}
          onHover={onHoverSurah}
        />
      )}

      <Stars radius={80} depth={60} count={3000} factor={3} fade speed={0.2} />

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.12}
        target={[0, 0, 0]}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.95} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
}

// --- UI Layer ---

function LayerToggle({
  label,
  colour,
  active,
  onToggle,
}: {
  label: string;
  colour: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-1.5 text-xs transition-colors"
    >
      <span className={active ? "text-foreground" : "text-muted-foreground/50"}>
        {label}
      </span>
      <span
        className="h-3 w-6 rounded-full border transition-colors"
        style={{
          backgroundColor: active ? colour : "transparent",
          borderColor: active ? colour : "#334155",
        }}
      >
        <span
          className="block h-2.5 w-2.5 rounded-full bg-white transition-transform"
          style={{ transform: active ? "translateX(10px)" : "translateX(1px)" }}
        />
      </span>
    </button>
  );
}

export function RevelationGlobe() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hoveredSurah, setHoveredSurah] = useState<Surah | null>(null);
  const [layers, setLayers] = useState({
    meccan: true,
    medinan: true,
    hijrah: true,
    cities: true,
  });

  const toggleLayer = useCallback(
    (key: keyof typeof layers) =>
      setLayers((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

  const meccanAyat = useMemo(
    () => surahs.filter((s) => s.type === "meccan").reduce((sum, s) => sum + s.ayatCount, 0),
    []
  );
  const medinanAyat = useMemo(
    () => surahs.filter((s) => s.type === "medinan").reduce((sum, s) => sum + s.ayatCount, 0),
    []
  );

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-xl bg-[#030308]">
      {/* 3D Canvas — full viewport */}
      <Canvas
        camera={{ position: [-0.5, 1, 6], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#030308");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.4;
        }}
      >
        <Scene
          layers={layers}
          hoveredCity={hoveredCity}
          hoveredSurah={hoveredSurah}
          onHoverCity={setHoveredCity}
          onHoverSurah={setHoveredSurah}
        />
      </Canvas>

      {/* === Overlay panels (Project Backbone style) === */}

      {/* Top-left: Title */}
      <div className="pointer-events-none absolute left-5 top-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          Revelation Map
        </p>
      </div>

      {/* Left panel: Stats */}
      <div className="pointer-events-none absolute left-5 top-12 w-56 space-y-4">
        {/* Qur'an overview */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
            ☽ Qur&apos;anic Revelation
          </p>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Surahs</span>
              <span className="text-foreground">114</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Ayat</span>
              <span className="text-foreground">{totalAyat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Juz</span>
              <span className="text-foreground">30</span>
            </div>
          </div>
        </div>

        {/* Makkah */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
            ◈ Makkah Revelations
          </p>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Surahs</span>
              <span className="text-cyan-400">{meccanCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ayat</span>
              <span className="text-cyan-400">{meccanAyat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coordinates</span>
              <span className="text-muted-foreground/70">21.42°N 39.83°E</span>
            </div>
          </div>
        </div>

        {/* Madinah */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-violet-400/80">
            ◈ Madinah Revelations
          </p>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Surahs</span>
              <span className="text-violet-400">{medinanCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ayat</span>
              <span className="text-violet-400">{medinanAyat.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coordinates</span>
              <span className="text-muted-foreground/70">24.47°N 39.61°E</span>
            </div>
          </div>
        </div>

        {/* Hijrah */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
            ◈ The Hijrah
          </p>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance</span>
              <span className="text-foreground">~340 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year</span>
              <span className="text-foreground">622 CE (1 AH)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: Map layers */}
      <div className="pointer-events-auto absolute right-5 top-12 w-48">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          ◉ Map Layers
        </p>
        <div className="space-y-1.5">
          <LayerToggle
            label="Meccan Surahs"
            colour="#22d3ee"
            active={layers.meccan}
            onToggle={() => toggleLayer("meccan")}
          />
          <LayerToggle
            label="Medinan Surahs"
            colour="#a78bfa"
            active={layers.medinan}
            onToggle={() => toggleLayer("medinan")}
          />
          <LayerToggle
            label="Hijrah Route"
            colour="#f59e0b"
            active={layers.hijrah}
            onToggle={() => toggleLayer("hijrah")}
          />
          <LayerToggle
            label="City Markers"
            colour="#f59e0b"
            active={layers.cities}
            onToggle={() => toggleLayer("cities")}
          />
        </div>
      </div>

      {/* Hovered surah tooltip (bottom-left) */}
      {hoveredSurah && (
        <div className="pointer-events-none absolute bottom-5 left-5 rounded border border-border/30 bg-black/80 px-4 py-3 backdrop-blur-sm">
          <p className="font-mono text-lg font-bold text-foreground">
            {hoveredSurah.nameArabic}
          </p>
          <p className="font-mono text-xs text-foreground">
            {hoveredSurah.number}. {hoveredSurah.nameEnglish}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            &ldquo;{hoveredSurah.meaning}&rdquo; · {hoveredSurah.ayatCount} ayat · Revealed #{hoveredSurah.revelationOrder}
          </p>
        </div>
      )}

      {/* Bottom-right: interaction hint */}
      <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[10px] text-muted-foreground/40">
        DRAG TO ORBIT · SCROLL TO ZOOM
      </div>
    </div>
  );
}
