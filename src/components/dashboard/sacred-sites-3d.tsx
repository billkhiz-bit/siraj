"use client";

import { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { sacredSites, type SacredSite } from "@/lib/data/sacred-sites";

// --- Accurate wireframe models ---

/**
 * Ka'bah — accurate proportions based on known measurements.
 * Real: 13.1m (N wall) x 11.03m (E/W) x 12.86m tall.
 * Door: on NE wall, 2.13m above ground, 1.7m wide x 1.8m tall.
 * Hajar al-Aswad: eastern corner, 1.5m above ground.
 * Hijr Ismail: semicircular wall on NW side, ~1.3m high, ~3m from Ka'bah.
 * Mizab (rain spout): on NW wall near top.
 * Maqam Ibrahim: ~3m from the door.
 * Multazam: wall between door and Hajar al-Aswad corner.
 * Scale: 1 unit = ~5m
 */
function KaabahModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  const e = active ? 0.6 : 0.3;

  return (
    <group ref={groupRef}>
      {/* Main body — slightly rectangular, not a perfect cube */}
      <mesh>
        <boxGeometry args={[2.62, 2.57, 2.2]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={e} wireframe />
      </mesh>

      {/* Kiswah hizam (gold embroidered band, 2/3 up the wall) */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.64, 0.12, 2.22]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} wireframe />
      </mesh>

      {/* Door — NE wall, raised 2.13m above ground (scaled) */}
      <mesh position={[1.32, -0.35, -0.15]}>
        <boxGeometry args={[0.04, 0.7, 0.34]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} />
      </mesh>
      {/* Door frame outline */}
      <mesh position={[1.33, -0.35, -0.15]}>
        <boxGeometry args={[0.02, 0.75, 0.38]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} wireframe />
      </mesh>

      {/* Hajar al-Aswad (Black Stone) — eastern corner, 1.5m high */}
      <mesh position={[1.31, -0.85, 1.1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </mesh>
      {/* Silver frame around Black Stone */}
      <mesh position={[1.31, -0.85, 1.1]}>
        <torusGeometry args={[0.14, 0.02, 8, 16]} />
        <meshStandardMaterial color="#c0c0c0" emissive="#c0c0c0" emissiveIntensity={0.6} wireframe />
      </mesh>

      {/* Hijr Ismail (Hateem) — semicircular low wall, NW side */}
      <mesh position={[0, -1.05, 1.55]} rotation={[Math.PI / 2, 0, 0]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(
            Array.from({ length: 20 }, (_, i) => {
              const angle = (i / 19) * Math.PI;
              return new THREE.Vector3(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 0.5);
            })
          ), 20, 0.06, 6, false
        ]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} wireframe />
      </mesh>

      {/* Mizab (rain spout) — gold spout on NW wall near top */}
      <mesh position={[0, 1.15, 1.12]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.5]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} />
      </mesh>

      {/* Maqam Ibrahim — small glass/gold enclosure ~3m from door */}
      <mesh position={[2.2, -1.15, -0.15]}>
        <boxGeometry args={[0.25, 0.3, 0.25]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} wireframe />
      </mesh>
      <Billboard position={[2.2, -0.7, -0.15]}>
        <Text fontSize={0.12} color="#f59e0b">Maqam Ibrahim</Text>
      </Billboard>

      {/* Mataf (circumambulation area) — concentric rings */}
      {[3, 4, 5, 6.5].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
          <ringGeometry args={[r - 0.02, r, 64]} />
          <meshStandardMaterial color="#1e293b" emissive="#1e293b" emissiveIntensity={0.15} wireframe />
        </mesh>
      ))}

      {/* Tawaf direction arrow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, -1.28, 0]}>
        <coneGeometry args={[0.15, 0.3, 3]} />
        <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.3} wireframe />
      </mesh>

      {/* Corner labels */}
      {[
        { pos: [1.4, -1.6, 1.2] as [number, number, number], label: "Hajar al-Aswad" },
        { pos: [-1.4, -1.6, 1.2] as [number, number, number], label: "Rukn al-Iraqi" },
        { pos: [-1.4, -1.6, -1.2] as [number, number, number], label: "Rukn al-Shami" },
        { pos: [1.4, -1.6, -1.2] as [number, number, number], label: "Rukn al-Yamani" },
      ].map(({ pos, label }) => (
        <Billboard key={label} position={pos}>
          <Text fontSize={0.09} color="#64748b">{label}</Text>
        </Billboard>
      ))}
    </group>
  );
}

