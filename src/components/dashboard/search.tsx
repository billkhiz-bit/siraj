"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { surahs } from "@/lib/data/surahs";
import { quranicWords } from "@/lib/data/words";
import { prophets } from "@/lib/data/prophets";
import { narrators } from "@/lib/data/narrators";
import { namesOfAllah } from "@/lib/data/names-of-allah";

interface SearchResult {
  type: "surah" | "word" | "prophet" | "narrator" | "name";
  label: string;
  sublabel: string;
  href?: string;
  icon: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  surahs.forEach((s) => {
    results.push({
      type: "surah",
      label: `${s.number}. ${s.nameEnglish} · ${s.nameArabic}`,
      sublabel: `${s.meaning} · ${s.ayatCount} ayat · ${s.type}`,
      href: `/surah/${s.number}`,
      icon: "📊",
    });
  });

  quranicWords.forEach((w) => {
    results.push({
      type: "word",
      label: `${w.transliteration} · ${w.arabic}`,
      sublabel: `${w.meaning} · ${w.frequency} occurrences · ${w.category}`,
      href: "/words",
      icon: "🔤",
    });
  });

  prophets.forEach((p) => {
    results.push({
      type: "prophet",
      label: `${p.name} · ${p.nameArabic}`,
      sublabel: `${p.description} · ${p.mentionCount} mentions`,
      href: "/prophets",
      icon: "📜",
    });
  });

  narrators.forEach((n) => {
    results.push({
      type: "narrator",
      label: `${n.name} · ${n.nameArabic}`,
      sublabel: `${n.description} · ${n.generation}`,
      href: "/isnad",
      icon: "🕸️",
    });
  });

  namesOfAllah.forEach((n) => {
    results.push({
      type: "name",
      label: `${n.transliteration} · ${n.arabic}`,
      sublabel: `${n.meaning} · ${n.category}`,
      href: "/names",
      icon: "✨",
    });
  });

  return results;
}

export function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index
      .filter(
        (r) =>
          r.label.toLowerCase().includes(q) ||
          r.sublabel.toLowerCase().includes(q)
      )
      .slice(0, 15);
  }, [query, index]);

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setOpen(false);
      setQuery("");
      if (result.href) router.push(result.href);
    },
    [router]
  );

  return (
    <>
      {/* Search trigger in sidebar */}
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-md border border-border bg-accent/30 px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent/50"
      >
        <span className="text-xs">🔍</span>
        <span className="flex-1">Search...</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          Ctrl+K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] max-w-lg translate-y-0 gap-0 overflow-hidden p-0">
          {/* Search input */}
          <div className="flex items-center border-b border-border px-4">
            <span className="text-muted-foreground">🔍</span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search surahs, words, prophets, names..."
              className="flex-1 bg-transparent px-3 py-3.5 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {query && results.length === 0 && (
              <p className="px-4 py-8 text-center font-mono text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}
            {results.map((result, i) => (
              <button
                key={`${result.type}-${i}`}
                onClick={() => handleSelect(result)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50"
              >
                <span className="mt-0.5 text-base">{result.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm text-foreground">
                    {result.label}
                  </p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {result.sublabel}
                  </p>
                </div>
                <span className="mt-1 rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {result.type}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          {results.length > 0 && (
            <div className="border-t border-border px-4 py-2">
              <p className="font-mono text-[10px] text-muted-foreground/50">
                {results.length} result{results.length !== 1 ? "s" : ""} · Enter to select · Esc to close
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
