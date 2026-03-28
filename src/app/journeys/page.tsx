import { Sidebar } from "@/components/dashboard/sidebar";
import { JourneysMap } from "@/components/dashboard/journeys-map";

export default function JourneysPage() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden p-2 pt-14 md:pt-2">
        <JourneysMap />
      </main>
    </div>
  );
}
