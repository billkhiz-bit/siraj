export interface Narrator {
  id: string;
  name: string;
  nameArabic: string;
  generation: "prophet" | "companion" | "tabi'i" | "tabi-tabi'i";
  hadithCount: number;
  deathYear?: number; // Hijri
  description: string;
  biography?: string;
  titles?: string[];
  notableEvents?: string[];
}

export interface NarratorLink {
  source: string;
  target: string;
  hadithCount: number;
}

/**
 * Major hadith narrators and their transmission links.
 * Focused on the most prolific chains through the Kutub al-Sittah.
 */
export const narrators: Narrator[] = [
  // The Prophet (peace be upon him)
  { id: "muhammad", name: "Prophet Muhammad ﷺ", nameArabic: "محمد ﷺ", generation: "prophet", hadithCount: 0, description: "The final Messenger of Allah", titles: ["Seal of the Prophets", "Al-Amin (The Trustworthy)", "Rahmatun lil-Alamin (Mercy to the Worlds)"], biography: "Born in Makkah in 570 CE to the Quraysh tribe. Orphaned young, raised by his grandfather Abd al-Muttalib then his uncle Abu Talib. Known for his honesty and integrity, he was called 'Al-Amin' (the Trustworthy) even before prophethood. At 40, he received the first revelation in the Cave of Hira. He preached in Makkah for 13 years, facing severe persecution, before migrating to Madinah in 622 CE. He established the first Islamic state, united the Arabian Peninsula, and passed away in 632 CE at the age of 63.", notableEvents: ["First revelation in Cave of Hira (610 CE)", "Night Journey and Ascension (621 CE)", "Hijrah to Madinah (622 CE)", "Victory at Badr (624 CE)", "Conquest of Makkah (630 CE)", "Farewell Pilgrimage (632 CE)"] },

  // Companions (Sahabah)
  { id: "abu-bakr", name: "Abu Bakr as-Siddiq (RA)", nameArabic: "أبو بكر الصديق", generation: "companion", hadithCount: 142, deathYear: 13, description: "First Caliph", titles: ["As-Siddiq (The Truthful)", "Companion of the Cave"], biography: "The first adult male to accept Islam and the Prophet's ﷺ closest friend. A wealthy merchant, he spent his fortune freeing enslaved Muslims including Bilal (RA). He accompanied the Prophet ﷺ on the Hijrah, hiding in the Cave of Thawr. After the Prophet's ﷺ passing, he held the Ummah together during the Riddah wars. He ruled for just over 2 years, compiling the Qur'an into a single manuscript.", notableEvents: ["First adult male convert", "Companion in the Cave of Thawr", "First Caliph (632-634 CE)", "Commissioned compilation of the Qur'an"] },
  { id: "umar", name: "Umar ibn al-Khattab (RA)", nameArabic: "عمر بن الخطاب", generation: "companion", hadithCount: 537, deathYear: 23, description: "Second Caliph", titles: ["Al-Faruq (The Distinguisher)", "Amir al-Mu'minin"], biography: "Initially a fierce opponent of Islam, his dramatic conversion strengthened the Muslims in Makkah. As the second Caliph, he expanded the Islamic state from Arabia to Persia, Egypt, and the Levant. He established the Islamic calendar, founded cities like Kufa and Basra, created the public treasury (Bayt al-Mal), and was known for his justice and simplicity. He would patrol the streets at night checking on his citizens.", notableEvents: ["Dramatic conversion to Islam", "Conquest of Jerusalem (637 CE)", "Established the Islamic calendar", "Founded Kufa and Basra", "Assassinated in 644 CE"] },
  { id: "uthman", name: "Uthman ibn Affan (RA)", nameArabic: "عثمان بن عفان", generation: "companion", hadithCount: 146, deathYear: 35, description: "Third Caliph", titles: ["Dhun-Nurayn (Possessor of Two Lights)"], biography: "A wealthy merchant who married two of the Prophet's ﷺ daughters (Ruqayyah (RA) then Umm Kulthum (RA)), earning the title 'Possessor of Two Lights.' He funded the Tabuk expedition for 10,000 soldiers from his own wealth. As the third Caliph, he standardised the Qur'anic text into a single reading, sending copies to every major city. He was assassinated during a siege of his home while reading the Qur'an.", notableEvents: ["Migrated to Abyssinia twice", "Married two daughters of the Prophet ﷺ", "Funded the Tabuk expedition", "Standardised the Qur'anic text", "Assassinated while reading Qur'an (656 CE)"] },
  { id: "ali", name: "Ali ibn Abi Talib (RA)", nameArabic: "علي بن أبي طالب", generation: "companion", hadithCount: 586, deathYear: 40, description: "Fourth Caliph, cousin of the Prophet ﷺ", titles: ["Abu Turab", "Asadullah (Lion of Allah)", "Bab al-Ilm (Gate of Knowledge)"], biography: "The Prophet's ﷺ cousin and son-in-law (married to Fatimah (RA)). He was the first child to accept Islam and slept in the Prophet's ﷺ bed on the night of the Hijrah to deceive the Quraysh. Known for his bravery at Badr, Uhud, and Khaybar, and his deep knowledge of the Qur'an. The Prophet ﷺ said: 'I am the city of knowledge and Ali is its gate.'", notableEvents: ["First child to accept Islam", "Slept in Prophet's bed during Hijrah", "Hero of Khaybar", "Fourth Caliph (656-661 CE)", "Father of Hasan (RA) and Husayn (RA)"] },
  { id: "abu-hurairah", name: "Abu Hurairah (RA)", nameArabic: "أبو هريرة", generation: "companion", hadithCount: 5374, deathYear: 59, description: "Most prolific narrator", titles: ["Father of the Kitten"], biography: "Accepted Islam in the 7th year of Hijrah and devoted himself entirely to learning from the Prophet ﷺ. He was poor and lived in the Suffah (veranda of the mosque) to be near the Prophet ﷺ at all times. His nickname means 'Father of the Kitten' because he was fond of cats. Despite only spending ~3 years with the Prophet ﷺ, he narrated more hadith than anyone because he memorised everything, and the Prophet ﷺ made du'a for his memory.", notableEvents: ["Accepted Islam at Khaybar (628 CE)", "Lived in the Suffah to learn hadith", "Narrated 5,374 hadith (most of any companion)", "Governor of Bahrain under Umar (RA)"] },
  { id: "aisha", name: "Aisha bint Abi Bakr (RA)", nameArabic: "عائشة بنت أبي بكر", generation: "companion", hadithCount: 2210, deathYear: 58, description: "Wife of the Prophet ﷺ, great scholar", titles: ["Umm al-Mu'minin (Mother of the Believers)", "Al-Siddiqah"], biography: "Daughter of Abu Bakr (RA) and one of the most learned people in Islamic history. Companions would come to her to resolve disagreements about the Prophet's ﷺ practice. She narrated 2,210 hadith and was known for correcting other companions' narrations. She was an expert in fiqh, medicine, poetry, and genealogy. After the Prophet's ﷺ passing, she became one of the most important teachers of the next generation.", notableEvents: ["Major hadith narrator and scholar", "Corrected other companions' reports", "Expert in fiqh and medicine", "Taught many of the next generation's scholars"] },
  { id: "ibn-umar", name: "Abdullah ibn Umar (RA)", nameArabic: "عبد الله بن عمر", generation: "companion", hadithCount: 2630, deathYear: 73, description: "Son of Umar ibn al-Khattab (RA)", biography: "Son of the second Caliph. Known for meticulously following the Prophet's ﷺ every action. He would walk the same paths, pray in the same spots, and even stop his camel where the Prophet ﷺ had stopped. He refused political office his entire life, devoting himself to worship and teaching. He was the last of the major companions to die in Makkah.", notableEvents: ["Fought at Uhud at age 14", "Refused the caliphate multiple times", "Known for strict adherence to Sunnah", "Last major companion to die in Makkah"] },
  { id: "anas", name: "Anas ibn Malik (RA)", nameArabic: "أنس بن مالك", generation: "companion", hadithCount: 2286, deathYear: 93, description: "Servant of the Prophet ﷺ", biography: "His mother brought him to the Prophet ﷺ at age 10 to serve him. He served the Prophet ﷺ for 10 years and said he was never once rebuked or told 'why did you do that?' He lived to be over 100 years old and was the last companion to die in Basra. His long life made him crucial for transmitting hadith to later generations.", notableEvents: ["Served the Prophet ﷺ for 10 years", "Never rebuked by the Prophet ﷺ", "Lived past 100 years", "Last companion to die in Basra"] },
  { id: "ibn-abbas", name: "Abdullah ibn Abbas (RA)", nameArabic: "عبد الله بن عباس", generation: "companion", hadithCount: 1660, deathYear: 68, description: "Scholar of Qur'anic exegesis", titles: ["Hibr al-Ummah (Scholar of the Nation)", "Tarjuman al-Qur'an (Interpreter of the Qur'an)"], biography: "The Prophet's ﷺ cousin. The Prophet ﷺ prayed: 'O Allah, give him understanding of the religion and teach him interpretation.' He became the greatest authority on Qur'anic tafsir. He would camp outside the doors of senior companions to learn hadith. Umar (RA) would consult him despite his youth. He founded the tafsir school that influenced all later Qur'anic scholarship.", notableEvents: ["Prophet ﷺ made du'a for his knowledge", "Greatest authority on Qur'anic tafsir", "Consulted by Umar (RA) despite his youth", "Founded the tafsir tradition"] },
  { id: "jabir", name: "Jabir ibn Abdullah (RA)", nameArabic: "جابر بن عبد الله", generation: "companion", hadithCount: 1540, deathYear: 78, description: "Companion from Madinah", biography: "Participated in nearly all the major events of the Prophet's ﷺ life. His detailed narration of the Farewell Pilgrimage in Sahih Muslim is the primary source for how Hajj is performed. He lost his sight in old age but continued teaching, and students would travel from across the Muslim world to learn from him.", notableEvents: ["Present at the Pledge of Aqabah", "Narrated the Farewell Pilgrimage in detail", "Participated in most battles", "Major teacher in Madinah"] },
  { id: "abu-said", name: "Abu Sa'id al-Khudri (RA)", nameArabic: "أبو سعيد الخدري", generation: "companion", hadithCount: 1170, deathYear: 74, description: "Madinan companion", biography: "Too young to fight at Uhud, he participated in every battle after that. He was known for his courage in speaking truth to power and narrated many hadith about the Prophet's ﷺ teachings on governance, justice, and the end times.", notableEvents: ["Fought in 12 military campaigns", "Known for speaking truth to authority", "Major narrator in Madinah"] },
  { id: "ibn-masud", name: "Abdullah ibn Mas'ud (RA)", nameArabic: "عبد الله بن مسعود", generation: "companion", hadithCount: 848, deathYear: 32, description: "Early convert, Qur'an reciter", titles: ["First to recite Qur'an publicly in Makkah"], biography: "Among the first six people to accept Islam. He was the first person to recite the Qur'an publicly in Makkah, for which he was beaten. The Prophet ﷺ said: 'Whoever wants to recite the Qur'an as fresh as when it was revealed, let him recite it like Ibn Umm Abd (Ibn Mas'ud).' He kept the Prophet's ﷺ sandals, pillow, and miswak.", notableEvents: ["Among the first six converts", "First to recite Qur'an publicly", "Keeper of the Prophet's sandals", "Governor of Kufa under Umar (RA)"] },
  { id: "bilal", name: "Bilal ibn Rabah (RA)", nameArabic: "بلال بن رباح", generation: "companion", hadithCount: 44, deathYear: 20, description: "First mu'adhdhin", titles: ["Mu'adhdhin of the Prophet ﷺ"], biography: "Born into slavery in Makkah, he was among the earliest converts to Islam. His master Umayyah ibn Khalaf tortured him by placing boulders on his chest in the desert sun, but he only said 'Ahad, Ahad' (One, One). Abu Bakr (RA) purchased and freed him. The Prophet ﷺ chose him as the first person to call the adhan. After the Prophet's ﷺ death, he could not bear to give the adhan in Madinah again and moved to Syria.", notableEvents: ["Tortured for his faith, said 'Ahad, Ahad'", "Freed by Abu Bakr (RA)", "First mu'adhdhin in Islam", "Called adhan at the Conquest of Makkah from atop the Ka'bah"] },
  { id: "khadijah", name: "Khadijah bint Khuwaylid (RA)", nameArabic: "خديجة بنت خويلد", generation: "companion", hadithCount: 0, deathYear: -3, description: "First wife of the Prophet ﷺ", titles: ["Mother of the Believers", "Best of women of her time"], biography: "A wealthy and respected businesswoman of Makkah. She proposed marriage to the Prophet ﷺ and was the first person to accept Islam. When the Prophet ﷺ came trembling from the Cave of Hira after the first revelation, she said: 'Never! By Allah, Allah will never disgrace you.' She spent her entire fortune supporting the early Muslim community. The Prophet ﷺ said she was one of the four best women of all time. He never married another woman during her lifetime.", notableEvents: ["First person to accept Islam", "Comforted the Prophet ﷺ after first revelation", "Spent her wealth supporting Islam", "Died in the Year of Grief (619 CE)"] },
  { id: "fatimah", name: "Fatimah al-Zahra (RA)", nameArabic: "فاطمة الزهراء", generation: "companion", hadithCount: 18, deathYear: 11, description: "Daughter of the Prophet ﷺ", titles: ["Al-Zahra (The Radiant)", "Sayyidat Nisa al-Jannah (Leader of Women of Paradise)"], biography: "The youngest daughter of the Prophet ﷺ and Khadijah (RA). She was known for her resemblance to the Prophet ﷺ in character and mannerism. Married to Ali ibn Abi Talib (RA), she was the mother of Hasan (RA) and Husayn (RA). The Prophet ﷺ said she would be the leader of the women of Paradise. She passed away 6 months after the Prophet ﷺ.", notableEvents: ["Mother of Hasan (RA) and Husayn (RA)", "Leader of the women of Paradise", "Resembled the Prophet ﷺ in character", "Passed away 6 months after the Prophet ﷺ"] },
  { id: "khalid", name: "Khalid ibn al-Walid (RA)", nameArabic: "خالد بن الوليد", generation: "companion", hadithCount: 18, deathYear: 21, description: "Military commander", titles: ["Sayf Allah (Sword of Allah)"], biography: "Initially fought against the Muslims at Uhud, where his cavalry charge turned the tide of battle. He accepted Islam before the Conquest of Makkah and became one of history's greatest military commanders. He never lost a single battle in over 100 engagements. He conquered much of Iraq and Syria for Islam. The Prophet ﷺ named him 'Sword of Allah' after the Battle of Mu'tah.", notableEvents: ["Fought against Muslims at Uhud", "Accepted Islam before Conquest of Makkah", "Never lost a battle (100+ engagements)", "Conquered Iraq and Syria", "Named 'Sword of Allah' by the Prophet ﷺ"] },
  { id: "hamzah", name: "Hamzah ibn Abd al-Muttalib (RA)", nameArabic: "حمزة بن عبد المطلب", generation: "companion", hadithCount: 0, deathYear: 3, description: "Uncle of the Prophet ﷺ", titles: ["Asad Allah (Lion of Allah)", "Sayyid al-Shuhada (Chief of Martyrs)"], biography: "The Prophet's ﷺ uncle, known as the strongest man of the Quraysh and a legendary hunter. He accepted Islam after witnessing Abu Jahl insulting the Prophet ﷺ. He was a hero at Badr, defeating many of the Quraysh leaders. He was martyred at Uhud by Wahshi. The Prophet ﷺ called him the 'Chief of Martyrs.'", notableEvents: ["Accepted Islam after Abu Jahl insulted the Prophet ﷺ", "Hero of the Battle of Badr", "Martyred at Uhud (625 CE)", "Called 'Chief of Martyrs' by the Prophet ﷺ"] },
  { id: "abu-dharr", name: "Abu Dharr al-Ghifari (RA)", nameArabic: "أبو ذر الغفاري", generation: "companion", hadithCount: 281, deathYear: 32, description: "Known for asceticism", biography: "Among the first five people to accept Islam. He was known for his extreme asceticism, brutal honesty, and advocacy for the poor. He would condemn any accumulation of wealth beyond basic needs, citing the Prophet's ﷺ teachings. He died alone in the desert of Rabadha, exactly as the Prophet ﷺ had predicted.", notableEvents: ["Among the first five converts", "Known for advocating for the poor", "Died alone in Rabadha as predicted", "Most truthful in speech after Abu Bakr (RA)"] },
  { id: "abu-musa", name: "Abu Musa al-Ash'ari (RA)", nameArabic: "أبو موسى الأشعري", generation: "companion", hadithCount: 360, deathYear: 44, description: "Governor and judge", biography: "Known for his beautiful voice in Qur'an recitation. The Prophet ﷺ said he was given a mizmar (flute) from the mizmars of the family of Dawud. He served as governor of Basra and Kufa and was chosen as arbitrator in the dispute between Ali (RA) and Mu'awiyah (RA).", notableEvents: ["Beautiful Qur'an reciter", "Governor of Basra and Kufa", "Arbitrator between Ali (RA) and Mu'awiyah (RA)"] },
  { id: "muadh", name: "Mu'adh ibn Jabal (RA)", nameArabic: "معاذ بن جبل", generation: "companion", hadithCount: 157, deathYear: 18, description: "Scholar sent to Yemen", biography: "The Prophet ﷺ said he was the most knowledgeable of the Ummah regarding halal and haram. When sent to Yemen as a judge, the Prophet ﷺ asked how he would judge. He replied: by the Qur'an, then the Sunnah, then his own reasoning. The Prophet ﷺ approved. He died young during a plague in Syria.", notableEvents: ["Most knowledgeable in halal and haram", "Sent as judge to Yemen", "Famous dialogue on sources of law", "Died in plague of Amwas (639 CE)"] },
  { id: "salman", name: "Salman al-Farisi (RA)", nameArabic: "سلمان الفارسي", generation: "companion", hadithCount: 60, deathYear: 36, description: "Persian companion", titles: ["Salman al-Khayr (The Good)"], biography: "A Persian Zoroastrian who converted to Christianity while searching for truth, then travelled from Persia to Syria to Arabia seeking the final Prophet. He was enslaved and freed by the Prophet ﷺ and the companions. He suggested digging the trench at the Battle of the Trench (Khandaq), a Persian military tactic unknown to the Arabs. The Prophet ﷺ said: 'Salman is from us, the People of the House.'", notableEvents: ["Travelled from Persia seeking the truth", "Suggested the trench strategy at Khandaq", "Prophet ﷺ called him 'from the People of the House'", "Governor of Ctesiphon (Mada'in)"] },
  { id: "zubayr", name: "Al-Zubayr ibn al-Awwam (RA)", nameArabic: "الزبير بن العوام", generation: "companion", hadithCount: 38, deathYear: 36, description: "One of the ten promised Paradise", titles: ["Hawari Rasulillah (Disciple of the Messenger)"], biography: "The Prophet's ﷺ cousin and one of the first to accept Islam at age 15. He was one of the ten companions promised Paradise. Known for his bravery, he was the first to draw his sword for Islam when a false rumour spread that the Prophet ﷺ had been killed. He fought in every battle alongside the Prophet ﷺ.", notableEvents: ["First to draw a sword for Islam", "One of the ten promised Paradise", "Fought in every battle with the Prophet ﷺ", "Called 'Disciple of the Messenger'"] },
  { id: "talha", name: "Talha ibn Ubaydullah (RA)", nameArabic: "طلحة بن عبيد الله", generation: "companion", hadithCount: 38, deathYear: 36, description: "The Generous", titles: ["Talha al-Khayr (The Good)", "One of the Ten Promised Paradise"], biography: "One of the earliest converts and one of the ten companions promised Paradise. At Uhud, he shielded the Prophet ﷺ with his own body, taking over 70 wounds and losing the use of two fingers. Abu Bakr (RA) said: 'That day belonged to Talha.' He was known for extraordinary generosity, once giving away 700,000 dirhams in a single day.", notableEvents: ["Shielded the Prophet ﷺ at Uhud (70+ wounds)", "One of the ten promised Paradise", "Gave 700,000 dirhams in one day", "Early convert, tortured by Quraysh"] },

  // Tabi'in (Successors)
  { id: "said-musayyib", name: "Sa'id ibn al-Musayyib", nameArabic: "سعيد بن المسيب", generation: "tabi'i", hadithCount: 750, deathYear: 94, description: "Chief scholar of Madinah" },
  { id: "nafi", name: "Nafi' mawla Ibn Umar", nameArabic: "نافع مولى ابن عمر", generation: "tabi'i", hadithCount: 620, deathYear: 117, description: "Freedman of Ibn Umar (RA), key link in golden chain" },
  { id: "urwah", name: "Urwah ibn al-Zubayr", nameArabic: "عروة بن الزبير", generation: "tabi'i", hadithCount: 540, deathYear: 94, description: "Nephew of Aisha (RA), early historian" },
  { id: "hasan-basri", name: "Hasan al-Basri", nameArabic: "الحسن البصري", generation: "tabi'i", hadithCount: 470, deathYear: 110, description: "Famous preacher and ascetic of Basra" },
  { id: "ibn-sirin", name: "Muhammad ibn Sirin", nameArabic: "محمد بن سيرين", generation: "tabi'i", hadithCount: 380, deathYear: 110, description: "Dream interpreter, scholar of Basra" },
  { id: "ata", name: "Ata' ibn Abi Rabah", nameArabic: "عطاء بن أبي رباح", generation: "tabi'i", hadithCount: 350, deathYear: 114, description: "Mufti of Makkah" },
  { id: "qatadah", name: "Qatadah ibn Di'amah", nameArabic: "قتادة بن دعامة", generation: "tabi'i", hadithCount: 410, deathYear: 117, description: "Scholar of Basra, Qur'an expert" },
  { id: "zuhri", name: "Ibn Shihab al-Zuhri", nameArabic: "ابن شهاب الزهري", generation: "tabi'i", hadithCount: 2200, deathYear: 124, description: "First systematic hadith compiler" },

  // Tabi' al-Tabi'in
  { id: "malik", name: "Imam Malik ibn Anas", nameArabic: "مالك بن أنس", generation: "tabi-tabi'i", hadithCount: 1720, deathYear: 179, description: "Author of al-Muwatta, Imam of Madinah" },
  { id: "sufyan-thawri", name: "Sufyan al-Thawri", nameArabic: "سفيان الثوري", generation: "tabi-tabi'i", hadithCount: 1500, deathYear: 161, description: "Commander of the Faithful in Hadith" },
  { id: "shu'bah", name: "Shu'bah ibn al-Hajjaj", nameArabic: "شعبة بن الحجاج", generation: "tabi-tabi'i", hadithCount: 1400, deathYear: 160, description: "Commander of the Faithful in Hadith" },
  { id: "awzai", name: "Al-Awza'i", nameArabic: "الأوزاعي", generation: "tabi-tabi'i", hadithCount: 600, deathYear: 157, description: "Imam of the Levant" },
];

