"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Text, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { sacredSites, type SacredSite } from "@/lib/data/sacred-sites";

function seeded(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// --- Particle dust that floats around the model ---
function ParticleDust({ count, radius, colour }: { count: number; radius: number; colour: string }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = seeded(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i * 3 + 2) - 1);
      const r = radius * (0.3 + seeded(i * 3 + 3) * 0.7);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color={colour}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </Points>
  );
}



// --- Masjid al-Nabawi ---
function MasjidNabawiModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.08; });
  const e = active ? 0.45 : 0.2;
  return (
    <group ref={groupRef}>
      <mesh><boxGeometry args={[8, 1.2, 5]} /><meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e} wireframe /></mesh>
      <mesh position={[0, 0.1, 0]}><boxGeometry args={[6, 0.8, 3.5]} /><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={e * 0.5} wireframe /></mesh>
      {/* Green Dome */}
      <mesh position={[2, 1.2, 0.5]}><sphereGeometry args={[0.7, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.8} wireframe /></mesh>
      <mesh position={[2, 0.75, 0.5]}><cylinderGeometry args={[0.7, 0.7, 0.3, 20]} /><meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.5} wireframe /></mesh>
      <mesh position={[2, 1.95, 0.5]}><sphereGeometry args={[0.06, 8, 8]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} /></mesh>
      <Billboard position={[2, 2.3, 0.5]}><Text fontSize={0.13} color="#16a34a">Green Dome</Text></Billboard>
      {/* White dome */}
      <mesh position={[2, 1.1, -0.5]}><sphereGeometry args={[0.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.3} wireframe /></mesh>
      {/* Sliding domes */}
      {[-2, 0, 2].flatMap(x => [-1, 0, 1].map(z => (<mesh key={`${x}${z}`} position={[x - 1, 0.85, z * 0.8]}><sphereGeometry args={[0.3, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e * 0.6} wireframe /></mesh>)))}
      {/* 10 Minarets */}
      {[[-4, 0, -2.5], [-4, 0, 2.5], [4, 0, -2.5], [4, 0, 2.5], [-2, 0, -2.5], [0, 0, -2.5], [2, 0, -2.5], [-2, 0, 2.5], [0, 0, 2.5], [2, 0, 2.5]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 2, 0]}><cylinderGeometry args={[0.06, 0.08, 3.5, 8]} /><meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e} wireframe /></mesh>
          <mesh position={[0, 2.8, 0]}><cylinderGeometry args={[0.12, 0.12, 0.08, 8]} /><meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e * 1.5} wireframe /></mesh>
          <mesh position={[0, 3.9, 0]}><coneGeometry args={[0.08, 0.4, 8]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} wireframe /></mesh>
          <mesh position={[0, 4.15, 0]}><sphereGeometry args={[0.03, 6, 6]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} /></mesh>
        </group>
      ))}
      {/* Rawdah */}
      <mesh position={[2.2, -0.55, 0]}><boxGeometry args={[1.5, 0.03, 1.5]} /><meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.6} /></mesh>
      <Billboard position={[2.2, -0.15, 0]}><Text fontSize={0.1} color="#16a34a">Al-Rawdah</Text></Billboard>
    </group>
  );
}

// --- Mountain generator with particles ---
function MountainWithParticles({ geo, colour, labels, active }: {
  geo: THREE.PlaneGeometry;
  colour: string;
  labels: Array<{ pos: [number, number, number]; text: string; colour?: string }>;
  active: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const col = new THREE.Color(colour);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.06; });

  // Extract vertex positions for particle overlay
  const particlePositions = useMemo(() => {
    const pos = geo.attributes.position;
    const arr = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      arr[i * 3] = pos.getX(i);
      arr[i * 3 + 1] = pos.getZ(i); // Z becomes Y (rotated)
      arr[i * 3 + 2] = -pos.getY(i); // Y becomes -Z
    }
    return arr;
  }, [geo]);

  return (
    <group ref={groupRef}>
      {/* Wireframe mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={geo}>
        <meshStandardMaterial color={col} emissive={col} emissiveIntensity={active ? 0.35 : 0.15} wireframe />
      </mesh>
      {/* Point cloud overlay on the surface */}
      <Points positions={particlePositions} stride={3}>
        <PointMaterial color={colour} size={0.04} sizeAttenuation transparent opacity={active ? 0.6 : 0.3} depthWrite={false} />
      </Points>
      {/* Labels */}
      {labels.map(({ pos, text, colour: lc }) => (
        <Billboard key={text} position={pos}><Text fontSize={0.18} color={lc || colour}>{text}</Text></Billboard>
      ))}
    </group>
  );
}

