export interface Journey {
  id: string;
  name: string;
  nameArabic: string;
  year: string;       // CE
  yearHijri?: string; // AH
  description: string;
  colour: string;
  waypoints: Waypoint[];
  keyFigures: KeyFigure[];
}

export interface Waypoint {
  name: string;
  nameArabic: string;
  lat: number;
  lon: number;
  description: string;
  isOrigin?: boolean;
  isDestination?: boolean;
}

export interface KeyFigure {
  name: string;
  nameArabic: string;
  role: string;
  description: string;
}

/**
 * Key journeys in early Islamic history.
 * Sources: Ibn Hisham's Sirah, al-Tabari, Martin Lings "Muhammad".
 */
export const journeys: Journey[] = [
  {
    id: "abyssinia-1",
    name: "First Migration to Abyssinia",
    nameArabic: "الهجرة الأولى إلى الحبشة",
    year: "615 CE",
    description:
      "When persecution in Makkah intensified, the Prophet ﷺ advised a group of Muslims to seek refuge in the Christian kingdom of Aksum (Abyssinia). Around 15 men and women crossed the Red Sea to the court of the Najashi (Negus), who granted them protection. This was the first migration in Islam.",
    colour: "#34d399",
    waypoints: [
      {
        name: "Makkah",
        nameArabic: "مكة",
        lat: 21.4225,
        lon: 39.8262,
        description: "Origin — Muslims fled persecution by the Quraysh",
        isOrigin: true,
      },
      {
        name: "Shu'aybah Port",
        nameArabic: "شعيبة",
        lat: 21.35,
        lon: 39.45,
        description: "Red Sea port where the emigrants boarded ships",
      },
      {
        name: "Aksum",
        nameArabic: "أكسوم",
        lat: 14.121,
        lon: 38.7468,
        description: "Capital of the Aksumite Kingdom — court of the Najashi",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Ja'far ibn Abi Talib (RA)",
        nameArabic: "جعفر بن أبي طالب",
        role: "Leader of the emigrants",
        description:
          "Cousin of the Prophet ﷺ, brother of Ali. Spoke eloquently before the Najashi, reciting Surah Maryam, which moved the king to tears.",
      },
      {
        name: "Najashi (Aṣḥamah ibn Abjar)",
        nameArabic: "النجاشي أصحمة بن أبجر",
        role: "King of Aksum",
        description:
          "Christian king who granted asylum to the Muslim refugees. He recognised the truth of their message and refused to hand them over to the Quraysh envoys. The Prophet ﷺ later prayed the funeral prayer (salat al-gha'ib) for him.",
      },
      {
        name: "Ruqayyah bint Muhammad (RA)",
        nameArabic: "رقية بنت محمد",
        role: "Daughter of the Prophet ﷺ",
        description:
          "Emigrated with her husband Uthman ibn Affan (RA). Among the first group to cross to Abyssinia.",
      },
      {
        name: "Uthman ibn Affan (RA)",
        nameArabic: "عثمان بن عفان",
        role: "Companion, later 3rd Caliph",
        description:
          "Emigrated with his wife Ruqayyah (RA). The Prophet ﷺ said they were the first family to emigrate for the sake of Allah since Ibrahim and Lut.",
      },
    ],
  },
  {
    id: "abyssinia-2",
    name: "Second Migration to Abyssinia",
    nameArabic: "الهجرة الثانية إلى الحبشة",
    year: "616 CE",
    description:
      "A larger group of about 80 men and 18 women migrated to Abyssinia after false reports that the Quraysh had accepted Islam. When they returned and found persecution worse than before, many went back to Aksum. Some remained there until after the Hijrah to Madinah.",
    colour: "#22d3ee",
    waypoints: [
      {
        name: "Makkah",
        nameArabic: "مكة",
        lat: 21.4225,
        lon: 39.8262,
        description: "Origin — larger group fleeing intensified persecution",
        isOrigin: true,
      },
      {
        name: "Shu'aybah Port",
        nameArabic: "شعيبة",
        lat: 21.35,
        lon: 39.45,
        description: "Red Sea crossing point",
      },
      {
        name: "Aksum",
        nameArabic: "أكسوم",
        lat: 14.121,
        lon: 38.7468,
        description: "Refuge under the protection of the Najashi",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Amr ibn al-As",
        nameArabic: "عمرو بن العاص",
        role: "Quraysh envoy (later a Muslim)",
        description:
          "Sent by the Quraysh to convince the Najashi to extradite the Muslims. Failed when Ja'far (RA) recited Surah Maryam. Later embraced Islam and conquered Egypt.",
      },
      {
        name: "Umm Salamah (RA)",
        nameArabic: "أم سلمة",
        role: "Wife of the Prophet ﷺ",
        description:
          "Emigrated to Abyssinia with her first husband Abu Salamah (RA). Later became one of the Mothers of the Believers. Key narrator of hadith.",
      },
    ],
  },
  {
    id: "hijrah",
    name: "The Hijrah to Madinah",
    nameArabic: "الهجرة إلى المدينة",
    year: "622 CE",
    yearHijri: "1 AH",
    description:
      "The pivotal migration of the Prophet ﷺ and his Companions from Makkah to Madinah. This event marks the beginning of the Islamic calendar. The Prophet ﷺ and Abu Bakr hid in the Cave of Thawr for three days before taking an unusual southern route to avoid the Quraysh search parties.",
    colour: "#f59e0b",
    waypoints: [
      {
        name: "Makkah",
        nameArabic: "مكة",
        lat: 21.4225,
        lon: 39.8262,
        description: "Origin — after 13 years of prophethood in Makkah",
        isOrigin: true,
      },
      {
        name: "Cave of Thawr",
        nameArabic: "غار ثور",
        lat: 21.3761,
        lon: 39.8486,
        description: "The Prophet ﷺ and Abu Bakr hid here for 3 days. A spider spun its web over the entrance.",
      },
      {
        name: "Coastal route via Usfan",
        nameArabic: "طريق الساحل",
        lat: 21.9,
        lon: 39.35,
        description: "Took an unusual coastal route south then west to evade the Quraysh",
      },
      {
        name: "Quba",
        nameArabic: "قباء",
        lat: 24.4397,
        lon: 39.6172,
        description: "Arrived here first — built the first mosque in Islam (Masjid Quba)",
      },
      {
        name: "Madinah",
        nameArabic: "المدينة المنورة",
        lat: 24.4672,
        lon: 39.6112,
        description: "Final destination — the city of the Prophet ﷺ, where the Muslim community was established",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Abu Bakr al-Siddiq (RA)",
        nameArabic: "أبو بكر الصديق",
        role: "Companion of the Cave, later 1st Caliph",
        description:
          "Accompanied the Prophet ﷺ on the Hijrah. When they were in the Cave of Thawr and the Quraysh were at the entrance, the Prophet ﷺ said: 'Do not grieve, indeed Allah is with us' (9:40).",
      },
      {
        name: "Asma bint Abi Bakr (RA)",
        nameArabic: "أسماء بنت أبي بكر",
        role: "Daughter of Abu Bakr",
        description:
          "Known as 'She of the Two Belts' (Dhat al-Nitaqayn) — tore her belt to tie provisions for the Prophet ﷺ and her father's journey.",
      },
      {
        name: "Abdullah ibn Urayqit",
        nameArabic: "عبد الله بن أريقط",
        role: "Guide",
        description:
          "A non-Muslim guide hired by Abu Bakr for his knowledge of the desert routes. Led them on the less-known coastal path to avoid detection.",
      },
      {
        name: "Suraqah ibn Malik",
        nameArabic: "سراقة بن مالك",
        role: "Quraysh pursuer (later a Muslim)",
        description:
          "Pursued the Prophet ﷺ for the bounty. His horse's legs sank into the sand three times. He asked for a pledge of safety and later embraced Islam.",
      },
      {
        name: "Bilal ibn Rabah (RA)",
        nameArabic: "بلال بن رباح",
        role: "First mu'adhdhin (caller to prayer)",
        description:
          "Among the early emigrants to Madinah. Formerly enslaved and tortured for his faith. The Prophet ﷺ appointed him as the first person to call the adhan.",
      },
    ],
  },
  {
    id: "taif",
    name: "Journey to Ta'if",
    nameArabic: "رحلة الطائف",
    year: "619 CE",
    description:
      "After the deaths of Khadijah and Abu Talib (the Year of Grief), the Prophet ﷺ travelled to Ta'if to seek support from the Thaqif tribe. He was rejected and stoned, yet he refused the angel's offer to destroy the city, praying instead for their descendants to accept Islam.",
    colour: "#f87171",
    waypoints: [
      {
        name: "Makkah",
        nameArabic: "مكة",
        lat: 21.4225,
        lon: 39.8262,
        description: "Departed after the Year of Grief",
        isOrigin: true,
      },
      {
        name: "Ta'if",
        nameArabic: "الطائف",
        lat: 21.2703,
        lon: 40.4159,
        description: "Mountain city of the Thaqif tribe — the Prophet ﷺ was rejected and stoned",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Zayd ibn Harithah (RA)",
        nameArabic: "زيد بن حارثة",
        role: "Adopted son of the Prophet ﷺ",
        description:
          "Accompanied the Prophet ﷺ to Ta'if. Shielded him with his own body when the people threw stones at them.",
      },
      {
        name: "Addas",
        nameArabic: "عداس",
        role: "Christian servant from Nineveh",
        description:
          "Offered grapes to the Prophet ﷺ outside Ta'if. When the Prophet ﷺ mentioned Yunus (Jonah), Addas was astonished and kissed his hands.",
      },
    ],
  },
  {
    id: "isra-miraj",
    name: "Isra' and Mi'raj (Night Journey)",
    nameArabic: "الإسراء والمعراج",
    year: "621 CE",
    description:
      "The Prophet ﷺ was taken by night from Masjid al-Haram in Makkah to Masjid al-Aqsa in Jerusalem (the Isra'), then ascended through the seven heavens (the Mi'raj). He met previous prophets at each level and received the command for five daily prayers. Referenced in Surah al-Isra (17:1).",
    colour: "#fbbf24",
    waypoints: [
      {
        name: "Masjid al-Haram",
        nameArabic: "المسجد الحرام",
        lat: 21.4225,
        lon: 39.8262,
        description: "Starting point — the Sacred Mosque in Makkah",
        isOrigin: true,
      },
      {
        name: "Masjid al-Aqsa",
        nameArabic: "المسجد الأقصى",
        lat: 31.7761,
        lon: 35.2358,
        description: "The Prophet ﷺ led all the prophets in prayer, then ascended to the heavens",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Jibril (Gabriel)",
        nameArabic: "جبريل",
        role: "Angel who accompanied the Prophet ﷺ",
        description:
          "Guided the Prophet ﷺ throughout the Night Journey and the ascension through the seven heavens.",
      },
      {
        name: "Abu Bakr al-Siddiq (RA)",
        nameArabic: "أبو بكر الصديق",
        role: "Earned the title 'al-Siddiq' (the Truthful)",
        description:
          "When told of the Night Journey, he immediately believed without hesitation, saying: 'If he said it, then it is true.' This earned him the title al-Siddiq.",
      },
    ],
  },
  {
    id: "badr",
    name: "Battle of Badr",
    nameArabic: "غزوة بدر",
    year: "624 CE",
    yearHijri: "2 AH",
    description:
      "The first major battle in Islam. 313 Muslims marched from Madinah to intercept a Quraysh caravan, but instead faced an army of around 1,000. With divine assistance, the Muslims achieved a decisive victory. Referenced extensively in Surah al-Anfal (8). The Qur'an calls it 'Yawm al-Furqan' — the Day of Distinction (8:41).",
    colour: "#ef4444",
    waypoints: [
      {
        name: "Madinah",
        nameArabic: "المدينة المنورة",
        lat: 24.4672,
        lon: 39.6112,
        description: "The Muslim army departed with 313 men",
        isOrigin: true,
      },
      {
        name: "Badr",
        nameArabic: "بدر",
        lat: 23.7833,
        lon: 38.7833,
        description: "Site of the battle — the wells of Badr, between Makkah and Madinah",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Hamzah ibn Abd al-Muttalib (RA)",
        nameArabic: "حمزة بن عبد المطلب",
        role: "Uncle of the Prophet ﷺ, 'Lion of Allah'",
        description:
          "One of the bravest fighters at Badr. He was the Prophet's ﷺ paternal uncle and one of the earliest converts.",
      },
      {
        name: "Ali ibn Abi Talib (RA)",
        nameArabic: "علي بن أبي طالب",
        role: "Cousin of the Prophet ﷺ, later 4th Caliph",
        description:
          "Fought with great distinction at Badr as a young man. One of the three Muslims who fought in single combat at the start of the battle.",
      },
      {
        name: "Bilal ibn Rabah (RA)",
        nameArabic: "بلال بن رباح",
        role: "Companion, first mu'adhdhin",
        description:
          "Participated in the Battle of Badr. A formerly enslaved man who rose to become one of the most honoured Companions.",
      },
    ],
  },
  {
    id: "hudaybiyyah",
    name: "Treaty of Hudaybiyyah",
    nameArabic: "صلح الحديبية",
    year: "628 CE",
    yearHijri: "6 AH",
    description:
      "The Prophet ﷺ set out with about 1,400 Companions for Umrah but was stopped at Hudaybiyyah, near Makkah. A treaty was negotiated which appeared unfavourable but the Qur'an called it a 'clear victory' (Fath, 48:1). The peace allowed Islam to spread rapidly — more people accepted Islam in the next two years than in all previous years combined.",
    colour: "#06b6d4",
    waypoints: [
      {
        name: "Madinah",
        nameArabic: "المدينة المنورة",
        lat: 24.4672,
        lon: 39.6112,
        description: "Departed with ~1,400 Companions in ihram for Umrah",
        isOrigin: true,
      },
      {
        name: "Hudaybiyyah",
        nameArabic: "الحديبية",
        lat: 21.45,
        lon: 39.75,
        description: "On the edge of the Haram boundary — the treaty was signed under a tree (Bay'at al-Ridwan)",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Uthman ibn Affan (RA)",
        nameArabic: "عثمان بن عفان",
        role: "Envoy to Quraysh, later 3rd Caliph",
        description:
          "Sent as ambassador to the Quraysh in Makkah. When rumours spread that he had been killed, the Companions pledged allegiance under the tree (Bay'at al-Ridwan).",
      },
      {
        name: "Suhayl ibn Amr",
        nameArabic: "سهيل بن عمرو",
        role: "Quraysh negotiator (later a Muslim)",
        description:
          "Represented the Quraysh in negotiations. Insisted on strict terms. Later embraced Islam after the Conquest of Makkah.",
      },
    ],
  },
  {
    id: "fath-makkah",
    name: "Conquest of Makkah",
    nameArabic: "فتح مكة",
    year: "630 CE",
    yearHijri: "8 AH",
    description:
      "After the Quraysh violated the Treaty of Hudaybiyyah, the Prophet ﷺ marched to Makkah with approximately 10,000 Companions. The city was conquered almost without bloodshed. The Prophet ﷺ entered the Ka'bah and removed all 360 idols, reciting: 'Truth has come and falsehood has vanished' (17:81). He then granted a general amnesty.",
    colour: "#10b981",
    waypoints: [
      {
        name: "Madinah",
        nameArabic: "المدينة المنورة",
        lat: 24.4672,
        lon: 39.6112,
        description: "Departed with ~10,000 in the largest Muslim force assembled",
        isOrigin: true,
      },
      {
        name: "Marr al-Zahran",
        nameArabic: "مر الظهران",
        lat: 21.65,
        lon: 39.8,
        description: "The army camped here, just outside Makkah. Abu Sufyan came to negotiate and accepted Islam.",
      },
      {
        name: "Makkah",
        nameArabic: "مكة المكرمة",
        lat: 21.4225,
        lon: 39.8262,
        description: "Conquered peacefully — the Ka'bah was cleansed of idols, general amnesty declared",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Abu Sufyan ibn Harb (RA)",
        nameArabic: "أبو سفيان بن حرب",
        role: "Quraysh leader, accepted Islam",
        description:
          "Long-time opponent of the Muslims who accepted Islam on the eve of the conquest. The Prophet ﷺ declared: 'Whoever enters Abu Sufyan's house is safe.'",
      },
      {
        name: "Khalid ibn al-Walid (RA)",
        nameArabic: "خالد بن الوليد",
        role: "Military commander, 'Sword of Allah'",
        description:
          "Had recently embraced Islam and commanded one of the four divisions that entered Makkah. Later became one of history's greatest military commanders.",
      },
      {
        name: "Hind bint Utbah (RA)",
        nameArabic: "هند بنت عتبة",
        role: "Wife of Abu Sufyan, accepted Islam",
        description:
          "Once a fierce opponent who had mutilated Hamzah at Uhud. Accepted Islam after the conquest and the Prophet ﷺ forgave her.",
      },
    ],
  },
  {
    id: "tabuk",
    name: "Expedition to Tabuk",
    nameArabic: "غزوة تبوك",
    year: "630 CE",
    yearHijri: "9 AH",
    description:
      "The longest and most difficult military expedition — a ~700km march north in extreme heat to confront a rumoured Byzantine advance. The army of 30,000 reached Tabuk but no battle occurred. Referenced extensively in Surah at-Tawbah (9), which exposed the hypocrites who refused to march.",
    colour: "#8b5cf6",
    waypoints: [
      {
        name: "Madinah",
        nameArabic: "المدينة المنورة",
        lat: 24.4672,
        lon: 39.6112,
        description: "Departed in extreme summer heat with ~30,000",
        isOrigin: true,
      },
      {
        name: "Al-Hijr (Mada'in Salih)",
        nameArabic: "الحجر (مدائن صالح)",
        lat: 26.79,
        lon: 37.95,
        description: "Passed through the ruins of Thamud — the Prophet ﷺ warned not to drink from its wells",
      },
      {
        name: "Tabuk",
        nameArabic: "تبوك",
        lat: 28.3838,
        lon: 36.5667,
        description: "Northern frontier — the army camped for 20 days. Several local tribes signed peace treaties.",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Abu Bakr al-Siddiq (RA)",
        nameArabic: "أبو بكر الصديق",
        role: "Donated all his wealth for the expedition",
        description:
          "Gave everything he owned to fund the Tabuk expedition. When asked what he left for his family, he replied: 'Allah and His Messenger.'",
      },
      {
        name: "Uthman ibn Affan (RA)",
        nameArabic: "عثمان بن عفان",
        role: "Major financial sponsor",
        description:
          "Equipped a third of the entire army (around 10,000 men) from his own wealth. The Prophet ﷺ said: 'Nothing Uthman does after today will harm him.'",
      },
      {
        name: "Ka'b ibn Malik (RA)",
        nameArabic: "كعب بن مالك",
        role: "Companion who stayed behind",
        description:
          "One of three honest Companions who admitted they had no excuse for not joining. They were boycotted for 50 days until Allah revealed their forgiveness in Surah at-Tawbah (9:118).",
      },
    ],
  },
  {
    id: "farewell",
    name: "Farewell Pilgrimage",
    nameArabic: "حجة الوداع",
    year: "632 CE",
    yearHijri: "10 AH",
    description:
      "The Prophet's ﷺ only Hajj and his final major journey. Over 100,000 Companions accompanied him. At Arafat, he delivered the Farewell Sermon — a landmark declaration of human rights, equality, and the completion of the religion. Shortly after, the verse was revealed: 'Today I have perfected your religion for you' (5:3).",
    colour: "#f59e0b",
    waypoints: [
      {
        name: "Madinah",
        nameArabic: "المدينة المنورة",
        lat: 24.4672,
        lon: 39.6112,
        description: "Departed with over 100,000 Companions",
        isOrigin: true,
      },
      {
        name: "Makkah (Ka'bah)",
        nameArabic: "مكة (الكعبة)",
        lat: 21.4225,
        lon: 39.8262,
        description: "Performed Tawaf and Sa'i",
      },
      {
        name: "Arafat",
        nameArabic: "عرفات",
        lat: 21.3549,
        lon: 39.9842,
        description: "Delivered the Farewell Sermon — 'All mankind is from Adam, and Adam is from dust'",
      },
      {
        name: "Muzdalifah",
        nameArabic: "مزدلفة",
        lat: 21.3873,
        lon: 39.9264,
        description: "Spent the night in prayer after leaving Arafat",
      },
      {
        name: "Mina",
        nameArabic: "منى",
        lat: 21.4132,
        lon: 39.8935,
        description: "Stoning of the Jamarat, sacrifice, and completion of the rites of Hajj",
        isDestination: true,
      },
    ],
    keyFigures: [
      {
        name: "Fatimah al-Zahra (RA)",
        nameArabic: "فاطمة الزهراء",
        role: "Daughter of the Prophet ﷺ",
        description:
          "Accompanied her father on the Farewell Pilgrimage. The Prophet ﷺ confided to her that he would pass away soon. She wept, then smiled when he told her she would be the first of his family to join him.",
      },
      {
        name: "Ali ibn Abi Talib (RA)",
        nameArabic: "علي بن أبي طالب",
        role: "Cousin and son-in-law of the Prophet ﷺ",
        description:
          "Arrived from Yemen with a separate group to join the pilgrimage. The Prophet ﷺ shared his sacrificial animals with Ali.",
      },
      {
        name: "Jabir ibn Abdullah (RA)",
        nameArabic: "جابر بن عبد الله",
        role: "Narrator of the Farewell Pilgrimage hadith",
        description:
          "Provided the most detailed account of the entire Farewell Pilgrimage, preserved in Sahih Muslim. His narration is the primary source for the rites of Hajj as performed by the Prophet ﷺ.",
      },
    ],
  },
];
