@AGENTS.md

# Siraj — Qur'an & Hadith 3D Data Visualisation

## Project Overview
Interactive 3D dashboard illuminating the structure, themes, and connections within the Qur'an and Hadith collections. Built for Ramadan Hacks 2026.

**Live URL**: https://siraj-ept.pages.dev
**Local dev**: `cd C:\Users\bilal\projects\ayat && npx next dev --port 3000`

## Stack
- **Framework**: Next.js 16 (App Router, static export)
- **3D**: Three.js via @react-three/fiber + @react-three/drei + @react-three/postprocessing
- **Maps**: MapLibre GL + react-map-gl (CARTO Dark Matter no-labels tiles)
- **UI**: shadcn/ui (base-ui) + Tailwind CSS v4 + Geist fonts
- **Data**: Qur'an.com API v4 (verified), static TypeScript datasets
- **Hosting**: Cloudflare Pages (free tier, static export)

## Architecture
```
src/
  app/
    page.tsx              — Cinematic landing (Bismillah → SIRAJ)
    dashboard/            — Surah Structure (3D ring)
    words/                — Word Frequency (3D cloud)
    isnad/                — Isnad Network (3D graph)
    prophets/             — Prophet Timeline (3D timeline)
    hadith/               — Hadith Explorer (3D towers)
    map/                  — Revelation Map (real map tiles)
    journeys/             — Islamic Journeys (10 routes)
    names/                — Names of Allah (3D sphere)
    surah/[id]/           — Surah detail (114 pages)
  components/dashboard/   — All visualisation components
  lib/data/               — Static datasets
  lib/quran-api.ts        — Qur'an.com API client
  hooks/                  — Keyboard navigation hook
```

## Deploy
```bash
npx next build
npx wrangler pages deploy out --project-name siraj --branch main --commit-dirty=true
```

## Data Accuracy
- Surah metadata verified against Qur'an.com API v4 (Egyptian Standard)
- Verse text: Uthmani script, Dr. Mustafa Khattab translation
- Always verify against Qur'an.com API before changing surah/verse data
- Use ﷺ when referencing the Prophet Muhammad
- No country labels on maps (no-labels tile style)

## Design
- Dark theme (#030308 backgrounds), amber accent (#f59e0b)
- Cyan = Meccan, Violet = Medinan
- Bloom post-processing on all 3D views
- Project Backbone-inspired overlay panels for maps