function MountUhudModel({ active }: { active: boolean }) {
  const mainRidge = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 6, 60, 30);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const z = pos.getY(i);
      const ridge = Math.exp(-z * z / 1.5);
      const ew = 1 - Math.abs(x) / 7;
      let h = Math.min(ridge * ew * 3.5, 3.2);
      h += Math.sin(x * 5 + z * 3) * 0.15 + Math.cos(x * 8 - z * 6) * 0.1;
      if (z < 0) h *= 1 + Math.abs(z) * 0.1;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Archers' hill — small mound, much lower than Uhud (~20m vs 1077m)
  const archersHill = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2, 15, 15);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const z = pos.getY(i);
      const d = Math.sqrt(x * x + z * z);
      let h = Math.max(0, 1 - d / 0.8) * 0.8;
      h += Math.sin(x * 6) * 0.04;
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.06; });

  return (
    <group ref={groupRef}>
      <MountainWithParticles geo={mainRidge} colour="#ef4444" labels={[{ pos: [0, 3.5, 0], text: "Mount Uhud" }]} active={active} />
      {/* Archers' hill (Jabal al-Rumah) — ~1km south of Uhud, clearly separate */}
      <group position={[2, 0, -9]}>
        <MountainWithParticles geo={archersHill} colour="#f59e0b" labels={[{ pos: [0, 1.6, 0], text: "Archers' Hill" }, { pos: [0, 1.3, 0], text: "(Jabal al-Rumah)", colour: "#64748b" }]} active={active} />
      </group>
      {/* Battlefield plain between Uhud and archers' hill */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -5]}><planeGeometry args={[12, 8]} /><meshStandardMaterial color="#1e293b" emissive="#1e293b" emissiveIntensity={0.06} wireframe /></mesh>
      <Billboard position={[0, 0.3, -5]}><Text fontSize={0.15} color="#475569">Battlefield</Text></Billboard>
      <Billboard position={[-3, 0.3, -2.5]}><Text fontSize={0.12} color="#ef4444">Martyrs&apos; Cemetery</Text></Billboard>
    </group>
  );
}

function CaveHiraModel({ active }: { active: boolean }) {
  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 50, 50);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const z = pos.getY(i);
      const d = Math.sqrt(x * x + z * z);
      const peak = Math.max(0, 1 - d / 2.5);
      let h = peak * peak * peak * 3.5;
      h += Math.sin(x * 8 + z * 6) * 0.12 * peak + Math.cos(x * 12 - z * 9) * 0.08 * peak;
      h += Math.max(0, 0.3 - d / 8) * Math.sin(x * 2 + z * 3) * 0.5;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.07; });

  return (
    <group ref={groupRef}>
      <MountainWithParticles geo={terrain} colour="#22d3ee" labels={[{ pos: [0, -0.3, 3.5], text: "Jabal al-Nur" }]} active={active} />
      {/* Cave entrance glow */}
      <mesh position={[0.3, 4.6, 0.2]}><sphereGeometry args={[0.1, 10, 10]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} /></mesh>
      <Billboard position={[0.3, 5.2, 0.2]}><Text fontSize={0.18} color="#f59e0b">Cave of Hira</Text></Billboard>
      <Billboard position={[0.3, 4.95, 0.2]}><Text fontSize={0.1} color="#64748b">First revelation, 610 CE</Text></Billboard>
    </group>
  );
}

function CaveThawrModel({ active }: { active: boolean }) {
  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 50, 50);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const z = pos.getY(i);
      const d = Math.sqrt(x * x + z * z);
      const peak = Math.max(0, 1 - d / 3.5);
      let h = peak * peak * 3.8;
      h += Math.sin(x * 3 + z * 2) * 0.25 * peak + Math.cos(x * 5 - z * 4) * 0.15 * peak;
      h += Math.max(0, 0.4 - d / 10) * 0.8;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.07; });

  return (
    <group ref={groupRef}>
      <MountainWithParticles geo={terrain} colour="#a78bfa" labels={[{ pos: [0, -0.3, 4.5], text: "Jabal Thawr" }]} active={active} />
      <mesh position={[0.8, 2, 1]}><sphereGeometry args={[0.1, 10, 10]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} /></mesh>
      <Billboard position={[0.8, 2.6, 1]}><Text fontSize={0.18} color="#f59e0b">Cave of Thawr</Text></Billboard>
      <Billboard position={[0.8, 2.35, 1]}><Text fontSize={0.1} color="#64748b">Hijrah refuge, 622 CE</Text></Billboard>
    </group>
  );
}