/**
 * Masjid al-Nabawi — distinctive features:
 * - Large rectangular courtyard with retractable umbrellas
 * - Green Dome (SE corner, over the Prophet's burial chamber)
 * - 10 minarets (current form, 105m tall)
 * - Flat roof with 27 sliding domes
 * - The Rawdah between pulpit and burial chamber
 */
function MasjidNabawiModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  const e = active ? 0.45 : 0.2;

  return (
    <group ref={groupRef}>
      {/* Main rectangular structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 1.2, 5]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e} wireframe />
      </mesh>

      {/* Courtyard inner space */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[6, 0.8, 3.5]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={e * 0.5} wireframe />
      </mesh>

      {/* Green Dome — the Prophet's burial chamber */}
      <mesh position={[2, 1.2, 0.5]}>
        <sphereGeometry args={[0.7, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.8} wireframe />
      </mesh>
      {/* Dome drum */}
      <mesh position={[2, 0.75, 0.5]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 20]} />
        <meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.5} wireframe />
      </mesh>
      {/* Crescent on top of dome */}
      <mesh position={[2, 1.95, 0.5]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
      </mesh>
      <Billboard position={[2, 2.2, 0.5]}>
        <Text fontSize={0.15} color="#16a34a">Green Dome</Text>
      </Billboard>

      {/* Silver/white dome (next to Green Dome) */}
      <mesh position={[2, 1.1, -0.5]}>
        <sphereGeometry args={[0.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.3} wireframe />
      </mesh>

      {/* Sliding roof domes (3x3 grid on main area) */}
      {[-2, 0, 2].map(x =>
        [-1, 0, 1].map(z => (
          <mesh key={`${x}-${z}`} position={[x - 1, 0.85, z * 0.8]}>
            <sphereGeometry args={[0.3, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e * 0.6} wireframe />
          </mesh>
        ))
      )}

      {/* 10 Minarets — 4 corner, 6 along walls */}
      {[
        [-4, 0, -2.5], [-4, 0, 2.5], [4, 0, -2.5], [4, 0, 2.5], // corners
        [-2, 0, -2.5], [0, 0, -2.5], [2, 0, -2.5], // front wall
        [-2, 0, 2.5], [0, 0, 2.5], [2, 0, 2.5],     // back wall
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Minaret shaft */}
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 3.5, 8]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e} wireframe />
          </mesh>
          {/* Balcony */}
          <mesh position={[0, 2.8, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 8]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={e * 1.5} wireframe />
          </mesh>
          {/* Top cone */}
          <mesh position={[0, 3.9, 0]}>
            <coneGeometry args={[0.08, 0.4, 8]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} wireframe />
          </mesh>
          {/* Crescent */}
          <mesh position={[0, 4.15, 0]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Rawdah (Garden of Paradise) — highlighted floor section */}
      <mesh position={[2.2, -0.55, 0]}>
        <boxGeometry args={[1.5, 0.03, 1.5]} />
        <meshStandardMaterial color="#16a34a" emissive="#16a34a" emissiveIntensity={0.6} />
      </mesh>
      <Billboard position={[2.2, -0.2, 0]}>
        <Text fontSize={0.12} color="#16a34a">Al-Rawdah</Text>
      </Billboard>

      {/* Courtyard umbrella poles (outside area) */}
      {[-3, -1.5, 0, 1.5, 3].map(x => (
        <mesh key={x} position={[x, 0.3, -3.2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 4]} />
          <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.2} wireframe />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Mount Uhud — distinctive ridge profile:
 * - Long east-west ridge, ~7km
 * - Flat-topped with steep southern face
 * - Red-brown colour
 * - Archers' hill (Jabal al-Rumah) is smaller, separate, to the south
 */
function MountUhudModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
  });

  const mainRidge = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 6, 60, 30);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      // Long ridge running east-west (x axis)
      const ridgeFactor = Math.exp(-z * z / 1.5); // steep dropoff north-south
      const eastWest = 1 - Math.abs(x) / 7; // taper at ends
      let h = ridgeFactor * eastWest * 3.5;
      // Flat top characteristic
      h = Math.min(h, 3.2);
      // Rocky noise
      h += Math.sin(x * 5 + z * 3) * 0.15;
      h += Math.cos(x * 8 - z * 6) * 0.1;
      // Steep southern face
      if (z < 0) h *= 1 + Math.abs(z) * 0.1;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Archers' hill (Jabal al-Rumah)
  const archersHill = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2, 15, 15);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      const dist = Math.sqrt(x * x + z * z);
      let h = Math.max(0, 1 - dist / 0.9) * 1.2;
      h += Math.sin(x * 6) * 0.05;
      pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const e = active ? 0.45 : 0.2;

  return (
    <group ref={groupRef}>
      {/* Main Uhud ridge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={mainRidge}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={e} wireframe />
      </mesh>
      {/* Archers' hill — south of main ridge */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, 0, -3.5]} geometry={archersHill}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={e * 1.2} wireframe />
      </mesh>
      <Billboard position={[1, 1.5, -3.5]}>
        <Text fontSize={0.2} color="#f59e0b">Archers&apos; Hill</Text>
      </Billboard>
      {/* Martyrs' cemetery marker */}
      <Billboard position={[-2, 0.5, -2]}>
        <Text fontSize={0.15} color="#ef4444">Martyrs&apos; Cemetery</Text>
      </Billboard>
      {/* Battlefield area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -2.5]}>
        <planeGeometry args={[8, 3]} />
        <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.1} wireframe />
      </mesh>
      <Billboard position={[0, 0.3, -2.5]}>
        <Text fontSize={0.15} color="#64748b">Battlefield</Text>
      </Billboard>
    </group>
  );
}

/**
 * Cave of Hira (Jabal al-Nur) — very steep conical mountain.
 * The cave is a small opening near the summit.
 * 634m elevation, distinctly narrow and pointed.
 */
function CaveHiraModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.07;
  });

  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 40, 40);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      const dist = Math.sqrt(x * x + z * z);
      // Very steep conical peak
      const peak = Math.max(0, 1 - dist / 2.5);
      let h = peak * peak * peak * 5; // cubic falloff = steep sides
      // Rocky texture
      h += Math.sin(x * 8 + z * 6) * 0.12 * peak;
      h += Math.cos(x * 12 - z * 9) * 0.08 * peak;
      // Surrounding lower hills
      h += Math.max(0, 0.3 - dist / 8) * Math.sin(x * 2 + z * 3) * 0.5;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const e = active ? 0.5 : 0.25;

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={terrain}>
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={e} wireframe />
      </mesh>
      {/* Cave entrance marker near summit */}
      <mesh position={[0.3, 4.2, 0.2]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
      </mesh>
      <Billboard position={[0.3, 4.7, 0.2]}>
        <Text fontSize={0.2} color="#f59e0b">Cave of Hira</Text>
      </Billboard>
      <Billboard position={[0, -0.3, 3]}>
        <Text fontSize={0.18} color="#22d3ee">Jabal al-Nur</Text>
      </Billboard>
    </group>
  );
}

