import { Sidebar } from "@/components/dashboard/sidebar";
import { RevelationMap } from "@/components/dashboard/revelation-map";

export default function MapPage() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden p-2 pt-14 md:pt-2">
        <RevelationMap />
      </main>
    </div>
  );
}