function ArafatModel({ active }: { active: boolean }) {
  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(14, 14, 70, 70);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); const z = pos.getY(i);
      let h = Math.sin(x * 0.3) * Math.cos(z * 0.4) * 0.08 + Math.sin(x * 1.5 + z * 1.2) * 0.03;
      const d = Math.sqrt((x - 0.5) * (x - 0.5) + z * z);
      const hill = Math.max(0, 1 - d / 1.2);
      h += hill * hill * 1.4 + hill * Math.sin(x * 10 + z * 8) * 0.06;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.05; });

  return (
    <group ref={groupRef}>
      <MountainWithParticles geo={terrain} colour="#f59e0b" labels={[]} active={active} />
      {/* White pillar on Jabal al-Rahmah */}
      <mesh position={[0.5, 2.5, 0]}><cylinderGeometry args={[0.04, 0.04, 0.6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} /></mesh>
      <Billboard position={[0.5, 3.3, 0]}><Text fontSize={0.2} color="#f59e0b">Jabal al-Rahmah</Text></Billboard>
      <Billboard position={[0.5, 3, 0]}><Text fontSize={0.12} color="#64748b">Mount of Mercy</Text></Billboard>
      {/* Gathering rings */}
      {[3, 4.5, 6].map((r, i) => (<mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.02, 0]}><ringGeometry args={[r - 0.02, r, 48]} /><meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.1} wireframe /></mesh>))}
    </group>
  );
}

function SiteModel({ site, active }: { site: SacredSite; active: boolean }) {
  switch (site.id) {
    case "masjid-nabawi": return <MasjidNabawiModel active={active} />;
    case "mount-uhud": return <MountUhudModel active={active} />;
    case "cave-hira": return <CaveHiraModel active={active} />;
    case "cave-thawr": return <CaveThawrModel active={active} />;
    case "arafat": return <ArafatModel active={active} />;
    default: return null;
  }
}

const SITE_COLOURS: Record<string, string> = {
  "masjid-nabawi": "#34d399",
  "mount-uhud": "#ef4444",
  "cave-hira": "#22d3ee",
  "cave-thawr": "#a78bfa",
  arafat: "#f59e0b",
};

// Ground grid for spatial reference
function GroundGrid() {
  return <gridHelper args={[20, 40, "#1a1a2e", "#0f0f1a"]} position={[0, -1.35, 0]} />;
}

// Compass rose (NSEW)
function Compass() {
  return (
    <group position={[0, -1.3, 0]}>
      {[
        { dir: "N", pos: [0, 0, -8] as [number, number, number], colour: "#ef4444" },
        { dir: "S", pos: [0, 0, 8] as [number, number, number], colour: "#64748b" },
        { dir: "E", pos: [8, 0, 0] as [number, number, number], colour: "#64748b" },
        { dir: "W", pos: [-8, 0, 0] as [number, number, number], colour: "#64748b" },
      ].map(({ dir, pos, colour }) => (
        <Billboard key={dir} position={pos}>
          <Text fontSize={0.2} color={colour}>{dir}</Text>
        </Billboard>
      ))}
    </group>
  );
}

// Camera animation on site change
function CameraAnimator({ site, controlsRef }: { site: SacredSite; controlsRef: React.MutableRefObject<{ target: THREE.Vector3; object: { position: THREE.Vector3 } } | null> }) {
  const prevSite = useRef(site.id);
  const animating = useRef(false);
  const startPos = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const progress = useRef(0);

  const CAMERA_POSITIONS: Record<string, [number, number, number]> = {
    kaabah: [4, 3, 6],
    "masjid-nabawi": [5, 5, 10],
    "mount-uhud": [0, 6, 12],
    "cave-hira": [3, 5, 8],
    "cave-thawr": [3, 4, 9],
    arafat: [3, 5, 12],
  };

  useFrame(() => {
    if (prevSite.current !== site.id) {
      prevSite.current = site.id;
      animating.current = true;
      progress.current = 0;
      if (controlsRef.current) {
        startPos.current.copy(controlsRef.current.object.position);
      }
      const target = CAMERA_POSITIONS[site.id] || [0, 3, 8];
      targetPos.current.set(target[0], target[1], target[2]);
    }

    if (animating.current && controlsRef.current) {
      progress.current = Math.min(progress.current + 0.02, 1);
      const t = progress.current;
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in-out
      controlsRef.current.object.position.lerpVectors(startPos.current, targetPos.current, ease);
      if (progress.current >= 1) animating.current = false;
    }
  });

  return null;
}

