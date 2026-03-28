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
import { journeys, type Journey, type Waypoint, type KeyFigure } from "@/lib/data/journeys";

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

function generateRoute(waypoints: Waypoint[]): [number, number][] {
  const coords: [number, number][] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];
    const segments = 30;
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      coords.push([
        start.lon + (end.lon - start.lon) * t,
        start.lat + (end.lat - start.lat) * t,
      ]);
    }
  }
  return coords;
}

function WaypointMarker({
  waypoint,
  colour,
  isHovered,
  onHover,
}: {
  waypoint: Waypoint;
  colour: string;
  isHovered: boolean;
  onHover: (w: Waypoint | null) => void;
}) {
  const size = waypoint.isOrigin || waypoint.isDestination ? 14 : 10;
  return (
    <Marker latitude={waypoint.lat} longitude={waypoint.lon} anchor="center">
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => onHover(waypoint)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Pulse for origin/destination */}
        {(waypoint.isOrigin || waypoint.isDestination) && (
          <div
            className="absolute animate-ping rounded-full opacity-20"
            style={{ width: size * 2, height: size * 2, backgroundColor: colour }}
          />
        )}

        <div
          className="relative z-10 cursor-pointer rounded-full border border-white/50 transition-transform"
          style={{
            width: isHovered ? size * 2 : size,
            height: isHovered ? size * 2 : size,
            backgroundColor: colour,
            boxShadow: `0 0 ${isHovered ? 16 : 8}px ${colour}`,
          }}
        />

        {/* Label — always show for origin/destination, hover for others */}
        {(waypoint.isOrigin || waypoint.isDestination || isHovered) && (
          <div className="absolute -top-8 z-20 whitespace-nowrap text-center">
            <span
              className="font-mono text-[11px] font-bold"
              style={{ color: colour, textShadow: `0 0 8px ${colour}` }}
            >
              {waypoint.name}
            </span>
          </div>
        )}

        {isHovered && (
          <div className="absolute top-6 z-20 w-48 rounded border border-white/10 bg-black/90 px-3 py-2 backdrop-blur-sm">
            <p className="font-mono text-xs font-bold text-foreground">
              {waypoint.nameArabic} · {waypoint.name}
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              {waypoint.description}
            </p>
          </div>
        )}
      </div>
    </Marker>
  );
}