export const narratorLinks: NarratorLink[] = [
  // From the Prophet ﷺ to Companions
  { source: "muhammad", target: "abu-hurairah", hadithCount: 5374 },
  { source: "muhammad", target: "ibn-umar", hadithCount: 2630 },
  { source: "muhammad", target: "anas", hadithCount: 2286 },
  { source: "muhammad", target: "aisha", hadithCount: 2210 },
  { source: "muhammad", target: "ibn-abbas", hadithCount: 1660 },
  { source: "muhammad", target: "jabir", hadithCount: 1540 },
  { source: "muhammad", target: "abu-said", hadithCount: 1170 },
  { source: "muhammad", target: "ibn-masud", hadithCount: 848 },
  { source: "muhammad", target: "umar", hadithCount: 537 },
  { source: "muhammad", target: "ali", hadithCount: 586 },
  { source: "muhammad", target: "abu-bakr", hadithCount: 142 },
  { source: "muhammad", target: "abu-dharr", hadithCount: 281 },
  { source: "muhammad", target: "abu-musa", hadithCount: 360 },
  { source: "muhammad", target: "muadh", hadithCount: 157 },
  { source: "muhammad", target: "bilal", hadithCount: 44 },
  { source: "muhammad", target: "khadijah", hadithCount: 0 },
  { source: "muhammad", target: "fatimah", hadithCount: 18 },
  { source: "muhammad", target: "khalid", hadithCount: 18 },
  { source: "muhammad", target: "hamzah", hadithCount: 0 },
  { source: "muhammad", target: "uthman", hadithCount: 146 },
  { source: "muhammad", target: "salman", hadithCount: 60 },
  { source: "muhammad", target: "zubayr", hadithCount: 38 },
  { source: "muhammad", target: "talha", hadithCount: 38 },

  // Companions to Tabi'in
  { source: "abu-hurairah", target: "said-musayyib", hadithCount: 480 },
  { source: "abu-hurairah", target: "zuhri", hadithCount: 320 },
  { source: "abu-hurairah", target: "hasan-basri", hadithCount: 210 },
  { source: "abu-hurairah", target: "ibn-sirin", hadithCount: 180 },
  { source: "ibn-umar", target: "nafi", hadithCount: 620 },
  { source: "ibn-umar", target: "said-musayyib", hadithCount: 190 },
  { source: "aisha", target: "urwah", hadithCount: 540 },
  { source: "aisha", target: "zuhri", hadithCount: 280 },
  { source: "aisha", target: "qatadah", hadithCount: 120 },
  { source: "ibn-abbas", target: "ata", hadithCount: 350 },
  { source: "ibn-abbas", target: "said-musayyib", hadithCount: 170 },
  { source: "anas", target: "qatadah", hadithCount: 410 },
  { source: "anas", target: "hasan-basri", hadithCount: 260 },
  { source: "anas", target: "zuhri", hadithCount: 200 },
  { source: "jabir", target: "ata", hadithCount: 300 },
  { source: "abu-said", target: "zuhri", hadithCount: 150 },
  { source: "ali", target: "hasan-basri", hadithCount: 140 },
  { source: "umar", target: "ibn-sirin", hadithCount: 100 },

  // Tabi'in to Tabi' Tabi'in
  { source: "nafi", target: "malik", hadithCount: 620 },
  { source: "zuhri", target: "malik", hadithCount: 580 },
  { source: "zuhri", target: "sufyan-thawri", hadithCount: 450 },
  { source: "zuhri", target: "shu'bah", hadithCount: 380 },
  { source: "zuhri", target: "awzai", hadithCount: 220 },
  { source: "said-musayyib", target: "zuhri", hadithCount: 460 },
  { source: "hasan-basri", target: "shu'bah", hadithCount: 310 },
  { source: "qatadah", target: "shu'bah", hadithCount: 400 },
  { source: "qatadah", target: "sufyan-thawri", hadithCount: 280 },
  { source: "ata", target: "sufyan-thawri", hadithCount: 200 },
  { source: "ibn-sirin", target: "shu'bah", hadithCount: 170 },
  { source: "urwah", target: "zuhri", hadithCount: 350 },
];

export const generationColours: Record<string, string> = {
  prophet: "#f59e0b",
  companion: "#22d3ee",
  "tabi'i": "#a78bfa",
  "tabi-tabi'i": "#34d399",
};
