"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Seeded pseudo-random for deterministic star positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pre-computed star data to avoid hydration mismatch
const STAR_DATA = Array.from({ length: 120 }, (_, i) => ({
  width: seededRandom(i * 7 + 1) * 2 + 1,
  height: seededRandom(i * 7 + 2) * 2 + 1,
  left: seededRandom(i * 7 + 3) * 100,
  top: seededRandom(i * 7 + 4) * 100,
  opacity: seededRandom(i * 7 + 5) * 0.5 + 0.1,
  duration: 2 + seededRandom(i * 7 + 6) * 3,
  delay: seededRandom(i * 7 + 7) * 3,
}));

function Stars() {
  const stars = STAR_DATA;

  return (
    <div className="absolute inset-0">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: s.width,
            height: s.height,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function LandingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"bismillah" | "title" | "ready">("bismillah");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 2500);
    const t2 = setTimeout(() => setPhase("ready"), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="relative flex h-dvh w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#030308]"
      onClick={() => router.push("/dashboard")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") router.push("/dashboard");
      }}
      role="button"
      tabIndex={0}
    >
      {/* Starfield background */}
      <Stars />

      {/* Bismillah phase */}
      <div
        className={`absolute transition-all duration-1000 ${
          phase === "bismillah"
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
      >
        <p
          className="text-center text-4xl leading-loose text-amber-500/90 md:text-5xl"
          dir="rtl"
          lang="ar"
          style={{ fontFamily: "serif" }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </p>
        <p className="mt-4 text-center font-mono text-sm text-muted-foreground">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      </div>

      {/* Title phase */}
      <div
        className={`absolute flex flex-col items-center transition-all duration-1000 ${
          phase === "title" || phase === "ready"
            ? "scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-amber-500/60">
          Illuminating the Qur&apos;an &amp; Hadith
        </p>
        <h1
          className="mt-4 font-mono text-7xl font-bold tracking-tight text-amber-500 md:text-8xl"
          style={{
            textShadow: "0 0 40px rgba(245, 158, 11, 0.3), 0 0 80px rgba(245, 158, 11, 0.1)",
          }}
        >
          SIRAJ
        </h1>
        <p className="mt-2 text-center text-2xl text-muted-foreground/60" dir="rtl" style={{ fontFamily: "serif" }}>
          سراج
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground/40">
          &ldquo;We sent you as a shining lamp&rdquo; (33:46)
        </p>

        {/* Enter prompt */}
        <div
          className={`mt-12 transition-all duration-700 ${
            phase === "ready" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
            <p className="font-mono text-[11px] tracking-wider text-muted-foreground/50">
              <span className="md:hidden">TAP TO EXPLORE</span>
              <span className="hidden md:inline">CLICK OR PRESS ENTER</span>
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-8 flex flex-wrap justify-center gap-4 px-4 transition-all duration-700 delay-300 md:gap-8 md:px-0 ${
            phase === "ready" ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-foreground">114</p>
            <p className="font-mono text-[10px] text-muted-foreground/50">SURAHS</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-foreground">6,236</p>
            <p className="font-mono text-[10px] text-muted-foreground/50">AYAT</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-foreground">99</p>
            <p className="font-mono text-[10px] text-muted-foreground/50">NAMES</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-foreground">25</p>
            <p className="font-mono text-[10px] text-muted-foreground/50">PROPHETS</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-foreground">10</p>
            <p className="font-mono text-[10px] text-muted-foreground/50">JOURNEYS</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-lg font-bold text-foreground">5</p>
            <p className="font-mono text-[10px] text-muted-foreground/50">SACRED SITES</p>
          </div>
        </div>
      </div>

    </div>
  );
}