/**
 * Cave of Thawr — broader, rounder mountain than Jabal al-Nur.
 * 748m elevation. The cave is lower on the mountain (not at summit).
 */
function CaveThawrModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.07;
  });

  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 45, 45);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      const dist = Math.sqrt(x * x + z * z);
      // Broader, rounder peak than Hira
      const peak = Math.max(0, 1 - dist / 3.5);
      let h = peak * peak * 3.5;
      // Multiple ridges
      h += Math.sin(x * 3 + z * 2) * 0.25 * peak;
      h += Math.cos(x * 5 - z * 4) * 0.15 * peak;
      // Foothills
      h += Math.max(0, 0.4 - dist / 10) * 0.8;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const e = active ? 0.45 : 0.2;

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={terrain}>
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={e} wireframe />
      </mesh>
      {/* Cave entrance — lower on the mountain, not at summit */}
      <mesh position={[0.8, 1.8, 1]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
      </mesh>
      <Billboard position={[0.8, 2.3, 1]}>
        <Text fontSize={0.2} color="#f59e0b">Cave of Thawr</Text>
      </Billboard>
      <Billboard position={[0, -0.3, 4]}>
        <Text fontSize={0.18} color="#a78bfa">Jabal Thawr</Text>
      </Billboard>
    </group>
  );
}

