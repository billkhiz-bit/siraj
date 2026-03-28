"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Map, {
  Marker,
  Source,
  Layer,
  NavigationControl,
  type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { surahs, meccanCount, medinanCount, totalAyat, type Surah } from "@/lib/data/surahs";

const MAKKAH = { lat: 21.4225, lon: 39.8262 };
const MADINAH = { lat: 24.4672, lon: 39.6112 };

// Dark map style — no labels (CARTO Dark Matter, free, no API key)
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

// Generate arc points between two coordinates
function generateArc(
  start: { lat: number; lon: number },
  end: { lat: number; lon: number },
  segments = 50
): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lat = start.lat + (end.lat - start.lat) * t;
    const lon = start.lon + (end.lon - start.lon) * t;
    points.push([lon, lat]);
  }
  return points;
}

// Distribute surahs in a circle around a city
function distributeAroundCity(
  centre: { lat: number; lon: number },
  surahList: Surah[],
  radiusDeg: number
): { surah: Surah; lat: number; lon: number }[] {
  return surahList.map((surah, i) => {
    const angle = (i / surahList.length) * Math.PI * 2;
    // Scale radius by ayat count slightly
    const r = radiusDeg * (0.7 + (surah.ayatCount / 286) * 0.3);
    return {
      surah,
      lat: centre.lat + Math.sin(angle) * r,
      lon: centre.lon + Math.cos(angle) * r * 1.1, // stretch for longitude
    };
  });
}

function CityMarker({
  city,
  colour,
  count,
  isHovered,
  onHover,
}: {
  city: { lat: number; lon: number; name: string; nameArabic: string };
  colour: string;
  count: number;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}) {
  return (
    <Marker latitude={city.lat} longitude={city.lon} anchor="center">
      <div
        className="group relative flex flex-col items-center"
        onMouseEnter={() => onHover(city.name)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Pulse rings */}
        <div
          className="absolute h-16 w-16 animate-ping rounded-full opacity-20"
          style={{ backgroundColor: colour }}
        />
        <div
          className="absolute h-12 w-12 animate-pulse rounded-full opacity-30"
          style={{ backgroundColor: colour }}
        />

        {/* Centre dot */}
        <div
          className="relative z-10 h-5 w-5 rounded-full border-2 border-white shadow-lg"
          style={{
            backgroundColor: colour,
            boxShadow: `0 0 20px ${colour}, 0 0 40px ${colour}50`,
          }}
        />

        {/* Label */}
        <div className="absolute -top-14 z-20 flex flex-col items-center">
          <span
            className="font-mono text-sm font-bold tracking-wider"
            style={{ color: colour, textShadow: `0 0 10px ${colour}` }}
          >
            {city.name.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            {city.nameArabic} · {count} surahs
          </span>
        </div>

        {/* Expanded info on hover */}
        {isHovered && (
          <div className="absolute top-8 z-20 whitespace-nowrap rounded border border-white/10 bg-black/90 px-3 py-2 backdrop-blur-sm">
            <p className="font-mono text-[10px] text-slate-400">
              {city.lat.toFixed(4)}°N {city.lon.toFixed(4)}°E
            </p>
          </div>
        )}
      </div>
    </Marker>
  );
}

function SurahDot({
  surah,
  lat,
  lon,
  colour,
  isHovered,
  onHover,
}: {
  surah: Surah;
  lat: number;
  lon: number;
  colour: string;
  isHovered: boolean;
  onHover: (s: Surah | null) => void;
}) {
  const size = 6 + (surah.ayatCount / 286) * 14;
  return (
    <Marker latitude={lat} longitude={lon} anchor="center">
      <a
        href={`/surah/${surah.number}`}
        className="cursor-pointer transition-transform duration-150"
        style={{ transform: isHovered ? "scale(2.5)" : "scale(1)", display: "block" }}
        onMouseEnter={() => onHover(surah)}
        onMouseLeave={() => onHover(null)}
      >
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: colour,
            boxShadow: isHovered
              ? `0 0 12px ${colour}, 0 0 24px ${colour}80`
              : `0 0 6px ${colour}60`,
            opacity: isHovered ? 1 : 0.8,
          }}
        />
      </a>
    </Marker>
  );
}

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

