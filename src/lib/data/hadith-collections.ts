export interface HadithCollection {
  id: string;
  name: string;
  nameArabic: string;
  compiler: string;
  compilerArabic: string;
  deathYear: number; // Hijri
  totalHadith: number;
  authenticHadith: number;
  isSahih: boolean; // Part of the "Sahihayn" (Bukhari + Muslim)
  isKutubSittah: boolean; // Part of the six canonical books
  description: string;
  topics: HadithTopic[];
}

export interface HadithTopic {
  name: string;
  nameArabic: string;
  hadithCount: number;
  category: "worship" | "transactions" | "ethics" | "creed" | "law" | "history" | "quran";
}

export const collections: HadithCollection[] = [
  {
    id: "bukhari",
    name: "Sahih al-Bukhari",
    nameArabic: "صحيح البخاري",
    compiler: "Imam al-Bukhari",
    compilerArabic: "الإمام البخاري",
    deathYear: 256,
    totalHadith: 7563,
    authenticHadith: 2602,
    isSahih: true,
    isKutubSittah: true,
    description: "The most authentic collection, selected from 600,000 narrations over 16 years",
    topics: [
      { name: "Faith (Iman)", nameArabic: "الإيمان", hadithCount: 51, category: "creed" },
      { name: "Prayer (Salat)", nameArabic: "الصلاة", hadithCount: 520, category: "worship" },
      { name: "Fasting (Sawm)", nameArabic: "الصوم", hadithCount: 118, category: "worship" },
      { name: "Zakat", nameArabic: "الزكاة", hadithCount: 145, category: "worship" },
      { name: "Hajj", nameArabic: "الحج", hadithCount: 260, category: "worship" },
      { name: "Trade (Buyu')", nameArabic: "البيوع", hadithCount: 328, category: "transactions" },
      { name: "Jihad", nameArabic: "الجهاد", hadithCount: 312, category: "law" },
      { name: "Virtues (Manaqib)", nameArabic: "المناقب", hadithCount: 480, category: "history" },
      { name: "Tafsir", nameArabic: "التفسير", hadithCount: 542, category: "quran" },
      { name: "Marriage (Nikah)", nameArabic: "النكاح", hadithCount: 188, category: "law" },
      { name: "Good Manners (Adab)", nameArabic: "الأدب", hadithCount: 256, category: "ethics" },
      { name: "Supplication (Da'wah)", nameArabic: "الدعوات", hadithCount: 68, category: "worship" },
    ],
  },
  {
    id: "muslim",
    name: "Sahih Muslim",
    nameArabic: "صحيح مسلم",
    compiler: "Imam Muslim",
    compilerArabic: "الإمام مسلم",
    deathYear: 261,
    totalHadith: 7500,
    authenticHadith: 3033,
    isSahih: true,
    isKutubSittah: true,
    description: "Second most authentic, known for superior chain organisation",
    topics: [
      { name: "Faith (Iman)", nameArabic: "الإيمان", hadithCount: 408, category: "creed" },
      { name: "Prayer (Salat)", nameArabic: "الصلاة", hadithCount: 618, category: "worship" },
      { name: "Fasting (Sawm)", nameArabic: "الصوم", hadithCount: 298, category: "worship" },
      { name: "Zakat", nameArabic: "الزكاة", hadithCount: 212, category: "worship" },
      { name: "Hajj", nameArabic: "الحج", hadithCount: 607, category: "worship" },
      { name: "Trade (Buyu')", nameArabic: "البيوع", hadithCount: 283, category: "transactions" },
      { name: "Jihad", nameArabic: "الجهاد", hadithCount: 178, category: "law" },
      { name: "Virtues of Companions", nameArabic: "فضائل الصحابة", hadithCount: 384, category: "history" },
      { name: "Destiny (Qadr)", nameArabic: "القدر", hadithCount: 44, category: "creed" },
      { name: "Dhikr & Du'a", nameArabic: "الذكر والدعاء", hadithCount: 218, category: "worship" },
      { name: "Clothing (Libas)", nameArabic: "اللباس", hadithCount: 144, category: "ethics" },
      { name: "Good Manners (Adab)", nameArabic: "الأدب", hadithCount: 178, category: "ethics" },
    ],
  },
  {
    id: "tirmidhi",
    name: "Jami' al-Tirmidhi",
    nameArabic: "جامع الترمذي",
    compiler: "Imam al-Tirmidhi",
    compilerArabic: "الإمام الترمذي",
    deathYear: 279,
    totalHadith: 3956,
    authenticHadith: 1350,
    isSahih: false,
    isKutubSittah: true,
    description: "Includes grading of each hadith and notes on fiqh rulings",
    topics: [
      { name: "Purification", nameArabic: "الطهارة", hadithCount: 148, category: "worship" },
      { name: "Prayer (Salat)", nameArabic: "الصلاة", hadithCount: 451, category: "worship" },
      { name: "Fasting (Sawm)", nameArabic: "الصوم", hadithCount: 84, category: "worship" },
      { name: "Hajj", nameArabic: "الحج", hadithCount: 119, category: "worship" },
      { name: "Trade (Buyu')", nameArabic: "البيوع", hadithCount: 87, category: "transactions" },
      { name: "Virtues (Manaqib)", nameArabic: "المناقب", hadithCount: 382, category: "history" },
      { name: "Tafsir", nameArabic: "التفسير", hadithCount: 381, category: "quran" },
      { name: "Supplication (Da'wah)", nameArabic: "الدعوات", hadithCount: 131, category: "worship" },
      { name: "Heart-softeners (Riqaq)", nameArabic: "الزهد", hadithCount: 112, category: "ethics" },
      { name: "Description of Judgement", nameArabic: "صفة القيامة", hadithCount: 86, category: "creed" },
    ],
  },
  {
    id: "abu-dawud",
    name: "Sunan Abi Dawud",
    nameArabic: "سنن أبي داود",
    compiler: "Imam Abu Dawud",
    compilerArabic: "الإمام أبو داود",
    deathYear: 275,
    totalHadith: 5274,
    authenticHadith: 2450,
    isSahih: false,
    isKutubSittah: true,
    description: "Focused on legal hadith, essential for Islamic jurisprudence",
    topics: [
      { name: "Purification", nameArabic: "الطهارة", hadithCount: 390, category: "worship" },
      { name: "Prayer (Salat)", nameArabic: "الصلاة", hadithCount: 782, category: "worship" },
      { name: "Fasting (Sawm)", nameArabic: "الصوم", hadithCount: 164, category: "worship" },
      { name: "Zakat", nameArabic: "الزكاة", hadithCount: 168, category: "worship" },
      { name: "Jihad", nameArabic: "الجهاد", hadithCount: 312, category: "law" },
      { name: "Trade (Buyu')", nameArabic: "البيوع", hadithCount: 168, category: "transactions" },
      { name: "Marriage (Nikah)", nameArabic: "النكاح", hadithCount: 156, category: "law" },
      { name: "Judicial Rulings", nameArabic: "الأقضية", hadithCount: 198, category: "law" },
      { name: "Good Manners (Adab)", nameArabic: "الأدب", hadithCount: 502, category: "ethics" },
      { name: "Food (At'imah)", nameArabic: "الأطعمة", hadithCount: 98, category: "ethics" },
    ],
  },
  {
    id: "nasai",
    name: "Sunan al-Nasa'i",
    nameArabic: "سنن النسائي",
    compiler: "Imam al-Nasa'i",
    compilerArabic: "الإمام النسائي",
    deathYear: 303,
    totalHadith: 5758,
    authenticHadith: 2800,
    isSahih: false,
    isKutubSittah: true,
    description: "Strictest conditions after the Sahihayn, focused on narrators",
    topics: [
      { name: "Purification", nameArabic: "الطهارة", hadithCount: 326, category: "worship" },
      { name: "Prayer (Salat)", nameArabic: "الصلاة", hadithCount: 1240, category: "worship" },
      { name: "Fasting (Sawm)", nameArabic: "الصوم", hadithCount: 328, category: "worship" },
      { name: "Zakat", nameArabic: "الزكاة", hadithCount: 258, category: "worship" },
      { name: "Hajj", nameArabic: "الحج", hadithCount: 408, category: "worship" },
      { name: "Jihad", nameArabic: "الجهاد", hadithCount: 178, category: "law" },
      { name: "Marriage (Nikah)", nameArabic: "النكاح", hadithCount: 226, category: "law" },
      { name: "Oaths & Vows", nameArabic: "الأيمان", hadithCount: 158, category: "law" },
      { name: "Trade (Buyu')", nameArabic: "البيوع", hadithCount: 316, category: "transactions" },
      { name: "Judicial Rulings", nameArabic: "الأقضية", hadithCount: 142, category: "law" },
    ],
  },
  {
    id: "ibn-majah",
    name: "Sunan Ibn Majah",
    nameArabic: "سنن ابن ماجه",
    compiler: "Imam Ibn Majah",
    compilerArabic: "الإمام ابن ماجه",
    deathYear: 273,
    totalHadith: 4341,
    authenticHadith: 1560,
    isSahih: false,
    isKutubSittah: true,
    description: "Sixth of the canonical collections, includes unique narrations",
    topics: [
      { name: "Purification", nameArabic: "الطهارة", hadithCount: 244, category: "worship" },
      { name: "Prayer (Salat)", nameArabic: "الصلاة", hadithCount: 516, category: "worship" },
      { name: "Fasting (Sawm)", nameArabic: "الصوم", hadithCount: 124, category: "worship" },
      { name: "Zakat", nameArabic: "الزكاة", hadithCount: 98, category: "worship" },
      { name: "Trade (Buyu')", nameArabic: "البيوع", hadithCount: 244, category: "transactions" },
      { name: "Jihad", nameArabic: "الجهاد", hadithCount: 98, category: "law" },
      { name: "Food & Drink", nameArabic: "الأطعمة", hadithCount: 186, category: "ethics" },
      { name: "Heart-softeners (Zuhd)", nameArabic: "الزهد", hadithCount: 312, category: "ethics" },
      { name: "Fitna (Tribulations)", nameArabic: "الفتن", hadithCount: 198, category: "creed" },
      { name: "Du'a (Supplications)", nameArabic: "الدعاء", hadithCount: 146, category: "worship" },
    ],
  },
];

export const topicCategoryColours: Record<string, string> = {
  worship: "#22d3ee",
  transactions: "#f59e0b",
  ethics: "#34d399",
  creed: "#a78bfa",
  law: "#f87171",
  history: "#60a5fa",
  quran: "#fbbf24",
};