/**
 * Plain of Arafat — vast flat plain with Jabal al-Rahmah rising from it.
 * Jabal al-Rahmah is a small granite hill (~70m), distinctive white pillar at top.
 */
function ArafatModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const terrain = useMemo(() => {
    const geo = new THREE.PlaneGeometry(14, 14, 60, 60);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getY(i);
      // Mostly flat desert plain
      let h = Math.sin(x * 0.3) * Math.cos(z * 0.4) * 0.08;
      h += Math.sin(x * 1.5 + z * 1.2) * 0.03;
      // Jabal al-Rahmah (small rocky hill near centre)
      const dist = Math.sqrt((x - 0.5) * (x - 0.5) + z * z);
      const hill = Math.max(0, 1 - dist / 1.2);
      h += hill * hill * 2;
      // Rocky texture on the hill
      h += hill * Math.sin(x * 10 + z * 8) * 0.08;
      pos.setZ(i, Math.max(h, 0));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const e = active ? 0.4 : 0.18;

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={terrain}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={e} wireframe />
      </mesh>
      {/* White pillar on Jabal al-Rahmah */}
      <mesh position={[0.5, 2.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <Billboard position={[0.5, 3, 0]}>
        <Text fontSize={0.22} color="#f59e0b">Jabal al-Rahmah</Text>
      </Billboard>
      <Billboard position={[0.5, 2.7, 0]}>
        <Text fontSize={0.13} color="#64748b">Mount of Mercy</Text>
      </Billboard>
      {/* Pilgrim gathering area indicators */}
      {[3, 4.5, 6].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.02, 0]}>
          <ringGeometry args={[r - 0.02, r, 48]} />
          <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.1} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function SiteModel({ site, active }: { site: SacredSite; active: boolean }) {
  switch (site.id) {
    case "kaabah": return <KaabahModel active={active} />;
    case "masjid-nabawi": return <MasjidNabawiModel active={active} />;
    case "mount-uhud": return <MountUhudModel active={active} />;
    case "cave-hira": return <CaveHiraModel active={active} />;
    case "cave-thawr": return <CaveThawrModel active={active} />;
    case "arafat": return <ArafatModel active={active} />;
    default: return null;
  }
}

function Scene({ site }: { site: SacredSite }) {
  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[5, 10, 5]} intensity={1.5} color="#f59e0b" distance={30} />
      <pointLight position={[-5, 6, -5]} intensity={0.7} color="#22d3ee" distance={25} />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#a78bfa" distance={15} />

      <SiteModel site={site} active={true} />

      {/* Crosshair */}
      <group>
        {[0, Math.PI / 2].map((rot, i) => (
          <mesh key={i} rotation={[0, 0, rot]}>
            <planeGeometry args={[0.015, 0.5]} />
            <meshBasicMaterial color="#334155" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
        ))}
        <mesh>
          <ringGeometry args={[0.18, 0.2, 32]} />
          <meshBasicMaterial color="#334155" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.2} />

      <OrbitControls enablePan={false} minDistance={3} maxDistance={20} autoRotate={false} keyEvents={false} />
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

      {/* Left panel */}
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

      {/* Right panel */}
      <div className="pointer-events-auto absolute right-5 top-12 w-72 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          ◉ {selectedSite.nameArabic}
        </p>
        <p className="mt-1 font-mono text-sm font-bold text-foreground">{selectedSite.name}</p>
        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{selectedSite.description}</p>

        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">History</p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground">{selectedSite.history}</p>
        </div>

        {selectedSite.quranicReferences && selectedSite.quranicReferences.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Qur&apos;anic References</p>
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

        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">Key Events</p>
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

      <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[10px] text-muted-foreground/40">
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[10px] text-muted-foreground/40">
        {sacredSites.findIndex(s => s.id === selectedSite.id) + 1} / {sacredSites.length}
      </div>
    </div>
  );
}