function AnnotationMarker({ annotation, isActive, onClick }: {
  annotation: { position: [number, number, number]; label: string };
  isActive: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y = annotation.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.06;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={annotation.position}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[isActive ? 0.14 : 0.09, 10, 10]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={isActive ? 1.5 : 0.8} />
      </mesh>
      {/* Label with dark background for readability */}
      <Billboard position={[annotation.position[0], annotation.position[1] + 0.45, annotation.position[2]]}>
        <Text
          fontSize={isActive ? 0.2 : 0.15}
          color={isActive ? "#ffffff" : "#e2e8f0"}
          outlineWidth={0.04}
          outlineColor="#000000"
          anchorX="center"
          anchorY="bottom"
        >
          {annotation.label}
        </Text>
      </Billboard>
      {/* Vertical connecting line */}
      <mesh position={[annotation.position[0], annotation.position[1] + 0.2, annotation.position[2]]}>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 4]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Scene({ site, selectedAnnotation, onAnnotationClick }: {
  site: SacredSite;
  selectedAnnotation: number;
  onAnnotationClick: (i: number) => void;
}) {
  const colour = SITE_COLOURS[site.id] || "#f59e0b";
  const controlsRef = useRef(null);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 10, 5]} intensity={1.5} color="#f59e0b" distance={30} />
      <pointLight position={[-5, 6, -5]} intensity={0.7} color="#22d3ee" distance={25} />

      <SiteModel site={site} active={true} />
      <ParticleDust count={800} radius={8} colour={colour} />

      {/* Interactive annotation markers */}
      {(site.annotations || []).map((ann, i) => (
        <AnnotationMarker
          key={ann.label}
          annotation={ann}
          isActive={selectedAnnotation === i}
          onClick={() => onAnnotationClick(i)}
        />
      ))}

      <GroundGrid />
      <Compass />
      <CameraAnimator site={site} controlsRef={controlsRef} />

      {/* Crosshair */}
      <group>
        {[0, Math.PI / 2].map((rot, i) => (<mesh key={i} rotation={[0, 0, rot]}><planeGeometry args={[0.012, 0.4]} /><meshBasicMaterial color="#334155" transparent opacity={0.2} side={THREE.DoubleSide} /></mesh>))}
        <mesh><ringGeometry args={[0.15, 0.17, 32]} /><meshBasicMaterial color="#334155" transparent opacity={0.15} side={THREE.DoubleSide} /></mesh>
      </group>

      <Stars radius={60} depth={40} count={2000} factor={3} fade speed={0.2} />
      <OrbitControls ref={controlsRef} enablePan minDistance={3} maxDistance={20} autoRotate={false} keyEvents={false} />
      <EffectComposer><Bloom luminanceThreshold={0.08} luminanceSmoothing={0.95} intensity={0.9} mipmapBlur /></EffectComposer>
    </>
  );
}