export function RevelationMap() {
  const mapRef = useRef<MapRef>(null);
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

  const meccanSurahs = useMemo(() => surahs.filter((s) => s.type === "meccan"), []);
  const medinanSurahs = useMemo(() => surahs.filter((s) => s.type === "medinan"), []);

  const meccanPositions = useMemo(
    () => distributeAroundCity(MAKKAH, meccanSurahs, 0.8),
    [meccanSurahs]
  );
  const medinanPositions = useMemo(
    () => distributeAroundCity(MADINAH, medinanSurahs, 0.6),
    [medinanSurahs]
  );

  const meccanAyat = useMemo(
    () => meccanSurahs.reduce((sum, s) => sum + s.ayatCount, 0),
    [meccanSurahs]
  );
  const medinanAyat = useMemo(
    () => medinanSurahs.reduce((sum, s) => sum + s.ayatCount, 0),
    [medinanSurahs]
  );

  // Hijrah route GeoJSON
  const hijrahRoute = useMemo(
    () => ({
      type: "Feature" as const,
      properties: {},
      geometry: {
        type: "LineString" as const,
        coordinates: generateArc(MAKKAH, MADINAH),
      },
    }),
    []
  );

  // Fly to a city
  const flyTo = useCallback((lat: number, lon: number, zoom = 10) => {
    mapRef.current?.flyTo({
      center: [lon, lat],
      zoom,
      duration: 1500,
      pitch: 45,
    });
  }, []);

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-xl">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 22.9,
          longitude: 39.7,
          zoom: 7.2,
          pitch: 40,
          bearing: -10,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        maxZoom={14}
        minZoom={5}
      >
        <NavigationControl position="bottom-right" showCompass showZoom />

        {/* Hijrah route */}
        {layers.hijrah && (
          <Source type="geojson" data={hijrahRoute}>
            <Layer
              id="hijrah-line"
              type="line"
              paint={{
                "line-color": "#f59e0b",
                "line-width": 3,
                "line-opacity": 0.8,
                "line-dasharray": [2, 1],
              }}
            />
            <Layer
              id="hijrah-glow"
              type="line"
              paint={{
                "line-color": "#f59e0b",
                "line-width": 10,
                "line-opacity": 0.15,
                "line-blur": 6,
              }}
            />
          </Source>
        )}

        {/* Meccan surah dots */}
        {layers.meccan &&
          meccanPositions.map(({ surah, lat, lon }) => (
            <SurahDot
              key={surah.number}
              surah={surah}
              lat={lat}
              lon={lon}
              colour="#22d3ee"
              isHovered={hoveredSurah?.number === surah.number}
              onHover={setHoveredSurah}
            />
          ))}

        {/* Medinan surah dots */}
        {layers.medinan &&
          medinanPositions.map(({ surah, lat, lon }) => (
            <SurahDot
              key={surah.number}
              surah={surah}
              lat={lat}
              lon={lon}
              colour="#a78bfa"
              isHovered={hoveredSurah?.number === surah.number}
              onHover={setHoveredSurah}
            />
          ))}

        {/* City markers (rendered last so they're on top) */}
        {layers.cities && (
          <>
            <CityMarker
              city={{ ...MAKKAH, name: "Makkah", nameArabic: "مكة المكرمة" }}
              colour="#22d3ee"
              count={meccanCount}
              isHovered={hoveredCity === "Makkah"}
              onHover={setHoveredCity}
            />
            <CityMarker
              city={{ ...MADINAH, name: "Madinah", nameArabic: "المدينة المنورة" }}
              colour="#a78bfa"
              count={medinanCount}
              isHovered={hoveredCity === "Madinah"}
              onHover={setHoveredCity}
            />
          </>
        )}
      </Map>

      {/* === Overlay panels === */}

      {/* Top-left: Title */}
      <div className="pointer-events-none absolute left-5 top-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          Revelation Map
        </p>
      </div>

      {/* Left panel: Stats */}
      <div className="pointer-events-none absolute left-3 top-3 w-44 space-y-4 md:left-5 md:top-12 md:w-56">
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

        <div>
          <button
            onClick={() => flyTo(MAKKAH.lat, MAKKAH.lon)}
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-wider text-cyan-400/80 transition-colors hover:text-cyan-400"
          >
            ◈ Makkah Revelations →
          </button>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Surahs</span>
              <span className="text-cyan-400">{meccanCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ayat</span>
              <span className="text-cyan-400">{meccanAyat.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => flyTo(MADINAH.lat, MADINAH.lon)}
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-wider text-violet-400/80 transition-colors hover:text-violet-400"
          >
            ◈ Madinah Revelations →
          </button>
          <div className="mt-2 space-y-1 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Surahs</span>
              <span className="text-violet-400">{medinanCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ayat</span>
              <span className="text-violet-400">{medinanAyat.toLocaleString()}</span>
            </div>
          </div>
        </div>

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

      {/* Right panel: Layers */}
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

        {/* Quick nav */}
        <div className="mt-4 space-y-1.5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
            ◉ Quick Nav
          </p>
          <button
            onClick={() => flyTo(22.9, 39.7, 7.2)}
            className="block w-full text-left font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Overview
          </button>
          <button
            onClick={() => flyTo(MAKKAH.lat, MAKKAH.lon, 10)}
            className="block w-full text-left font-mono text-[11px] text-cyan-400/60 transition-colors hover:text-cyan-400"
          >
            Zoom to Makkah
          </button>
          <button
            onClick={() => flyTo(MADINAH.lat, MADINAH.lon, 10)}
            className="block w-full text-left font-mono text-[11px] text-violet-400/60 transition-colors hover:text-violet-400"
          >
            Zoom to Madinah
          </button>
        </div>
      </div>

      {/* Hovered surah tooltip */}
      {hoveredSurah && (
        <div className="pointer-events-none absolute bottom-5 left-5 rounded border border-white/10 bg-black/90 px-4 py-3 backdrop-blur-sm">
          <p className="font-mono text-lg font-bold text-foreground">
            {hoveredSurah.nameArabic}
          </p>
          <p className="font-mono text-xs text-foreground">
            {hoveredSurah.number}. {hoveredSurah.nameEnglish}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            &ldquo;{hoveredSurah.meaning}&rdquo; · {hoveredSurah.ayatCount} ayat ·
            Revealed #{hoveredSurah.revelationOrder}
          </p>
          <p className="mt-1 font-mono text-[10px] text-amber-500/70">
            Click to explore this surah
          </p>
        </div>
      )}
    </div>
  );
}
