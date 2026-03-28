import { Sidebar } from "@/components/dashboard/sidebar";
import { ProphetTimeline3D } from "@/components/dashboard/prophet-timeline-3d";

export default function ProphetsPage() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-16 md:px-6 md:py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Prophet Timeline
            </h1>
            <p className="mt-2 text-muted-foreground">
              The 25 prophets mentioned by name in the Qur&apos;an, arranged
              chronologically. Node size reflects how many times each prophet
              is mentioned. The five Ulu al-Azm (Resolute Messengers) are
              highlighted with golden rings: Nuh, Ibrahim, Musa, &apos;Isa,
              and Muhammad ﷺ.
            </p>
          </div>
          <ProphetTimeline3D />
        </div>
      </main>
    </div>
  );
}