function JourneySelector({
  journey,
  isActive,
  onClick,
}: {
  journey: Journey;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded px-2 py-2 transition-colors ${
        isActive ? "bg-white/5" : "hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{
            backgroundColor: journey.colour,
            boxShadow: isActive ? `0 0 8px ${journey.colour}` : "none",
          }}
        />
        <span
          className={`font-mono text-[11px] font-bold ${
            isActive ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {journey.name}
        </span>
      </div>
      <p className="ml-4 font-mono text-[10px] text-muted-foreground/60">
        {journey.year}
      </p>
    </button>
  );
}

function KeyFigureCard({ figure }: { figure: KeyFigure }) {
  return (
    <div className="rounded border border-white/5 bg-white/5 px-3 py-2">
      <p className="font-mono text-[11px] font-bold text-foreground">
        {figure.name}
      </p>
      <p className="font-mono text-[10px] text-amber-500/80">{figure.role}</p>
      <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted-foreground">
        {figure.description}
      </p>
    </div>
  );
}

export function JourneysMap() {
  const mapRef = useRef<MapRef>(null);
  const [activeJourney, setActiveJourney] = useState<Journey | null>(null); // null = all journeys
  const [hoveredWaypoint, setHoveredWaypoint] = useState<Waypoint | null>(null);

  const showAll = activeJourney === null;
  const displayedJourneys = useMemo(
    () => (activeJourney === null ? journeys : [activeJourney]),
    [activeJourney]
  );

  // All key figures across displayed journeys (deduplicated by name)
  const allKeyFigures = useMemo(() => {
    const seen = new Set<string>();
    const figures: (KeyFigure & { colour: string })[] = [];
    displayedJourneys.forEach((j) => {
      j.keyFigures.forEach((f) => {
        if (!seen.has(f.name)) {
          seen.add(f.name);
          figures.push({ ...f, colour: j.colour });
        }
      });
    });
    return figures;
  }, [displayedJourneys]);

  const selectJourney = useCallback(
    (journey: Journey | null) => {
      setActiveJourney(journey);
      if (journey === null) {
        // Zoom out to show all journeys (Aksum to Tabuk)
        mapRef.current?.flyTo({
          center: [38.5, 22],
          zoom: 4.8,
          pitch: 25,
          duration: 1500,
        });
        return;
      }
      const lats = journey.waypoints.map((w) => w.lat);
      const lons = journey.waypoints.map((w) => w.lon);
      const centreLat = (Math.min(...lats) + Math.max(...lats)) / 2;
      const centreLon = (Math.min(...lons) + Math.max(...lons)) / 2;
      const latSpan = Math.max(...lats) - Math.min(...lats);
      const zoom = latSpan > 5 ? 6 : latSpan > 2 ? 7.5 : 9;
      mapRef.current?.flyTo({
        center: [centreLon, centreLat],
        zoom,
        pitch: 35,
        duration: 1500,
      });
    },
    []
  );

  return (
    <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-xl">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 22,
          longitude: 38.5,
          zoom: 4.8,
          pitch: 25,
          bearing: -5,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        maxZoom={14}
        minZoom={4}
      >
        <NavigationControl position="bottom-right" showCompass showZoom />

        {/* Route lines for each displayed journey */}
        {displayedJourneys.map((j) => {
          const routeData = {
            type: "Feature" as const,
            properties: {},
            geometry: {
              type: "LineString" as const,
              coordinates: generateRoute(j.waypoints),
            },
          };
          return (
            <Source key={j.id} type="geojson" data={routeData}>
              <Layer
                id={`${j.id}-glow`}
                type="line"
                paint={{
                  "line-color": j.colour,
                  "line-width": 12,
                  "line-opacity": showAll ? 0.1 : 0.15,
                  "line-blur": 8,
                }}
              />
              <Layer
                id={`${j.id}-line`}
                type="line"
                paint={{
                  "line-color": j.colour,
                  "line-width": showAll ? 2.5 : 3,
                  "line-opacity": showAll ? 0.7 : 0.9,
                  "line-dasharray": [3, 1.5],
                }}
              />
            </Source>
          );
        })}

        {/* Waypoint markers for each displayed journey */}
        {displayedJourneys.flatMap((j) =>
          j.waypoints.map((wp) => (
            <WaypointMarker
              key={`${j.id}-${wp.name}`}
              waypoint={wp}
              colour={j.colour}
              isHovered={hoveredWaypoint?.name === wp.name}
              onHover={setHoveredWaypoint}
            />
          ))
        )}
      </Map>

      {/* === Overlay panels === */}

      {/* Top-left: Title */}
      <div className="pointer-events-none absolute left-5 top-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          Islamic Journeys
        </p>
      </div>

      {/* Left panel: Journey selector + description */}
      <div className="pointer-events-auto absolute left-3 top-3 w-48 space-y-3 md:left-5 md:top-12 md:w-64">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
            ◈ Select Journey
          </p>
          <div className="space-y-0.5">
            {/* All Journeys option */}
            <button
              onClick={() => selectJourney(null)}
              className={`w-full text-left rounded px-2 py-2 transition-colors ${
                showAll ? "bg-white/5" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-amber-500"
                  style={{ boxShadow: showAll ? "0 0 8px #f59e0b" : "none" }}
                />
                <span className={`font-mono text-[11px] font-bold ${showAll ? "text-foreground" : "text-muted-foreground"}`}>
                  All Journeys
                </span>
              </div>
              <p className="ml-4 font-mono text-[10px] text-muted-foreground/60">
                615–632 CE · {journeys.length} routes
              </p>
            </button>

            {journeys.map((j) => (
              <JourneySelector
                key={j.id}
                journey={j}
                isActive={activeJourney?.id === j.id}
                onClick={() => selectJourney(j)}
              />
            ))}
          </div>
        </div>

        {/* Journey description */}
        <div>
          {showAll ? (
            <>
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500/80">
                ◈ Overview
              </p>
              <div className="mt-2 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Journeys</span>
                  <span className="text-foreground">{journeys.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period</span>
                  <span className="text-foreground">615–632 CE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Key Figures</span>
                  <span className="text-foreground">{allKeyFigures.length}</span>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
                Ten defining journeys of early Islam, from the first migrations to Abyssinia, to the Night Journey, the Hijrah, the battles of Badr and Tabuk, the Treaty of Hudaybiyyah, the Conquest of Makkah, and the Farewell Pilgrimage. Together they span the entire prophetic mission from 615 to 632 CE.
              </p>
              {/* Colour legend */}
              <div className="mt-3 space-y-1">
                {journeys.map((j) => (
                  <div key={j.id} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-4 rounded-full" style={{ backgroundColor: j.colour }} />
                    <span className="font-mono text-[10px] text-muted-foreground">{j.name} ({j.year})</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: activeJourney.colour + "cc" }}
              >
                ◈ {activeJourney.nameArabic}
              </p>
              <div className="mt-2 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="text-foreground">
                    {activeJourney.year}
                    {activeJourney.yearHijri && ` (${activeJourney.yearHijri})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Waypoints</span>
                  <span className="text-foreground">{activeJourney.waypoints.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Key Figures</span>
                  <span className="text-foreground">{activeJourney.keyFigures.length}</span>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
                {activeJourney.description}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right panel: Key figures */}
      <div className="pointer-events-auto absolute right-3 top-3 hidden w-64 max-h-[calc(100vh-6rem)] overflow-y-auto md:right-5 md:top-12 md:block">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500">
          ◉ Key Figures
        </p>
        <div className="space-y-2">
          {allKeyFigures.map((f) => (
            <KeyFigureCard key={f.name} figure={f} />
          ))}
        </div>
      </div>

      {/* Bottom-right */}
      <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[10px] text-muted-foreground/40">
        DRAG TO PAN · SCROLL TO ZOOM
      </div>
    </div>
  );
}
