"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card">
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
  );
}
