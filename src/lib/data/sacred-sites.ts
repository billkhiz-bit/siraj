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
}

export const sacredSites: SacredSite[] = [
  {
    id: "kaabah",
    name: "The Ka'bah",
    nameArabic: "الكعبة المشرفة",
    lat: 21.4225,
    lon: 39.8262,
    description: "The House of Allah, the qiblah of all Muslims",
    dimensions: "13.1m long, 11.03m wide, 12.86m tall",
    history: "Originally built by Ibrahim and Isma'il as the first house of worship dedicated to the One God. The Qur'an states: 'The first House established for mankind was that at Bakkah (Makkah), blessed and a guidance for the worlds' (3:96). Before Islam, the Quraysh filled it with 360 idols. When the Prophet ﷺ conquered Makkah in 630 CE, he entered the Ka'bah and removed every idol, reciting: 'Truth has come and falsehood has vanished. Indeed, falsehood is bound to vanish' (17:81). The Ka'bah is draped in the Kiswah (black cloth embroidered with gold Qur'anic verses) and contains the Hajar al-Aswad (Black Stone) at its eastern corner.",
    quranicReferences: [
      "3:96 — First house established for mankind",
      "2:127 — Ibrahim and Isma'il raising its foundations",
      "2:144 — Appointed as the qiblah",
      "22:26 — Allah showed Ibrahim the site of the House",
    ],
    keyEvents: [
      "Built by Ibrahim and Isma'il",
      "Quraysh rebuild (605 CE) — the Prophet ﷺ placed the Black Stone",
      "Conquest of Makkah (630 CE) — idols removed",
      "Direction of prayer (qiblah) for 1.8 billion Muslims",
    ],
    connectedJourneys: ["hijrah", "fath-makkah", "farewell"],
    modelType: "structure",
  },
  {
    id: "masjid-nabawi",
    name: "Masjid al-Nabawi (Prophet's Mosque)",
    nameArabic: "المسجد النبوي",
    lat: 24.4672,
    lon: 39.6112,
    description: "The mosque built by the Prophet ﷺ in Madinah, containing his burial chamber",
    dimensions: "Original: ~30m x 35m. Current: 98,500 sq metres (can hold 1 million worshippers)",
    history: "When the Prophet ﷺ arrived in Madinah after the Hijrah, his camel knelt at a spot belonging to two orphans. He purchased the land and built the mosque with his own hands, using palm trunks for pillars and palm leaves for the roof. It served as the centre of the Muslim community — a place of prayer, learning, governance, and shelter. The Rawdah (garden) between his pulpit and his chamber is described as 'a garden from the gardens of Paradise.' After his passing, he was buried in the room of Aisha, which is now enclosed by the Green Dome.",
    quranicReferences: [
      "9:108 — A mosque founded on righteousness from the first day",
    ],
    keyEvents: [
      "Built by the Prophet ﷺ after the Hijrah (622 CE)",
      "Centre of the first Islamic state",
      "The Rawdah — 'a garden from the gardens of Paradise'",
      "Burial place of the Prophet ﷺ, Abu Bakr, and Umar",
      "Green Dome built in 1279 CE, painted green in 1837",
    ],
    connectedJourneys: ["hijrah", "badr", "farewell"],
    modelType: "structure",
  },
  {
    id: "mount-uhud",
    name: "Mount Uhud",
    nameArabic: "جبل أحد",
    lat: 24.5024,
    lon: 39.6128,
    elevation: 1077,
    description: "The mountain that loves us and we love it",
    history: "The Prophet ﷺ said: 'Uhud is a mountain that loves us and we love it.' The Battle of Uhud (625 CE / 3 AH) was fought at its base when 3,000 Quraysh attacked 700 Muslims. The Muslims initially prevailed, but archers left their posts on the hill, allowing Khalid ibn al-Walid's cavalry to flank them. Hamzah, the Prophet's ﷺ uncle, was martyred here. The Prophet ﷺ himself was wounded — his helmet rings pierced his cheek and he lost a tooth. The martyrs of Uhud, including Hamzah, are buried at its base.",
    quranicReferences: [
      "3:121-179 — Detailed account of the Battle of Uhud",
      "3:140 — 'If a wound has touched you, a similar wound has touched the other people'",
      "3:152 — The archers who left their posts",
    ],
    keyEvents: [
      "Battle of Uhud (625 CE / 3 AH)",
      "Hamzah ibn Abd al-Muttalib martyred",
      "Prophet ﷺ wounded in battle",
      "70 Muslim martyrs buried at its base",
      "Archers' hill (Jabal al-Rumah) nearby",
    ],
    connectedJourneys: [],
    modelType: "mountain",
  },
  {
    id: "cave-hira",
    name: "Cave of Hira",
    nameArabic: "غار حراء",
    lat: 21.4575,
    lon: 39.8581,
    elevation: 634,
    description: "Where the first revelation of the Qur'an was received",
    history: "Jabal al-Nur (Mountain of Light) rises sharply from the outskirts of Makkah. Near its summit sits a small cave, roughly 3.7m long and 1.6m wide, where the Prophet ﷺ used to retreat for contemplation (tahannuth) before his prophethood. In Ramadan of 610 CE, when he was 40 years old, the angel Jibril appeared and commanded: 'Iqra!' (Read/Recite!). These first five verses of Surah Al-'Alaq became the beginning of the Qur'anic revelation that would continue for 23 years. The Prophet ﷺ came down from the mountain trembling and said to Khadijah: 'Cover me, cover me.' She comforted him and took him to her cousin Waraqah ibn Nawfal, who confirmed this was the same angel who came to Musa.",
    quranicReferences: [
      "96:1-5 — First five verses revealed: 'Read in the name of your Lord who created'",
      "53:4-10 — Description of the angelic encounter",
    ],
    keyEvents: [
      "First revelation of the Qur'an (610 CE, Ramadan)",
      "Jibril commanded 'Iqra!' (Read!)",
      "Surah Al-'Alaq 96:1-5 — first verses revealed",
      "Prophet ﷺ was 40 years old",
      "Khadijah comforted him upon his return",
    ],
    connectedJourneys: [],
    modelType: "mountain",
  },
  {
    id: "cave-thawr",
    name: "Cave of Thawr",
    nameArabic: "غار ثور",
    lat: 21.3761,
    lon: 39.8486,
    elevation: 748,
    description: "Where the Prophet ﷺ and Abu Bakr hid during the Hijrah",
    history: "Jabal Thawr lies south of Makkah. When the Prophet ﷺ and Abu Bakr left Makkah for Madinah, they went south (the opposite direction) to confuse the Quraysh trackers and hid in this cave for three days. The Quraysh sent search parties with a bounty of 100 camels. Trackers reached the very mouth of the cave, but Allah caused a spider to spin its web over the entrance and a dove to nest there. The trackers said: 'No one has entered here.' Inside, Abu Bakr wept with fear, but the Prophet ﷺ said: 'Do not grieve, indeed Allah is with us' (9:40). Abdullah ibn Abi Bakr brought them news each night, Asma brought food, and Amir ibn Fuhayrah grazed sheep over their tracks.",
    quranicReferences: [
      "9:40 — 'Do not grieve, indeed Allah is with us' — revealed about this event",
    ],
    keyEvents: [
      "Prophet ﷺ and Abu Bakr hid for 3 days",
      "Spider web and dove nest at the entrance",
      "Quraysh trackers reached the cave mouth",
      "'Do not grieve, indeed Allah is with us' (9:40)",
      "Asma brought food, Abdullah brought intelligence",
    ],
    connectedJourneys: ["hijrah"],
    modelType: "mountain",
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
  },
];
