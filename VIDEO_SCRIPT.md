# Siraj - Video Demo Script (Conversational, ~3 minutes)

Record your screen with the app open. Speak naturally as if you're showing a friend.

---

## [0:00 - 0:10] Opening

*[Screen: Landing page, dark background, Bismillah appears]*

"Assalamu Alaikum everyone! So I built something I'm really excited about. It's called Siraj, which means 'The Lamp' in Arabic, from Surah Al-Ahzab."

*[Click to enter dashboard]*

---

## [0:10 - 0:35] What it does

"So the idea is simple. The Qur'an has incredible structure and patterns, but when you're reading it on an app, you can't really see that. Like, did you know that Meccan surahs are generally shorter and more poetic, while Medinan surahs are longer and deal with law and society? You can't see that in a text reader. But you can see it here."

*[Show the 3D ring rotating]*

"Each one of these glowing bars is a surah. The height is how many ayat it has. Cyan is Meccan, violet is Medinan. And that tall one right there? That's Al-Baqarah, 286 ayat."

---

## [0:35 - 1:00] Sorting and clicking

*[Click Revelation tab]*

"You can sort them three ways. Canonical is the order in the mushaf. Revelation is the chronological order they were revealed, which starts with Al-'Alaq, not Al-Fatihah. And By Length just shows you the longest to shortest."

*[Click on a surah bar]*

"If I click on any surah, it takes me to a detail page with every single ayah. Arabic text, English transliteration, and translation. All pulled from the Qur'an.com API so the data is verified."

*[Hover over a verse bar in the 3D chart]*

"And this 3D chart shows each ayah as a bar where the height is the word count."

---

## [1:00 - 1:25] Word Frequency and Names

*[Navigate to Word Frequency]*

"This is probably one of my favourites. Every floating word here is a key Qur'anic term in Arabic. The bigger the word, the more it appears. 'Allah' appears 2,699 times. You can filter by category and if you click on any word, it actually searches the Qur'an and shows you the ayahs that contain it."

*[Click a word, show results panel]*

*[Navigate to Names of Allah]*

"And this is the 99 Names of Allah arranged in a 3D sphere. 'Allah' is right there in the centre. You can filter by Jamal, which are names of beauty like Ar-Rahman, Jalal which are names of majesty like Al-Jabbar, and Kamal which are names of perfection like Al-Hakeem."

---

## [1:25 - 1:55] Isnad and Prophets

*[Navigate to Isnad Network]*

"This one is really interesting. So in Islam, every hadith has a chain of narration called an isnad. This graph shows who narrated to who, from the Prophet, peace be upon him, down to the Companions, the Tabi'in, and beyond."

*[Click on Abu Hurairah node]*

"If I click Abu Hurairah, he narrated 5,374 hadith, the most of any companion. You can read his full biography right here. Same for Khadijah, Bilal, Khalid ibn al-Walid, everyone."

*[Navigate to Prophet Timeline]*

"The Prophet Timeline shows all 25 prophets mentioned in the Qur'an. The golden rings are the five Ulu al-Azm, the resolute messengers. Musa is mentioned 136 times, the most of any prophet. Click any of them for their story."

---

## [1:55 - 2:30] Maps and Journeys

*[Navigate to Revelation Map]*

"I'm really proud of this one. It's a real map showing exactly where the Qur'an was revealed. The cyan dots around Makkah are the 86 Meccan surahs. The violet dots around Madinah are the 28 Medinan ones. You can toggle the layers on and off and zoom right in."

*[Navigate to Islamic Journeys, show All Journeys view]*

"And the Journeys page is probably the most educational. There are 10 historical routes here. The green ones are the two migrations to Abyssinia, when Muslims fled to the court of the Najashi. The amber one is the Hijrah. The red is the journey to Ta'if."

*[Click on Hijrah]*

"Each journey has the actual route on the map, the waypoints they stopped at, and biographies of key figures like Abu Bakr, Asma, and Bilal."

*[Click on Farewell Pilgrimage]*

"And the Farewell Pilgrimage traces the route from Madinah to Makkah, to Arafat, Muzdalifah, and Mina, with over 100,000 Companions."

---

## [2:10 - 2:30] Sacred Sites

*[Navigate to Sacred Sites, show Ka'bah wireframe]*

"And this is one of my favourites. Sacred Sites shows wireframe 3D models of six holy sites. This is the Ka'bah, and you can see the Hajar al-Aswad corner, the Hijr Ismail wall, Maqam Ibrahim, and those dots moving around it are showing the tawaf, the circumambulation."

*[Click Mount Uhud — camera flies to new angle]*

"Mount Uhud with the archers' hill separate to the south, exactly where it actually is. Cave of Hira where the first revelation was received. Each site has its full history, Qur'anic references, and you can rotate and zoom to explore them."

---

## [2:30 - 2:50] Tech and extras

"Quick note on accuracy, because this is the Qur'an and it has to be right. All the surah data, verse text, and translations come from the Qur'an.com API, which uses the Uthmani script and the Sahih International translation. The revelation order follows the Egyptian Standard from Al-Azhar, which is what's printed in virtually every mushaf in the world. The hadith data comes from an open hadith API covering all six canonical collections. And the word search actually queries the Qur'an.com search API live so the ayah results are real."

*[Show Ctrl+K search, type "Rahman"]*

"There's also a global search with Ctrl+K, keyboard navigation with arrow keys, and it's all built with Next.js, Three.js, and MapLibre. Hosted for free on Cloudflare Pages and the code is open source on GitHub."

---

## [2:50 - 3:00] Close

*[Navigate back to landing page]*

"Siraj means 'lamp' and the goal is to illuminate the data within the Qur'an and Hadith in a way that hasn't been done before. Jazakum Allahu Khairan for watching."

*[Show URL: siraj-ept.pages.dev]*
