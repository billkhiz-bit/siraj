@AGENTS.md

# Siraj (سراج) — Qur'an & Hadith 3D Data Visualisation

## Project Overview
Interactive 3D dashboard illuminating the structure, themes, and connections within the Qur'an and Hadith collections. Built for Ramadan Hacks 2026 (Ummah Build).

**Live URL**: https://siraj-ept.pages.dev
**GitHub**: https://github.com/billkhiz-bit/siraj (public)
**Local dev**: `cd C:\Users\bilal\projects\ayat && npx next dev --port 3000`

## Stack
- **Framework**: Next.js 16 (App Router, static export)
- **3D**: Three.js via @react-three/fiber + @react-three/drei + @react-three/postprocessing
- **Maps**: MapLibre GL + react-map-gl (CARTO Dark Matter no-labels tiles)
- **UI**: shadcn/ui (base-ui) + Tailwind CSS v4 + Geist fonts
- **Data**: Qur'an.com API v4 (verified), free hadith API, static TypeScript datasets
- **Hosting**: Cloudflare Pages (free tier, static export)

## Architecture
```
src/
  app/
    page.tsx              — Cinematic landing (Bismillah → SIRAJ)
    dashboard/            — Surah Structure (3D cylindrical ring, 114 surahs)
    words/                — Word Frequency (3D Fibonacci sphere, click for ayahs)
    isnad/                — Isnad Network (3D layered graph, click for biographies)
    prophets/             — Prophet Timeline (3D timeline, click for stories)
    hadith/               — Hadith Explorer (3D towers, side panel with topics + sample hadiths)
    map/                  — Revelation Map (MapLibre, clickable surah dots)
    journeys/             — Islamic Journeys (10 routes, key figures, all-journeys view)
    names/                — Names of Allah (3D sphere, Allah at centre, filterable)
    surah/[id]/           — Surah detail (114 pages, Arabic + translation + transliteration)
  components/dashboard/   — All visualisation components
  lib/data/               — Static datasets (surahs, words, prophets, narrators, names, journeys, hadith)
  lib/quran-api.ts        — Qur'an.com API client (parallel fetch for translations + transliteration)
  hooks/                  — Keyboard navigation hook
```

## Deploy
```bash
rm -rf .next out && npx next build
npx wrangler pages deploy out --project-name siraj --branch main --commit-dirty=true
git add -A && git commit -m "message" && git push origin master
```

## Data Sources & Accuracy
- **Surah metadata**: Verified against Qur'an.com API v4 (Egyptian Standard / Al-Azhar)
- **Verse text**: Uthmani script from Qur'an.com API
- **Translation**: Sahih International (ID 20) — previously ID 131 which stopped working
- **Transliteration**: Word-by-word from Qur'an.com API (separate request, merged by verse_key)
- **Hadith samples**: fawazahmed0/hadith-api on jsDelivr (free, no key needed)
- **99 Names**: Sahih al-Bukhari 2736, Sahih Muslim 2677
- **Journeys**: Ibn Hisham, al-Tabari, Martin Lings
- **Narrators**: 37 across 4 generations with biographies
- Always verify against Qur'an.com API before changing surah/verse data
- Use ﷺ when referencing the Prophet Muhammad
- No country labels on maps (no-labels tile style)

## Key Interaction Patterns
- **Click-to-pin** on verse bars (click bar to pin ayah card, click empty space to dismiss)
- **Click-to-explore** on surah bars (navigates to /surah/[id])
- **Click-to-biography** on Isnad nodes and Prophet nodes (opens side panel)
- **Click-to-search** on Word Frequency words (searches Qur'an.com API for ayahs)
- **Arrow keys** navigate surahs, Enter drills in, Escape deselects
- **Ctrl+K** global search across all datasets

## Design
- Dark theme (#030308/#0a0a1a backgrounds), amber accent (#f59e0b)
- Cyan = Meccan, Violet = Medinan colour coding throughout
- Bloom post-processing on all 3D views
- Project Backbone-inspired overlay panels for map views
- Geist Sans for UI, Geist Mono for data

## Gotchas
- Qur'an.com API: adding `words=true` drops `translations` from response — must use two parallel fetches
- Translation ID 131 (Khattab) stopped working — use ID 20 (Sahih International)
- `style jsx` causes hydration errors in Next.js App Router — use globals.css
- `pointer-events-none` on tooltips prevents scrolling — use `pointer-events-auto`
- Tooltip hover lock pattern causes 3D scene to freeze — use click-to-pin instead
- Use `onPointerMissed` on Canvas to dismiss pinned items on empty click
- OrbitControls captures arrow keys — add `keyEvents={false}`
- Billboard component prevents text mirroring (vs manual lookAt which flips)
