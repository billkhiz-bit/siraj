# Siraj (سراج) - The Lamp

**Interactive 3D Qur'an & Hadith Data Visualisation Dashboard**

> "We sent you as a shining lamp" (Qur'an 33:46)

**Live**: [siraj-ept.pages.dev](https://siraj-ept.pages.dev)

Built for [Ramadan Hacks 2026](https://www.ummah.build/hackathon) by [Ummah Build](https://www.ummah.build).

## What is Siraj?

Siraj illuminates the structure, patterns, and geography of the Qur'an and Hadith through interactive 3D data visualisation. Most Islamic apps focus on reading and listening. Siraj lets you *see* the data.

## Views

| View | Description |
|------|-------------|
| **Surah Structure** | 114 surahs as glowing 3D cylinders in a ring. Height = ayat count. Cyan = Meccan, violet = Medinan. Sort by canonical, revelation, or length order. |
| **Surah Detail** | Click any surah for Arabic text, English translation (Sahih International), transliteration, and a 3D verse structure chart. Click-to-pin any ayah. |
| **Word Frequency** | Key Qur'anic terms as a 3D floating word cloud. Click any word to search for ayahs containing it via the Qur'an.com API. |
| **Isnad Network** | Hadith narrator chains from the Prophet to the Tabi' al-Tabi'in. Click any node for their biography, titles, and key events. |
| **Prophet Timeline** | 25 prophets in the Qur'an arranged chronologically. Click for their story and surah references. |
| **Hadith Explorer** | 6 canonical collections compared as 3D towers. Click for topic breakdown and sample hadiths. |
| **Revelation Map** | Real map showing Makkah (86 Meccan surahs) and Madinah (28 Medinan surahs) with toggleable layers. Click any surah dot to explore. |
| **Islamic Journeys** | 10 historical routes from 615-632 CE with waypoints, key figures, and biographies. View all routes simultaneously or individually. |
| **Names of Allah** | 99 Names arranged in a 3D sphere with Allah at the centre. Filter by Jamal (Beauty), Jalal (Majesty), or Kamal (Perfection). |
| **Sacred Sites** | 6 wireframe 3D models of holy Islamic sites: Ka'bah, Masjid al-Nabawi, Mount Uhud, Cave of Hira, Cave of Thawr, and the Plain of Arafat. Point cloud particle overlays, historical context, and Qur'anic references. |

## Mobile Responsive

Siraj is fully responsive across phones, tablets, and desktops. On mobile (<768px):
- Sidebar collapses into a hamburger menu
- 3D canvases and side panels stack vertically
- Map overlays resize to fit smaller screens
- Landing page stats wrap to multiple rows

Desktop layout is unchanged — all responsive behaviour uses the `md:` Tailwind breakpoint.

## Data Accuracy

All data is sourced from authoritative references:

- **Surah metadata**: Qur'an.com API v4 (Egyptian Standard / Al-Azhar)
- **Verse text**: Uthmani script via Qur'an.com API
- **Translation**: Sahih International via Qur'an.com API
- **Transliteration**: Word-by-word via Qur'an.com API
- **Hadith**: fawazahmed0/hadith-api (6 canonical collections)
- **99 Names**: Sahih al-Bukhari 2736, Sahih Muslim 2677
- **Journeys**: Ibn Hisham's Sirah, al-Tabari, Martin Lings

## Tech Stack

- **Next.js 16** (App Router, static export)
- **Three.js** via React Three Fiber + Drei + Post-processing
- **MapLibre GL** + react-map-gl (CARTO Dark Matter no-labels tiles)
- **shadcn/ui** + Tailwind CSS v4 + Geist fonts
- **Cloudflare Pages** (free tier)

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Ctrl+K** | Global search |
| **Left/Right** | Navigate surahs |
| **Up/Down** | Zoom in/out |
| **Enter** | Explore selected surah |
| **Escape** | Deselect |

## Licence

All rights reserved.
