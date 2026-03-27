import { Sidebar } from "@/components/dashboard/sidebar";
import { RevelationMap } from "@/components/dashboard/revelation-map";

export default function MapPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden p-2">
        <RevelationMap />
      </main>
    </div>
  );
}
