import { Sidebar } from "@/components/dashboard/sidebar";
import { Surah3DChart } from "@/components/dashboard/surah-3d-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { totalAyat, meccanCount, medinanCount, surahs } from "@/lib/data/surahs";

export default function DashboardPage() {
  const longestSurah = surahs.reduce((a, b) =>
    a.ayatCount > b.ayatCount ? a : b
  );

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 md:px-6 md:py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Surah Structure
            </h1>
            <p className="mt-2 text-muted-foreground">
              Explore the structural composition of all 114 surahs. Use the
              tabs to sort by:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li><span className="font-medium text-foreground">Canonical</span> - the standard order as printed in the mushaf (1. Al-Fatihah to 114. An-Nas)</li>
              <li><span className="font-medium text-foreground">Revelation</span> - the chronological order in which surahs were revealed to the Prophet ﷺ (starting with Al-&apos;Alaq)</li>
              <li><span className="font-medium text-foreground">By Length</span> - sorted from longest to shortest by number of ayat</li>
            </ul>
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Ayat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-2xl font-bold">
                  {totalAyat.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Meccan Surahs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-2xl font-bold text-cyan-400">
                  {meccanCount}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Medinan Surahs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-2xl font-bold text-violet-400">
                  {medinanCount}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Longest Surah
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-lg font-bold">
                  {longestSurah.nameEnglish}
                </p>
                <p className="text-xs text-muted-foreground">
                  {longestSurah.ayatCount} ayat
                </p>
              </CardContent>
            </Card>
          </div>

          <Surah3DChart />
        </div>
      </main>
    </div>
  );
}
