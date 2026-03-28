"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { surahs, totalAyat, meccanCount, medinanCount, type Surah } from "@/lib/data/surahs";

type SortMode = "canonical" | "revelation" | "length";

const MECCAN_COLOUR = "#22d3ee";   // cyan-400
const MEDINAN_COLOUR = "#a78bfa";  // violet-400

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Surah }> }) {
  if (!active || !payload?.[0]) return null;
  const s = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-4 py-3 shadow-lg">
      <p className="font-mono text-lg font-bold">{s.nameArabic}</p>
      <p className="text-sm font-medium text-foreground">
        {s.number}. {s.nameEnglish}
      </p>
      <p className="text-xs text-muted-foreground">&ldquo;{s.meaning}&rdquo;</p>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <Badge variant={s.type === "meccan" ? "default" : "secondary"}>
          {s.type === "meccan" ? "Meccan" : "Medinan"}
        </Badge>
        <span className="text-muted-foreground">{s.ayatCount} ayat</span>
        <span className="text-muted-foreground">Revealed #{s.revelationOrder}</span>
        <span className="text-muted-foreground">Juz {s.juz.join(", ")}</span>
      </div>
    </div>
  );
}

export function SurahChart() {
  const [sortMode, setSortMode] = useState<SortMode>("canonical");

  const sortedData = useMemo(() => {
    const data = [...surahs];
    switch (sortMode) {
      case "revelation":
        return data.sort((a, b) => a.revelationOrder - b.revelationOrder);
      case "length":
        return data.sort((a, b) => b.ayatCount - a.ayatCount);
      default:
        return data.sort((a, b) => a.number - b.number);
    }
  }, [sortMode]);

  const longestSurah = surahs.reduce((a, b) => (a.ayatCount > b.ayatCount ? a : b));
  const shortestSurah = surahs.reduce((a, b) => (a.ayatCount < b.ayatCount ? a : b));

  return (
    <div className="flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total Ayat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold">{totalAyat.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Meccan Surahs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-2xl font-bold" style={{ color: MECCAN_COLOUR }}>
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
            <p className="font-mono text-2xl font-bold" style={{ color: MEDINAN_COLOUR }}>
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
            <p className="font-mono text-lg font-bold">{longestSurah.nameEnglish}</p>
            <p className="text-xs text-muted-foreground">{longestSurah.ayatCount} ayat</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="flex flex-row items-centre justify-between">
          <div>
            <CardTitle>Surah Structure</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Ayat count per surah &middot;{" "}
              <span style={{ color: MECCAN_COLOUR }}>Meccan</span> vs{" "}
              <span style={{ color: MEDINAN_COLOUR }}>Medinan</span>
            </p>
          </div>
          <Tabs value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
            <TabsList>
              <TabsTrigger value="canonical">Canonical</TabsTrigger>
              <TabsTrigger value="revelation">Revelation</TabsTrigger>
              <TabsTrigger value="length">By Length</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full md:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="number"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                  interval={9}
                  label={{
                    value: sortMode === "canonical"
                      ? "Surah Number"
                      : sortMode === "revelation"
                        ? "Revelation Order"
                        : "Rank by Length",
                    position: "insideBottom",
                    offset: -4,
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                  label={{
                    value: "Ayat",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: 12,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--accent))", opacity: 0.3 }}
                />
                <Bar dataKey="ayatCount" radius={[2, 2, 0, 0]} maxBarSize={8}>
                  {sortedData.map((s) => (
                    <Cell
                      key={s.number}
                      fill={s.type === "meccan" ? MECCAN_COLOUR : MEDINAN_COLOUR}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Additional context */}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Shortest: {shortestSurah.nameEnglish} ({shortestSurah.ayatCount} ayat)
            </span>
            <span>
              Average: {Math.round(totalAyat / 114)} ayat per surah
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
