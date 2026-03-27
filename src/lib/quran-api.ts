const BASE_URL = "https://api.quran.com/api/v4";

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  transliteration?: string;
  juz_number: number;
  hizb_number: number;
  ruku_number: number;
  page_number: number;
  sajdah_number: number | null;
  translation?: string;
}

export interface ChapterInfo {
  id: number;
  chapter_id: number;
  text: string; // HTML description
  short_text: string;
  source: string;
}

export async function fetchVerses(
  chapterId: number,
  page = 1,
  perPage = 50
): Promise<{ verses: Verse[]; totalCount: number }> {
  const res = await fetch(
    `${BASE_URL}/verses/by_chapter/${chapterId}?language=en&translations=131&fields=text_uthmani,verse_key&words=true&word_fields=transliteration&per_page=${perPage}&page=${page}`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error(`Failed to fetch verses for chapter ${chapterId}`);

  const data = await res.json();

  interface ApiWord {
    transliteration?: { text: string | null };
  }

  const verses: Verse[] = data.verses.map(
    (v: Record<string, unknown> & { translations?: Array<{ text: string }>; words?: ApiWord[] }) => {
      const translitWords = (v.words || [])
        .filter((w: ApiWord) => w.transliteration?.text)
        .map((w: ApiWord) => w.transliteration!.text!);

      return {
        id: v.id,
        verse_number: v.verse_number,
        verse_key: v.verse_key,
        text_uthmani: v.text_uthmani,
        transliteration: translitWords.join(" ") || undefined,
        juz_number: v.juz_number,
        hizb_number: v.hizb_number,
        ruku_number: v.ruku_number,
        page_number: v.page_number,
        sajdah_number: v.sajdah_number,
        translation: v.translations?.[0]?.text?.replace(/<[^>]*>/g, "") ?? undefined,
      };
    }
  );

  return {
    verses,
    totalCount: data.pagination?.total_records ?? verses.length,
  };
}

export async function fetchAllVerses(chapterId: number): Promise<Verse[]> {
  const allVerses: Verse[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { verses, totalCount } = await fetchVerses(chapterId, page, 50);
    allVerses.push(...verses);
    hasMore = allVerses.length < totalCount;
    page++;
  }

  return allVerses;
}

export async function fetchChapterInfo(chapterId: number): Promise<ChapterInfo | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/chapters/${chapterId}/info?language=en`,
      { cache: "force-cache" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.chapter_info;
  } catch {
    return null;
  }
}
