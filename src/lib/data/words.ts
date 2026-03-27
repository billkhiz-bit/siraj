export interface QuranicWord {
  arabic: string;
  transliteration: string;
  meaning: string;
  frequency: number;
  category: "divine" | "action" | "concept" | "nature" | "person" | "time" | "place";
  root?: string;
}

/**
 * Key Qur'anic terms and their approximate frequencies.
 * Sources: Qur'anic Arabic Corpus, Tanzil word-by-word data.
 * These represent significant thematic words, not common particles (the, and, of).
 */
export const quranicWords: QuranicWord[] = [
  // Divine names and attributes
  { arabic: "الله", transliteration: "Allah", meaning: "God", frequency: 2699, category: "divine", root: "أ-ل-ه" },
  { arabic: "رَبّ", transliteration: "Rabb", meaning: "Lord", frequency: 970, category: "divine", root: "ر-ب-ب" },
  { arabic: "رَحْمَة", transliteration: "Rahmah", meaning: "Mercy", frequency: 339, category: "divine", root: "ر-ح-م" },
  { arabic: "عِلْم", transliteration: "'Ilm", meaning: "Knowledge", frequency: 854, category: "divine", root: "ع-ل-م" },
  { arabic: "نُور", transliteration: "Nur", meaning: "Light", frequency: 194, category: "divine", root: "ن-و-ر" },
  { arabic: "حَقّ", transliteration: "Haqq", meaning: "Truth", frequency: 287, category: "divine", root: "ح-ق-ق" },
  { arabic: "غَفَرَ", transliteration: "Ghafara", meaning: "Forgiveness", frequency: 234, category: "divine", root: "غ-ف-ر" },
  { arabic: "تَوَّاب", transliteration: "Tawwab", meaning: "Accepting of Repentance", frequency: 11, category: "divine", root: "ت-و-ب" },
  { arabic: "عَزِيز", transliteration: "'Aziz", meaning: "The Mighty", frequency: 92, category: "divine", root: "ع-ز-ز" },
  { arabic: "حَكِيم", transliteration: "Hakim", meaning: "The Wise", frequency: 97, category: "divine", root: "ح-ك-م" },

  // Core actions
  { arabic: "آمَنَ", transliteration: "Amana", meaning: "To Believe", frequency: 879, category: "action", root: "أ-م-ن" },
  { arabic: "عَمِلَ", transliteration: "'Amila", meaning: "To Do/Act", frequency: 360, category: "action", root: "ع-م-ل" },
  { arabic: "صَلَّى", transliteration: "Salla", meaning: "To Pray", frequency: 99, category: "action", root: "ص-ل-و" },
  { arabic: "أَنفَقَ", transliteration: "Anfaqa", meaning: "To Spend (in charity)", frequency: 73, category: "action", root: "ن-ف-ق" },
  { arabic: "صَبَرَ", transliteration: "Sabara", meaning: "To Be Patient", frequency: 103, category: "action", root: "ص-ب-ر" },
  { arabic: "ذَكَرَ", transliteration: "Dhakara", meaning: "To Remember", frequency: 292, category: "action", root: "ذ-ك-ر" },
  { arabic: "تَابَ", transliteration: "Taba", meaning: "To Repent", frequency: 87, category: "action", root: "ت-و-ب" },
  { arabic: "شَكَرَ", transliteration: "Shakara", meaning: "To Be Grateful", frequency: 75, category: "action", root: "ش-ك-ر" },
  { arabic: "جَاهَدَ", transliteration: "Jahada", meaning: "To Strive", frequency: 41, category: "action", root: "ج-ه-د" },
  { arabic: "تَوَكَّلَ", transliteration: "Tawakkala", meaning: "To Trust (in God)", frequency: 70, category: "action", root: "و-ك-ل" },
  { arabic: "أَطَاعَ", transliteration: "Ata'a", meaning: "To Obey", frequency: 88, category: "action", root: "ط-و-ع" },

  // Key concepts
  { arabic: "إِيمَان", transliteration: "Iman", meaning: "Faith", frequency: 811, category: "concept", root: "أ-م-ن" },
  { arabic: "كُفْر", transliteration: "Kufr", meaning: "Disbelief", frequency: 525, category: "concept", root: "ك-ف-ر" },
  { arabic: "جَنَّة", transliteration: "Jannah", meaning: "Paradise", frequency: 147, category: "concept", root: "ج-ن-ن" },
  { arabic: "نَار", transliteration: "Nar", meaning: "Fire (Hell)", frequency: 145, category: "concept", root: "ن-و-ر" },
  { arabic: "عَذَاب", transliteration: "'Adhab", meaning: "Punishment", frequency: 373, category: "concept", root: "ع-ذ-ب" },
  { arabic: "هُدَى", transliteration: "Huda", meaning: "Guidance", frequency: 316, category: "concept", root: "ه-د-ي" },
  { arabic: "ظُلْم", transliteration: "Dhulm", meaning: "Injustice/Wrongdoing", frequency: 315, category: "concept", root: "ظ-ل-م" },
  { arabic: "تَقْوَى", transliteration: "Taqwa", meaning: "God-consciousness", frequency: 258, category: "concept", root: "و-ق-ي" },
  { arabic: "كِتَاب", transliteration: "Kitab", meaning: "Book/Scripture", frequency: 319, category: "concept", root: "ك-ت-ب" },
  { arabic: "آيَة", transliteration: "Ayah", meaning: "Sign/Verse", frequency: 382, category: "concept", root: "أ-ي-ي" },
  { arabic: "دِين", transliteration: "Din", meaning: "Religion/Way of Life", frequency: 101, category: "concept", root: "د-ي-ن" },
  { arabic: "صِرَاط", transliteration: "Sirat", meaning: "Path", frequency: 45, category: "concept", root: "ص-ر-ط" },
  { arabic: "عَدْل", transliteration: "'Adl", meaning: "Justice", frequency: 28, category: "concept", root: "ع-د-ل" },
  { arabic: "سَلَام", transliteration: "Salam", meaning: "Peace", frequency: 50, category: "concept", root: "س-ل-م" },
  { arabic: "بَرَكَة", transliteration: "Barakah", meaning: "Blessing", frequency: 32, category: "concept", root: "ب-ر-ك" },
  { arabic: "فِتْنَة", transliteration: "Fitnah", meaning: "Trial/Tribulation", frequency: 34, category: "concept", root: "ف-ت-ن" },
  { arabic: "شَفَاعَة", transliteration: "Shafa'ah", meaning: "Intercession", frequency: 26, category: "concept", root: "ش-ف-ع" },

  // Nature
  { arabic: "أَرْض", transliteration: "Ard", meaning: "Earth", frequency: 461, category: "nature", root: "أ-ر-ض" },
  { arabic: "سَمَاء", transliteration: "Sama'", meaning: "Sky/Heaven", frequency: 387, category: "nature", root: "س-م-و" },
  { arabic: "مَاء", transliteration: "Ma'", meaning: "Water", frequency: 63, category: "nature", root: "م-و-ه" },
  { arabic: "شَمْس", transliteration: "Shams", meaning: "Sun", frequency: 33, category: "nature", root: "ش-م-س" },
  { arabic: "قَمَر", transliteration: "Qamar", meaning: "Moon", frequency: 27, category: "nature", root: "ق-م-ر" },
  { arabic: "نَجْم", transliteration: "Najm", meaning: "Star", frequency: 13, category: "nature", root: "ن-ج-م" },
  { arabic: "جَبَل", transliteration: "Jabal", meaning: "Mountain", frequency: 39, category: "nature", root: "ج-ب-ل" },
  { arabic: "بَحْر", transliteration: "Bahr", meaning: "Sea", frequency: 41, category: "nature", root: "ب-ح-ر" },
  { arabic: "رِيح", transliteration: "Rih", meaning: "Wind", frequency: 29, category: "nature", root: "ر-و-ح" },
  { arabic: "شَجَر", transliteration: "Shajar", meaning: "Tree", frequency: 26, category: "nature", root: "ش-ج-ر" },

  // Persons / groups
  { arabic: "نَبِيّ", transliteration: "Nabi", meaning: "Prophet", frequency: 75, category: "person", root: "ن-ب-أ" },
  { arabic: "رَسُول", transliteration: "Rasul", meaning: "Messenger", frequency: 354, category: "person", root: "ر-س-ل" },
  { arabic: "مُؤْمِن", transliteration: "Mu'min", meaning: "Believer", frequency: 230, category: "person", root: "أ-م-ن" },
  { arabic: "مُسْلِم", transliteration: "Muslim", meaning: "One Who Submits", frequency: 42, category: "person", root: "س-ل-م" },
  { arabic: "إِنسَان", transliteration: "Insan", meaning: "Human Being", frequency: 65, category: "person", root: "أ-ن-س" },
  { arabic: "قَوْم", transliteration: "Qawm", meaning: "People/Nation", frequency: 383, category: "person", root: "ق-و-م" },

  // Time
  { arabic: "يَوْم", transliteration: "Yawm", meaning: "Day", frequency: 475, category: "time", root: "ي-و-م" },
  { arabic: "لَيْل", transliteration: "Layl", meaning: "Night", frequency: 92, category: "time", root: "ل-ي-ل" },
  { arabic: "سَاعَة", transliteration: "Sa'ah", meaning: "Hour (Day of Judgement)", frequency: 48, category: "time", root: "س-و-ع" },
  { arabic: "آخِرَة", transliteration: "Akhirah", meaning: "Hereafter", frequency: 115, category: "time", root: "أ-خ-ر" },
  { arabic: "دُنْيَا", transliteration: "Dunya", meaning: "Worldly Life", frequency: 115, category: "time", root: "د-ن-و" },
];

export const wordCategories = [
  { key: "divine", label: "Divine", colour: "#f59e0b" },
  { key: "action", label: "Actions", colour: "#22d3ee" },
  { key: "concept", label: "Concepts", colour: "#a78bfa" },
  { key: "nature", label: "Nature", colour: "#34d399" },
  { key: "person", label: "People", colour: "#f87171" },
  { key: "time", label: "Time", colour: "#60a5fa" },
  { key: "place", label: "Places", colour: "#fbbf24" },
] as const;
