"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { sacredSites, type SacredSite } from "@/lib/data/sacred-sites";

// --- Wireframe geometry builders ---

function KaabahModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  const emissive = active ? 0.6 : 0.3;

  return (
    <group ref={groupRef}>
      {/* Main cube */}
      <mesh>
        <boxGeometry args={[2.6, 2.6, 2.2]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={emissive} wireframe />
      </mesh>
      {/* Kiswah band (gold line near top) */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.62, 0.15, 2.22]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} wireframe />
      </mesh>
      {/* Hijr Ismail (semicircular wall) */}
      <mesh position={[0, -1.1, 1.6]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 4, 16, Math.PI]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} wireframe />
      </mesh>
      {/* Door */}
      <mesh position={[1.31, -0.2, 0]}>
        <planeGeometry args={[0.01, 1.2]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Black Stone corner marker */}
      <mesh position={[1.3, -1.1, 1.1]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      {/* Ground plane (Mataf area) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <ringGeometry args={[2.5, 5, 32]} />
        <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.2} wireframe />
      </mesh>
    </group>
  );
}

function MasjidNabawiModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  const emissive = active ? 0.5 : 0.25;

  return (
    <group ref={groupRef}>
      {/* Main rectangular building */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 1.5, 4]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={emissive} wireframe />
      </mesh>
      {/* Green Dome */}
      <mesh position={[1.5, 1.4, 0]}>
        <sphereGeometry args={[0.8, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.7} wireframe />
      </mesh>
      {/* Dome base cylinder */}
      <mesh position={[1.5, 0.9, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.4} wireframe />
      </mesh>
      {/* Minarets */}
      {[[-3, 0, -2], [-3, 0, 2], [3, 0, -2], [3, 0, 2]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={emissive} wireframe />
          </mesh>
          <mesh position={[0, 3.1, 0]}>
            <coneGeometry args={[0.15, 0.4, 8]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} wireframe />
          </mesh>
        </group>
      ))}
      {/* Rawdah area (highlighted section) */}
      <mesh position={[1.5, -0.7, 0]}>
        <boxGeometry args={[1.5, 0.05, 1.5]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function MountainModel({ active, peakHeight, baseWidth, colour }: { active: boolean; peakHeight: number; baseWidth: number; colour: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  // Procedural mountain terrain
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(baseWidth, baseWidth, 40, 40);
    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getY(i);
      const dist = Math.sqrt(x * x + z * z);
      const normalised = 1 - Math.min(dist / (baseWidth * 0.45), 1);

      // Mountain profile with noise
      let height = normalised * normalised * peakHeight;
      height += Math.sin(x * 3) * Math.cos(z * 2.5) * 0.3 * normalised;
      height += Math.sin(x * 7 + z * 5) * 0.15 * normalised;
      height += Math.cos(x * 11 - z * 8) * 0.08 * normalised;

      positions.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, [peakHeight, baseWidth]);

  const threeColour = new THREE.Color(colour);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} geometry={geometry}>
        <meshStandardMaterial
          color={threeColour}
          emissive={threeColour}
          emissiveIntensity={active ? 0.5 : 0.25}
          wireframe
        />
      </mesh>
    </group>
  );
}

function PlainModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  // Flat plain with Jabal al-Rahmah
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 50, 50);
    const positions = geo.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getY(i);

      // Mostly flat with gentle undulation
      let height = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.1;

      // Jabal al-Rahmah (small hill in centre)
      const dist = Math.sqrt(x * x + z * z);
      const hill = Math.max(0, 1 - dist / 1.5);
      height += hill * hill * 1.8;

      // Subtle noise
      height += Math.sin(x * 4 + z * 3) * 0.05;

      positions.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geometry}>
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={active ? 0.45 : 0.2}
          wireframe
        />
      </mesh>
      {/* Marker on Jabal al-Rahmah */}
      <Billboard position={[0, 2.2, 0]}>
        <Text fontSize={0.3} color="#f59e0b" anchorX="center">
          Jabal al-Rahmah
        </Text>
      </Billboard>
    </group>
  );
}

function SiteModel({ site, active }: { site: SacredSite; active: boolean }) {
  switch (site.id) {
    case "kaabah":
      return <KaabahModel active={active} />;
    case "masjid-nabawi":
      return <MasjidNabawiModel active={active} />;
    case "mount-uhud":
      return <MountainModel active={active} peakHeight={3.5} baseWidth={10} colour="#ef4444" />;
    case "cave-hira":
      return <MountainModel active={active} peakHeight={4} baseWidth={7} colour="#22d3ee" />;
    case "cave-thawr":
      return <MountainModel active={active} peakHeight={3} baseWidth={8} colour="#a78bfa" />;
    case "arafat":
      return <PlainModel active={active} />;
    default:
      return null;
  }
}

