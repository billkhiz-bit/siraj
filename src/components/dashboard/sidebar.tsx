"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/dashboard/search";

const views = [
  { href: "/dashboard", label: "Surah Structure", icon: "📊" },
  { href: "/words", label: "Word Frequency", icon: "🔤" },
  { href: "/isnad", label: "Isnad Network", icon: "🕸️" },
  { href: "/prophets", label: "Prophet Timeline", icon: "📜" },
  { href: "/hadith", label: "Hadith Explorer", icon: "📚" },
  { href: "/map", label: "Revelation Map", icon: "🌍" },
  { href: "/journeys", label: "Islamic Journeys", icon: "🕌" },
  { href: "/names", label: "Names of Allah", icon: "✨" },
  { href: "/sites", label: "Sacred Sites", icon: "🕋" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-200 ease-in-out",
          "md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-5">
          <span className="font-mono text-2xl font-bold tracking-tight text-amber-500">
            Siraj
          </span>
          <span className="text-xs text-muted-foreground">
            سراج · The Lamp
          </span>
        </div>

        {/* Search */}
        <div className="px-3 pt-3">
          <SearchModal />
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Dashboard navigation">
          {views.map((view) => {
            const isActive = pathname === view.href;
            return (
              <Link
                key={view.href}
                href={view.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-base" aria-hidden="true">{view.icon}</span>
                {view.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer stats */}
        <div className="border-t border-border px-6 py-4">
          <p className="font-mono text-xs text-muted-foreground">
            114 Surahs &middot; 6,236 Ayat
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            30 Juz &middot; 7 Manzil
          </p>
        </div>
      </aside>
    </>
  );
}
