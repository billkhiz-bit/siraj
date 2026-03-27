import { Sidebar } from "@/components/dashboard/sidebar";
import { Names3D } from "@/components/dashboard/names-3d";

export default function NamesPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden p-2">
        <Names3D />
      </main>
    </div>
  );
}
