import { Sidebar } from "@/components/dashboard/sidebar";
import { SacredSites3D } from "@/components/dashboard/sacred-sites-3d";

export default function SitesPage() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden p-2 pt-14 md:pt-2">
        <SacredSites3D />
      </main>
    </div>
  );
}
