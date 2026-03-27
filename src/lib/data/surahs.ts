export type SurahType = "meccan" | "medinan";

export interface Surah {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  meaning: string;
  ayatCount: number;
  revelationOrder: number;
  type: SurahType;
  juz: number[]; // which juz(s) the surah spans
}

/**
 * All 114 surahs of the Qur'an with structural metadata.
 *
 * SOURCE: Qur'an.com API v4 (https://api.quran.com/api/v4/chapters)
 * - Names, ayat counts, revelation order, and Meccan/Medinan classification
 *   are from the Egyptian Standard (Al-Azhar), the most widely accepted
 *   ordering printed in modern mushafs worldwide.
 * - Juz mappings from Tanzil.net.
 *
 * Verified: 2026-03-27
 */
export const surahs: Surah[] = [
  { number: 1, nameArabic: "الفاتحة", nameEnglish: "Al-Fatihah", meaning: "The Opener", ayatCount: 7, revelationOrder: 5, type: "meccan", juz: [1] },
  { number: 2, nameArabic: "البقرة", nameEnglish: "Al-Baqarah", meaning: "The Cow", ayatCount: 286, revelationOrder: 87, type: "medinan", juz: [1, 2, 3] },
  { number: 3, nameArabic: "آل عمران", nameEnglish: "Ali 'Imran", meaning: "Family of Imran", ayatCount: 200, revelationOrder: 89, type: "medinan", juz: [3, 4] },
  { number: 4, nameArabic: "النساء", nameEnglish: "An-Nisa", meaning: "The Women", ayatCount: 176, revelationOrder: 92, type: "medinan", juz: [4, 5, 6] },
  { number: 5, nameArabic: "المائدة", nameEnglish: "Al-Ma'idah", meaning: "The Table Spread", ayatCount: 120, revelationOrder: 112, type: "medinan", juz: [6, 7] },
  { number: 6, nameArabic: "الأنعام", nameEnglish: "Al-An'am", meaning: "The Cattle", ayatCount: 165, revelationOrder: 55, type: "meccan", juz: [7, 8] },
  { number: 7, nameArabic: "الأعراف", nameEnglish: "Al-A'raf", meaning: "The Heights", ayatCount: 206, revelationOrder: 39, type: "meccan", juz: [8, 9] },
  { number: 8, nameArabic: "الأنفال", nameEnglish: "Al-Anfal", meaning: "The Spoils of War", ayatCount: 75, revelationOrder: 88, type: "medinan", juz: [9, 10] },
  { number: 9, nameArabic: "التوبة", nameEnglish: "At-Tawbah", meaning: "The Repentance", ayatCount: 129, revelationOrder: 113, type: "medinan", juz: [10, 11] },
  { number: 10, nameArabic: "يونس", nameEnglish: "Yunus", meaning: "Jonah", ayatCount: 109, revelationOrder: 51, type: "meccan", juz: [11] },
  { number: 11, nameArabic: "هود", nameEnglish: "Hud", meaning: "Hud", ayatCount: 123, revelationOrder: 52, type: "meccan", juz: [11, 12] },
  { number: 12, nameArabic: "يوسف", nameEnglish: "Yusuf", meaning: "Joseph", ayatCount: 111, revelationOrder: 53, type: "meccan", juz: [12, 13] },
  { number: 13, nameArabic: "الرعد", nameEnglish: "Ar-Ra'd", meaning: "The Thunder", ayatCount: 43, revelationOrder: 96, type: "medinan", juz: [13] },
  { number: 14, nameArabic: "ابراهيم", nameEnglish: "Ibrahim", meaning: "Abraham", ayatCount: 52, revelationOrder: 72, type: "meccan", juz: [13] },
  { number: 15, nameArabic: "الحجر", nameEnglish: "Al-Hijr", meaning: "The Rocky Tract", ayatCount: 99, revelationOrder: 54, type: "meccan", juz: [14] },
  { number: 16, nameArabic: "النحل", nameEnglish: "An-Nahl", meaning: "The Bee", ayatCount: 128, revelationOrder: 70, type: "meccan", juz: [14] },
  { number: 17, nameArabic: "الإسراء", nameEnglish: "Al-Isra", meaning: "The Night Journey", ayatCount: 111, revelationOrder: 50, type: "meccan", juz: [15] },
  { number: 18, nameArabic: "الكهف", nameEnglish: "Al-Kahf", meaning: "The Cave", ayatCount: 110, revelationOrder: 69, type: "meccan", juz: [15, 16] },
  { number: 19, nameArabic: "مريم", nameEnglish: "Maryam", meaning: "Mary", ayatCount: 98, revelationOrder: 44, type: "meccan", juz: [16] },
  { number: 20, nameArabic: "طه", nameEnglish: "Taha", meaning: "Ta-Ha", ayatCount: 135, revelationOrder: 45, type: "meccan", juz: [16] },
  { number: 21, nameArabic: "الأنبياء", nameEnglish: "Al-Anbya", meaning: "The Prophets", ayatCount: 112, revelationOrder: 73, type: "meccan", juz: [17] },
  { number: 22, nameArabic: "الحج", nameEnglish: "Al-Hajj", meaning: "The Pilgrimage", ayatCount: 78, revelationOrder: 103, type: "medinan", juz: [17] },
  { number: 23, nameArabic: "المؤمنون", nameEnglish: "Al-Mu'minun", meaning: "The Believers", ayatCount: 118, revelationOrder: 74, type: "meccan", juz: [18] },
  { number: 24, nameArabic: "النور", nameEnglish: "An-Nur", meaning: "The Light", ayatCount: 64, revelationOrder: 102, type: "medinan", juz: [18] },
  { number: 25, nameArabic: "الفرقان", nameEnglish: "Al-Furqan", meaning: "The Criterion", ayatCount: 77, revelationOrder: 42, type: "meccan", juz: [18, 19] },
  { number: 26, nameArabic: "الشعراء", nameEnglish: "Ash-Shu'ara", meaning: "The Poets", ayatCount: 227, revelationOrder: 47, type: "meccan", juz: [19] },
  { number: 27, nameArabic: "النمل", nameEnglish: "An-Naml", meaning: "The Ant", ayatCount: 93, revelationOrder: 48, type: "meccan", juz: [19, 20] },
  { number: 28, nameArabic: "القصص", nameEnglish: "Al-Qasas", meaning: "The Stories", ayatCount: 88, revelationOrder: 49, type: "meccan", juz: [20] },
  { number: 29, nameArabic: "العنكبوت", nameEnglish: "Al-'Ankabut", meaning: "The Spider", ayatCount: 69, revelationOrder: 85, type: "meccan", juz: [20, 21] },
  { number: 30, nameArabic: "الروم", nameEnglish: "Ar-Rum", meaning: "The Romans", ayatCount: 60, revelationOrder: 84, type: "meccan", juz: [21] },
  { number: 31, nameArabic: "لقمان", nameEnglish: "Luqman", meaning: "Luqman", ayatCount: 34, revelationOrder: 57, type: "meccan", juz: [21] },
  { number: 32, nameArabic: "السجدة", nameEnglish: "As-Sajdah", meaning: "The Prostration", ayatCount: 30, revelationOrder: 75, type: "meccan", juz: [21] },
  { number: 33, nameArabic: "الأحزاب", nameEnglish: "Al-Ahzab", meaning: "The Combined Forces", ayatCount: 73, revelationOrder: 90, type: "medinan", juz: [21, 22] },
  { number: 34, nameArabic: "سبإ", nameEnglish: "Saba", meaning: "Sheba", ayatCount: 54, revelationOrder: 58, type: "meccan", juz: [22] },
  { number: 35, nameArabic: "فاطر", nameEnglish: "Fatir", meaning: "Originator", ayatCount: 45, revelationOrder: 43, type: "meccan", juz: [22] },
  { number: 36, nameArabic: "يس", nameEnglish: "Ya-Sin", meaning: "Ya-Sin", ayatCount: 83, revelationOrder: 41, type: "meccan", juz: [22, 23] },
  { number: 37, nameArabic: "الصافات", nameEnglish: "As-Saffat", meaning: "Those Who Set the Ranks", ayatCount: 182, revelationOrder: 56, type: "meccan", juz: [23] },
  { number: 38, nameArabic: "ص", nameEnglish: "Sad", meaning: "The Letter Sad", ayatCount: 88, revelationOrder: 38, type: "meccan", juz: [23] },
  { number: 39, nameArabic: "الزمر", nameEnglish: "Az-Zumar", meaning: "The Troops", ayatCount: 75, revelationOrder: 59, type: "meccan", juz: [23, 24] },
  { number: 40, nameArabic: "غافر", nameEnglish: "Ghafir", meaning: "The Forgiver", ayatCount: 85, revelationOrder: 60, type: "meccan", juz: [24] },
  { number: 41, nameArabic: "فصلت", nameEnglish: "Fussilat", meaning: "Explained in Detail", ayatCount: 54, revelationOrder: 61, type: "meccan", juz: [24, 25] },
  { number: 42, nameArabic: "الشورى", nameEnglish: "Ash-Shura", meaning: "The Consultation", ayatCount: 53, revelationOrder: 62, type: "meccan", juz: [25] },
  { number: 43, nameArabic: "الزخرف", nameEnglish: "Az-Zukhruf", meaning: "The Ornaments of Gold", ayatCount: 89, revelationOrder: 63, type: "meccan", juz: [25] },
  { number: 44, nameArabic: "الدخان", nameEnglish: "Ad-Dukhan", meaning: "The Smoke", ayatCount: 59, revelationOrder: 64, type: "meccan", juz: [25] },
  { number: 45, nameArabic: "الجاثية", nameEnglish: "Al-Jathiyah", meaning: "The Crouching", ayatCount: 37, revelationOrder: 65, type: "meccan", juz: [25] },
  { number: 46, nameArabic: "الأحقاف", nameEnglish: "Al-Ahqaf", meaning: "The Wind-Curved Sandhills", ayatCount: 35, revelationOrder: 66, type: "meccan", juz: [26] },
  { number: 47, nameArabic: "محمد", nameEnglish: "Muhammad", meaning: "Muhammad", ayatCount: 38, revelationOrder: 95, type: "medinan", juz: [26] },
  { number: 48, nameArabic: "الفتح", nameEnglish: "Al-Fath", meaning: "The Victory", ayatCount: 29, revelationOrder: 111, type: "medinan", juz: [26] },
  { number: 49, nameArabic: "الحجرات", nameEnglish: "Al-Hujurat", meaning: "The Rooms", ayatCount: 18, revelationOrder: 106, type: "medinan", juz: [26] },
  { number: 50, nameArabic: "ق", nameEnglish: "Qaf", meaning: "The Letter Qaf", ayatCount: 45, revelationOrder: 34, type: "meccan", juz: [26] },
  { number: 51, nameArabic: "الذاريات", nameEnglish: "Adh-Dhariyat", meaning: "The Winnowing Winds", ayatCount: 60, revelationOrder: 67, type: "meccan", juz: [26, 27] },
  { number: 52, nameArabic: "الطور", nameEnglish: "At-Tur", meaning: "The Mount", ayatCount: 49, revelationOrder: 76, type: "meccan", juz: [27] },
  { number: 53, nameArabic: "النجم", nameEnglish: "An-Najm", meaning: "The Star", ayatCount: 62, revelationOrder: 23, type: "meccan", juz: [27] },
  { number: 54, nameArabic: "القمر", nameEnglish: "Al-Qamar", meaning: "The Moon", ayatCount: 55, revelationOrder: 37, type: "meccan", juz: [27] },
  { number: 55, nameArabic: "الرحمن", nameEnglish: "Ar-Rahman", meaning: "The Beneficent", ayatCount: 78, revelationOrder: 97, type: "medinan", juz: [27] },
  { number: 56, nameArabic: "الواقعة", nameEnglish: "Al-Waqi'ah", meaning: "The Inevitable", ayatCount: 96, revelationOrder: 46, type: "meccan", juz: [27] },
  { number: 57, nameArabic: "الحديد", nameEnglish: "Al-Hadid", meaning: "The Iron", ayatCount: 29, revelationOrder: 94, type: "medinan", juz: [27] },
  { number: 58, nameArabic: "المجادلة", nameEnglish: "Al-Mujadila", meaning: "The Pleading Woman", ayatCount: 22, revelationOrder: 105, type: "medinan", juz: [28] },
  { number: 59, nameArabic: "الحشر", nameEnglish: "Al-Hashr", meaning: "The Exile", ayatCount: 24, revelationOrder: 101, type: "medinan", juz: [28] },
  { number: 60, nameArabic: "الممتحنة", nameEnglish: "Al-Mumtahanah", meaning: "She That Is to Be Examined", ayatCount: 13, revelationOrder: 91, type: "medinan", juz: [28] },
  { number: 61, nameArabic: "الصف", nameEnglish: "As-Saf", meaning: "The Ranks", ayatCount: 14, revelationOrder: 109, type: "medinan", juz: [28] },
  { number: 62, nameArabic: "الجمعة", nameEnglish: "Al-Jumu'ah", meaning: "The Congregation, Friday", ayatCount: 11, revelationOrder: 110, type: "medinan", juz: [28] },
  { number: 63, nameArabic: "المنافقون", nameEnglish: "Al-Munafiqun", meaning: "The Hypocrites", ayatCount: 11, revelationOrder: 104, type: "medinan", juz: [28] },
  { number: 64, nameArabic: "التغابن", nameEnglish: "At-Taghabun", meaning: "The Mutual Disillusion", ayatCount: 18, revelationOrder: 108, type: "medinan", juz: [28] },
  { number: 65, nameArabic: "الطلاق", nameEnglish: "At-Talaq", meaning: "The Divorce", ayatCount: 12, revelationOrder: 99, type: "medinan", juz: [28] },
  { number: 66, nameArabic: "التحريم", nameEnglish: "At-Tahrim", meaning: "The Prohibition", ayatCount: 12, revelationOrder: 107, type: "medinan", juz: [28] },
  { number: 67, nameArabic: "الملك", nameEnglish: "Al-Mulk", meaning: "The Sovereignty", ayatCount: 30, revelationOrder: 77, type: "meccan", juz: [29] },
  { number: 68, nameArabic: "القلم", nameEnglish: "Al-Qalam", meaning: "The Pen", ayatCount: 52, revelationOrder: 2, type: "meccan", juz: [29] },
  { number: 69, nameArabic: "الحاقة", nameEnglish: "Al-Haqqah", meaning: "The Reality", ayatCount: 52, revelationOrder: 78, type: "meccan", juz: [29] },
  { number: 70, nameArabic: "المعارج", nameEnglish: "Al-Ma'arij", meaning: "The Ascending Stairways", ayatCount: 44, revelationOrder: 79, type: "meccan", juz: [29] },
  { number: 71, nameArabic: "نوح", nameEnglish: "Nuh", meaning: "Noah", ayatCount: 28, revelationOrder: 71, type: "meccan", juz: [29] },
  { number: 72, nameArabic: "الجن", nameEnglish: "Al-Jinn", meaning: "The Jinn", ayatCount: 28, revelationOrder: 40, type: "meccan", juz: [29] },
  { number: 73, nameArabic: "المزمل", nameEnglish: "Al-Muzzammil", meaning: "The Enshrouded One", ayatCount: 20, revelationOrder: 3, type: "meccan", juz: [29] },
  { number: 74, nameArabic: "المدثر", nameEnglish: "Al-Muddaththir", meaning: "The Cloaked One", ayatCount: 56, revelationOrder: 4, type: "meccan", juz: [29] },
  { number: 75, nameArabic: "القيامة", nameEnglish: "Al-Qiyamah", meaning: "The Resurrection", ayatCount: 40, revelationOrder: 31, type: "meccan", juz: [29] },
  { number: 76, nameArabic: "الانسان", nameEnglish: "Al-Insan", meaning: "The Man", ayatCount: 31, revelationOrder: 98, type: "medinan", juz: [29] },
  { number: 77, nameArabic: "المرسلات", nameEnglish: "Al-Mursalat", meaning: "The Emissaries", ayatCount: 50, revelationOrder: 33, type: "meccan", juz: [29] },
  { number: 78, nameArabic: "النبإ", nameEnglish: "An-Naba", meaning: "The Tidings", ayatCount: 40, revelationOrder: 80, type: "meccan", juz: [30] },
  { number: 79, nameArabic: "النازعات", nameEnglish: "An-Nazi'at", meaning: "Those Who Drag Forth", ayatCount: 46, revelationOrder: 81, type: "meccan", juz: [30] },
  { number: 80, nameArabic: "عبس", nameEnglish: "'Abasa", meaning: "He Frowned", ayatCount: 42, revelationOrder: 24, type: "meccan", juz: [30] },
  { number: 81, nameArabic: "التكوير", nameEnglish: "At-Takwir", meaning: "The Overthrowing", ayatCount: 29, revelationOrder: 7, type: "meccan", juz: [30] },
  { number: 82, nameArabic: "الإنفطار", nameEnglish: "Al-Infitar", meaning: "The Cleaving", ayatCount: 19, revelationOrder: 82, type: "meccan", juz: [30] },
  { number: 83, nameArabic: "المطففين", nameEnglish: "Al-Mutaffifin", meaning: "The Defrauding", ayatCount: 36, revelationOrder: 86, type: "meccan", juz: [30] },
  { number: 84, nameArabic: "الإنشقاق", nameEnglish: "Al-Inshiqaq", meaning: "The Sundering", ayatCount: 25, revelationOrder: 83, type: "meccan", juz: [30] },
  { number: 85, nameArabic: "البروج", nameEnglish: "Al-Buruj", meaning: "The Mansions of the Stars", ayatCount: 22, revelationOrder: 27, type: "meccan", juz: [30] },
  { number: 86, nameArabic: "الطارق", nameEnglish: "At-Tariq", meaning: "The Nightcommer", ayatCount: 17, revelationOrder: 36, type: "meccan", juz: [30] },
  { number: 87, nameArabic: "الأعلى", nameEnglish: "Al-A'la", meaning: "The Most High", ayatCount: 19, revelationOrder: 8, type: "meccan", juz: [30] },
  { number: 88, nameArabic: "الغاشية", nameEnglish: "Al-Ghashiyah", meaning: "The Overwhelming", ayatCount: 26, revelationOrder: 68, type: "meccan", juz: [30] },
  { number: 89, nameArabic: "الفجر", nameEnglish: "Al-Fajr", meaning: "The Dawn", ayatCount: 30, revelationOrder: 10, type: "meccan", juz: [30] },
  { number: 90, nameArabic: "البلد", nameEnglish: "Al-Balad", meaning: "The City", ayatCount: 20, revelationOrder: 35, type: "meccan", juz: [30] },
  { number: 91, nameArabic: "الشمس", nameEnglish: "Ash-Shams", meaning: "The Sun", ayatCount: 15, revelationOrder: 26, type: "meccan", juz: [30] },
  { number: 92, nameArabic: "الليل", nameEnglish: "Al-Layl", meaning: "The Night", ayatCount: 21, revelationOrder: 9, type: "meccan", juz: [30] },
  { number: 93, nameArabic: "الضحى", nameEnglish: "Ad-Duha", meaning: "The Morning Hours", ayatCount: 11, revelationOrder: 11, type: "meccan", juz: [30] },
  { number: 94, nameArabic: "الشرح", nameEnglish: "Ash-Sharh", meaning: "The Relief", ayatCount: 8, revelationOrder: 12, type: "meccan", juz: [30] },
  { number: 95, nameArabic: "التين", nameEnglish: "At-Tin", meaning: "The Fig", ayatCount: 8, revelationOrder: 28, type: "meccan", juz: [30] },
  { number: 96, nameArabic: "العلق", nameEnglish: "Al-'Alaq", meaning: "The Clot", ayatCount: 19, revelationOrder: 1, type: "meccan", juz: [30] },
  { number: 97, nameArabic: "القدر", nameEnglish: "Al-Qadr", meaning: "The Power", ayatCount: 5, revelationOrder: 25, type: "meccan", juz: [30] },
  { number: 98, nameArabic: "البينة", nameEnglish: "Al-Bayyinah", meaning: "The Clear Proof", ayatCount: 8, revelationOrder: 100, type: "medinan", juz: [30] },
  { number: 99, nameArabic: "الزلزلة", nameEnglish: "Az-Zalzalah", meaning: "The Earthquake", ayatCount: 8, revelationOrder: 93, type: "medinan", juz: [30] },
  { number: 100, nameArabic: "العاديات", nameEnglish: "Al-'Adiyat", meaning: "The Courser", ayatCount: 11, revelationOrder: 14, type: "meccan", juz: [30] },
  { number: 101, nameArabic: "القارعة", nameEnglish: "Al-Qari'ah", meaning: "The Calamity", ayatCount: 11, revelationOrder: 30, type: "meccan", juz: [30] },
  { number: 102, nameArabic: "التكاثر", nameEnglish: "At-Takathur", meaning: "The Rivalry in Worldly Increase", ayatCount: 8, revelationOrder: 16, type: "meccan", juz: [30] },
  { number: 103, nameArabic: "العصر", nameEnglish: "Al-'Asr", meaning: "The Declining Day", ayatCount: 3, revelationOrder: 13, type: "meccan", juz: [30] },
  { number: 104, nameArabic: "الهمزة", nameEnglish: "Al-Humazah", meaning: "The Traducer", ayatCount: 9, revelationOrder: 32, type: "meccan", juz: [30] },
  { number: 105, nameArabic: "الفيل", nameEnglish: "Al-Fil", meaning: "The Elephant", ayatCount: 5, revelationOrder: 19, type: "meccan", juz: [30] },
  { number: 106, nameArabic: "قريش", nameEnglish: "Quraysh", meaning: "Quraysh", ayatCount: 4, revelationOrder: 29, type: "meccan", juz: [30] },
  { number: 107, nameArabic: "الماعون", nameEnglish: "Al-Ma'un", meaning: "The Small Kindnesses", ayatCount: 7, revelationOrder: 17, type: "meccan", juz: [30] },
  { number: 108, nameArabic: "الكوثر", nameEnglish: "Al-Kawthar", meaning: "The Abundance", ayatCount: 3, revelationOrder: 15, type: "meccan", juz: [30] },
  { number: 109, nameArabic: "الكافرون", nameEnglish: "Al-Kafirun", meaning: "The Disbelievers", ayatCount: 6, revelationOrder: 18, type: "meccan", juz: [30] },
  { number: 110, nameArabic: "النصر", nameEnglish: "An-Nasr", meaning: "The Divine Support", ayatCount: 3, revelationOrder: 114, type: "medinan", juz: [30] },
  { number: 111, nameArabic: "المسد", nameEnglish: "Al-Masad", meaning: "The Palm Fibre", ayatCount: 5, revelationOrder: 6, type: "meccan", juz: [30] },
  { number: 112, nameArabic: "الإخلاص", nameEnglish: "Al-Ikhlas", meaning: "The Sincerity", ayatCount: 4, revelationOrder: 22, type: "meccan", juz: [30] },
  { number: 113, nameArabic: "الفلق", nameEnglish: "Al-Falaq", meaning: "The Daybreak", ayatCount: 5, revelationOrder: 20, type: "meccan", juz: [30] },
  { number: 114, nameArabic: "الناس", nameEnglish: "An-Nas", meaning: "Mankind", ayatCount: 6, revelationOrder: 21, type: "meccan", juz: [30] },
];

// Derived stats
export const totalAyat = surahs.reduce((sum, s) => sum + s.ayatCount, 0);
export const meccanCount = surahs.filter((s) => s.type === "meccan").length;
export const medinanCount = surahs.filter((s) => s.type === "medinan").length;
