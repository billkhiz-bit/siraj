export interface Annotation {
  position: [number, number, number];
  label: string;
  detail: string;
}

export interface SacredSite {
  id: string;
  name: string;
  nameArabic: string;
  lat: number;
  lon: number;
  elevation?: number; // metres
  description: string;
  history: string;
  quranicReferences?: string[];
  dimensions?: string;
  keyEvents: string[];
  connectedJourneys: string[]; // journey IDs from journeys.ts
  modelType: "structure" | "mountain" | "plain";
  annotations?: Annotation[];
}

export const sacredSites: SacredSite[] = [
  {
    id: "masjid-nabawi",
    name: "Masjid al-Nabawi (Prophet's Mosque)",
    nameArabic: "المسجد النبوي",
    lat: 24.4672,
    lon: 39.6112,
    description: "The mosque built by the Prophet ﷺ in Madinah, containing his burial chamber",
    dimensions: "Original: ~30m x 35m. Current: 98,500 sq metres (can hold 1 million worshippers)",
    history: "When the Prophet ﷺ arrived in Madinah after the Hijrah, his camel knelt at a spot belonging to two orphans. He purchased the land and built the mosque with his own hands, using palm trunks for pillars and palm leaves for the roof. It served as the centre of the Muslim community — a place of prayer, learning, governance, and shelter. The Rawdah (garden) between his pulpit and his chamber is described as 'a garden from the gardens of Paradise.' After his passing, he was buried in the room of Aisha (RA), which is now enclosed by the Green Dome.",
    quranicReferences: [
      "9:108 — A mosque founded on righteousness from the first day",
    ],
    keyEvents: [
      "Built by the Prophet ﷺ after the Hijrah (622 CE)",
      "Centre of the first Islamic state",
      "The Rawdah — 'a garden from the gardens of Paradise'",
      "Burial place of the Prophet ﷺ, Abu Bakr (RA), and Umar (RA)",
      "Green Dome built in 1279 CE, painted green in 1837",
    ],
    connectedJourneys: ["hijrah", "badr", "farewell"],
    modelType: "structure",
    annotations: [
      { position: [2, 2.3, 0.5], label: "Green Dome", detail: "Built in 1279 CE over the burial chamber of the Prophet ﷺ, Abu Bakr (RA), and Umar (RA). Painted green in 1837." },
      { position: [2.2, -0.15, 0], label: "Al-Rawdah", detail: "The Prophet ﷺ said: 'Between my house and my pulpit is a garden from the gardens of Paradise.'" },
      { position: [4, 4.2, 2.5], label: "Minarets", detail: "The current mosque has 10 minarets, each 105m tall, making them among the tallest in the world." },
    ],
  },
  {
    id: "mount-uhud",
    name: "Mount Uhud",
    nameArabic: "جبل أحد",
    lat: 24.5024,
    lon: 39.6128,
    elevation: 1077,
    description: "The mountain that loves us and we love it",
    history: "The Prophet ﷺ said: 'Uhud is a mountain that loves us and we love it.' The Battle of Uhud (625 CE / 3 AH) was fought at its base when 3,000 Quraysh attacked 700 Muslims. The Muslims initially prevailed, but archers left their posts on the hill, allowing Khalid ibn al-Walid's (RA) cavalry to flank them. Hamzah (RA), the Prophet's ﷺ uncle, was martyred here. The Prophet ﷺ himself was wounded — his helmet rings pierced his cheek and he lost a tooth. The martyrs of Uhud, including Hamzah, are buried at its base.",
    quranicReferences: [
      "3:121-179 — Detailed account of the Battle of Uhud",
      "3:140 — 'If a wound has touched you, a similar wound has touched the other people'",
      "3:152 — The archers who left their posts",
    ],
    keyEvents: [
      "Battle of Uhud (625 CE / 3 AH)",
      "Hamzah ibn Abd al-Muttalib (RA) martyred",
      "Prophet ﷺ wounded in battle",
      "70 Muslim martyrs buried at its base",
      "Archers' hill (Jabal al-Rumah) nearby",
    ],
    connectedJourneys: [],
    modelType: "mountain",
    annotations: [
      { position: [0, 3.5, 0], label: "Summit Ridge", detail: "Uhud's distinctive flat-topped ridge runs 7km east to west. The Prophet ﷺ said: 'Uhud is a mountain that loves us and we love it.'" },
      { position: [1.5, 1, -7], label: "Archers' Hill", detail: "50 archers were posted here by the Prophet ﷺ with orders not to leave. When they left to collect spoils, Khalid ibn al-Walid's (RA) cavalry flanked the Muslims." },
      { position: [-2.5, 0.5, -2.5], label: "Martyrs' Cemetery", detail: "70 martyrs are buried here including Hamzah ibn Abd al-Muttalib (RA), the 'Lion of Allah' and uncle of the Prophet ﷺ." },
    ],
  },
  {
    id: "cave-hira",
    name: "Cave of Hira",
    nameArabic: "غار حراء",
    lat: 21.4575,
    lon: 39.8581,
    elevation: 634,
    description: "Where the first revelation of the Qur'an was received",
    history: "Jabal al-Nur (Mountain of Light) rises sharply from the outskirts of Makkah. Near its summit sits a small cave, roughly 3.7m long and 1.6m wide, where the Prophet ﷺ used to retreat for contemplation (tahannuth) before his prophethood. In Ramadan of 610 CE, when he was 40 years old, the angel Jibril appeared and commanded: 'Iqra!' (Read/Recite!). These first five verses of Surah Al-'Alaq became the beginning of the Qur'anic revelation that would continue for 23 years. The Prophet ﷺ came down from the mountain trembling and said to Khadijah (RA): 'Cover me, cover me.' She comforted him and took him to her cousin Waraqah ibn Nawfal, who confirmed this was the same angel who came to Musa.",
    quranicReferences: [
      "96:1-5 — First five verses revealed: 'Read in the name of your Lord who created'",
      "53:4-10 — Description of the angelic encounter",
    ],
    keyEvents: [
      "First revelation of the Qur'an (610 CE, Ramadan)",
      "Jibril commanded 'Iqra!' (Read!)",
      "Surah Al-'Alaq 96:1-5 — first verses revealed",
      "Prophet ﷺ was 40 years old",
      "Khadijah (RA) comforted him upon his return",
    ],
    connectedJourneys: [],
    modelType: "mountain",
    annotations: [
      { position: [0.3, 3.5, 0.2], label: "Cave of Hira", detail: "A small cave (3.7m x 1.6m) near the summit. The Prophet ﷺ retreated here for contemplation before prophethood. Jibril appeared here with the first revelation." },
      { position: [0, 0.5, 2.5], label: "Ascent Path", detail: "A steep climb of about 600m from the base. The Prophet ﷺ would bring provisions and spend days in meditation." },
    ],
  },
  {
    id: "cave-thawr",
    name: "Cave of Thawr",
    nameArabic: "غار ثور",
    lat: 21.3761,
    lon: 39.8486,
    elevation: 748,
    description: "Where the Prophet ﷺ and Abu Bakr (RA) hid during the Hijrah",
    history: "Jabal Thawr lies south of Makkah. When the Prophet ﷺ and Abu Bakr (RA) left Makkah for Madinah, they went south (the opposite direction) to confuse the Quraysh trackers and hid in this cave for three days. The Quraysh sent search parties with a bounty of 100 camels. Trackers reached the very mouth of the cave, but Allah caused a spider to spin its web over the entrance and a dove to nest there. The trackers said: 'No one has entered here.' Inside, Abu Bakr (RA) wept with fear, but the Prophet ﷺ said: 'Do not grieve, indeed Allah is with us' (9:40). Abdullah ibn Abi Bakr (RA) brought them news each night, Asma (RA) brought food, and Amir ibn Fuhayrah (RA) grazed sheep over their tracks.",
    quranicReferences: [
      "9:40 — 'Do not grieve, indeed Allah is with us' — revealed about this event",
    ],
    keyEvents: [
      "Prophet ﷺ and Abu Bakr (RA) hid for 3 days",
      "Spider web and dove nest at the entrance",
      "Quraysh trackers reached the cave mouth",
      "'Do not grieve, indeed Allah is with us' (9:40)",
      "Asma (RA) brought food, Abdullah (RA) brought intelligence",
    ],
    connectedJourneys: ["hijrah"],
    modelType: "mountain",
    annotations: [
      { position: [0.8, 2.3, 1], label: "Cave Entrance", detail: "The cave is large enough for two people. A spider spun its web over the entrance and a dove nested there, concealing the Prophet ﷺ and Abu Bakr (RA) from Quraysh trackers." },
      { position: [0, 2.8, -0.5], label: "Summit", detail: "Jabal Thawr is 748m high. Unlike Jabal al-Nur, the cave is not at the summit but partway up the mountain." },
    ],
  },
  {
    id: "arafat",
    name: "Plain of Arafat",
    nameArabic: "عرفات",
    lat: 21.3549,
    lon: 39.9842,
    elevation: 454,
    description: "Where the Farewell Sermon was delivered and Hajj is fulfilled",
    history: "Arafat is a vast plain about 20km southeast of Makkah. Standing at Arafat (wuquf) on the 9th of Dhul Hijjah is the essential pillar of Hajj — the Prophet ﷺ said: 'Hajj is Arafat.' At its centre rises Jabal al-Rahmah (Mount of Mercy), a small granite hill where the Prophet ﷺ delivered the Farewell Sermon to over 100,000 Companions. In that sermon he declared: 'All mankind is from Adam and Adam is from dust. An Arab has no superiority over a non-Arab, nor does a non-Arab have any superiority over an Arab; a white has no superiority over a black, nor does a black have any superiority over a white — except by piety and good action.' It was here that the final verse of the Qur'an was revealed: 'Today I have perfected your religion for you' (5:3).",
    quranicReferences: [
      "5:3 — 'Today I have perfected your religion for you' — revealed at Arafat",
      "2:198 — 'There is no blame upon you for seeking bounty from your Lord at Arafat'",
    ],
    keyEvents: [
      "Farewell Sermon (632 CE / 10 AH)",
      "Last verse of the Qur'an revealed (5:3)",
      "'Hajj is Arafat' — standing here fulfils the pillar",
      "Over 100,000 Companions present",
      "Declaration of human equality",
    ],
    connectedJourneys: ["farewell"],
    modelType: "plain",
    annotations: [
      { position: [0.5, 2.8, 0], label: "Jabal al-Rahmah", detail: "Mount of Mercy. The Prophet ﷺ stood here to deliver the Farewell Sermon to over 100,000 Companions, declaring the equality of all humanity." },
      { position: [4, 0.3, 3], label: "Standing Area", detail: "Standing at Arafat (wuquf) on 9th Dhul Hijjah is the essential pillar of Hajj. The Prophet ﷺ said: 'Hajj is Arafat.'" },
      { position: [-3, 0.3, -3], label: "Last Revelation", detail: "Here the final verse was revealed: 'Today I have perfected your religion for you, completed My favour upon you, and chosen Islam as your way' (5:3)." },
    ],
  },
];
