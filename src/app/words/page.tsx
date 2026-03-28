import { Sidebar } from "@/components/dashboard/sidebar";
import { WordCloud3D } from "@/components/dashboard/word-cloud-3d";

export default function WordsPage() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 md:px-6 md:py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Word Frequency
            </h1>
            <p className="mt-2 text-muted-foreground">
              Key Qur&apos;anic terms visualised by frequency. Larger words appear
              more often across all 114 surahs. Filter by category to explore
              divine names, actions, concepts, nature, people, and time.
            </p>
          </div>
          <WordCloud3D />
        </div>
      </main>
    </div>
  );
}