// Cave marker for Hira and Thawr
function CaveMarker({ site }: { site: SacredSite }) {
  if (site.id !== "cave-hira" && site.id !== "cave-thawr") return null;
  const y = site.id === "cave-hira" ? 2.8 : 2;
  return (
    <Billboard position={[0.5, y, 0.5]}>
      <Text fontSize={0.25} color="#f59e0b" anchorX="center">
        Cave entrance
      </Text>
    </Billboard>
  );
}

function Scene({ site }: { site: SacredSite }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 8, 5]} intensity={1.2} color="#f59e0b" distance={25} />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#22d3ee" distance={20} />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#a78bfa" distance={15} />

      <SiteModel site={site} active={true} />
      <CaveMarker site={site} />

      {/* Crosshair */}
      <group>
        {[0, Math.PI / 2].map((rot, i) => (
          <mesh key={i} rotation={[0, 0, rot]} position={[0, 0, 0]}>
            <planeGeometry args={[0.02, 0.6]} />
            <meshBasicMaterial color="#334155" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        ))}
        <mesh>
          <ringGeometry args={[0.2, 0.22, 32]} />
          <meshBasicMaterial color="#334155" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.2} />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={20}
        autoRotate={false}
        keyEvents={false}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.95} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export function SacredSites3D() {
  const [selectedSite, setSelectedSite] = useState<SacredSite>(sacredSites[0]);

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-xl bg-[#030308]">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#030308");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.3;
        }}
      >
        <Scene site={selectedSite} />
      </Canvas>

      {/* Top-left: Title */}
      <div className="pointer-events-none absolute left-5 top-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          Sacred Sites
        </p>
      </div>

      {/* Left panel: Site selector */}
      <div className="pointer-events-auto absolute left-5 top-12 w-56">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
          ◈ Select Site
        </p>
        <div className="space-y-0.5">
          {sacredSites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`w-full text-left rounded px-2 py-1.5 transition-colors ${
                selectedSite.id === site.id ? "bg-white/5" : "hover:bg-white/5"
              }`}
            >
              <span className={`font-mono text-[11px] ${selectedSite.id === site.id ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {site.name}
              </span>
            </button>
          ))}
        </div>

        {/* Coordinates */}
        <div className="mt-4 space-y-1 font-mono text-[11px]">
          <p className="text-[10px] uppercase tracking-wider text-amber-500/80">◈ Location</p>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lat</span>
            <span className="text-foreground">{selectedSite.lat.toFixed(4)}°N</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lon</span>
            <span className="text-foreground">{selectedSite.lon.toFixed(4)}°E</span>
          </div>
          {selectedSite.elevation && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Elevation</span>
              <span className="text-foreground">{selectedSite.elevation}m</span>
            </div>
          )}
          {selectedSite.dimensions && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size</span>
              <span className="text-foreground/70 text-[10px]">{selectedSite.dimensions}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right panel: History and details */}
      <div className="pointer-events-auto absolute right-5 top-12 w-72 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          ◉ {selectedSite.nameArabic}
        </p>
        <p className="mt-1 font-mono text-sm font-bold text-foreground">
          {selectedSite.name}
        </p>
        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {selectedSite.description}
        </p>

        {/* History */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">History</p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
            {selectedSite.history}
          </p>
        </div>

        {/* Qur'anic references */}
        {selectedSite.quranicReferences && selectedSite.quranicReferences.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
              Qur&apos;anic References
            </p>
            <ul className="mt-2 space-y-1">
              {selectedSite.quranicReferences.map((ref) => (
                <li key={ref} className="flex items-start gap-2 font-mono text-[10px] text-cyan-400/80">
                  <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key events */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
            Key Events
          </p>
          <ul className="mt-2 space-y-1">
            {selectedSite.keyEvents.map((event) => (
              <li key={event} className="flex items-start gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                {event}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom-right */}
      <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[10px] text-muted-foreground/40">
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>

      {/* Bottom-left: Site counter */}
      <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] text-muted-foreground/40">
        {sacredSites.findIndex(s => s.id === selectedSite.id) + 1} / {sacredSites.length}
      </div>
    </div>
  );
}