// --- Main component: split layout, no overlapping ---
export function SacredSites3D() {
  const [selectedSite, setSelectedSite] = useState<SacredSite>(sacredSites[0]);
  const [selectedAnnotation, setSelectedAnnotation] = useState(-1);

  return (
    <div className="flex h-[calc(100vh-2rem)] w-full gap-3 overflow-hidden rounded-xl">
      {/* 3D Canvas — left side */}
      <div className="relative flex-1 overflow-hidden rounded-xl bg-[#030308]">
        <Canvas
          camera={{ position: [0, 3, 8], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor("#030308");
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.4;
          }}
        >
          <Scene site={selectedSite} selectedAnnotation={selectedAnnotation} onAnnotationClick={(i) => setSelectedAnnotation(i === selectedAnnotation ? -1 : i)} />
        </Canvas>

        {/* HUD overlays on canvas */}
        <div className="pointer-events-none absolute left-4 top-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">Sacred Sites</p>
        </div>
        <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] text-muted-foreground/40">
          DRAG TO ROTATE · SCROLL TO ZOOM
        </div>
        <div className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] text-muted-foreground/40">
          {sacredSites.findIndex(s => s.id === selectedSite.id) + 1} / {sacredSites.length}
        </div>
        {/* Coordinates HUD */}
        <div className="pointer-events-none absolute right-4 top-3 font-mono text-[10px]">
          <span className="text-muted-foreground/50">{selectedSite.lat.toFixed(4)}°N {selectedSite.lon.toFixed(4)}°E</span>
          {selectedSite.elevation && <span className="ml-2 text-muted-foreground/50">{selectedSite.elevation}m</span>}
        </div>
      </div>

      {/* Info panel — right side, no overlap */}
      <div className="w-80 shrink-0 overflow-y-auto rounded-xl border border-border bg-card p-5">
        {/* Site selector */}
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-amber-500/80">◈ Select Site</p>
        <div className="grid grid-cols-2 gap-1">
          {sacredSites.map((site) => (
            <button
              key={site.id}
              onClick={() => { setSelectedSite(site); setSelectedAnnotation(-1); }}
              className={`rounded px-2 py-1.5 text-left font-mono text-[10px] transition-colors ${
                selectedSite.id === site.id
                  ? "bg-white/10 font-bold text-foreground"
                  : "text-muted-foreground hover:bg-white/5"
              }`}
              style={selectedSite.id === site.id ? { borderLeft: `2px solid ${SITE_COLOURS[site.id]}` } : undefined}
            >
              {site.name}
            </button>
          ))}
        </div>

        {/* Arabic name */}
        <div className="mt-5">
          <p className="font-mono text-2xl font-bold text-foreground" dir="rtl">{selectedSite.nameArabic}</p>
          <p className="mt-1 text-sm font-medium text-foreground">{selectedSite.name}</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{selectedSite.description}</p>
        </div>

        {selectedSite.dimensions && (
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">{selectedSite.dimensions}</p>
        )}

        {/* Elevation profile for mountains */}
        {selectedSite.elevation && selectedSite.modelType === "mountain" && (
          <div className="mt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Elevation Profile</p>
            <div className="mt-1.5 flex h-12 items-end gap-px">
              {Array.from({ length: 30 }, (_, i) => {
                const x = (i / 29) * 2 - 1;
                const peak = Math.max(0, 1 - Math.abs(x) * (selectedSite.id === "cave-hira" ? 1.2 : 0.8));
                const h = (selectedSite.id === "cave-hira" ? peak * peak * peak : peak * peak) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${Math.max(h, 2)}%`,
                      backgroundColor: SITE_COLOURS[selectedSite.id] || "#f59e0b",
                      opacity: 0.5 + (h / 200),
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-1 flex justify-between font-mono text-[9px] text-muted-foreground/50">
              <span>0m</span>
              <span>{selectedSite.elevation}m</span>
            </div>
          </div>
        )}

        {/* History */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">History</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{selectedSite.history}</p>
        </div>

        {/* Qur'anic References */}
        {selectedSite.quranicReferences && selectedSite.quranicReferences.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Qur&apos;anic References</p>
            <ul className="mt-2 space-y-1.5">
              {selectedSite.quranicReferences.map((ref) => (
                <li key={ref} className="flex items-start gap-2 text-[11px] text-cyan-400/80">
                  <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Selected annotation detail */}
        {selectedAnnotation >= 0 && selectedSite.annotations?.[selectedAnnotation] && (
          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="font-mono text-[10px] font-bold text-amber-500">
              {selectedSite.annotations[selectedAnnotation].label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {selectedSite.annotations[selectedAnnotation].detail}
            </p>
          </div>
        )}

        {/* Interactive points */}
        {selectedSite.annotations && selectedSite.annotations.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Interactive Points</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedSite.annotations.map((ann, i) => (
                <button
                  key={ann.label}
                  onClick={() => setSelectedAnnotation(i === selectedAnnotation ? -1 : i)}
                  className={`rounded px-2 py-1 font-mono text-[10px] transition-colors ${
                    selectedAnnotation === i
                      ? "bg-amber-500/20 text-amber-500"
                      : "bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {ann.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Key Events */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Key Events</p>
          <ul className="mt-2 space-y-1.5">
            {selectedSite.keyEvents.map((event) => (
              <li key={event} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                {event}
              </li>
            ))}
          </ul>
        </div>

        {/* Connected journeys */}
        {selectedSite.connectedJourneys.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Connected Journeys</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedSite.connectedJourneys.map((jId) => (
                <a key={jId} href="/journeys" className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground">
                  {jId}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
