import { getConfig } from "@/app/actions/configActions";
import SettingsForm from "./SettingsForm";

export default async function AdminSettings() {
  const config = await getConfig();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Pengaturan Website</h1>
        <p className="text-xs sm:text-sm text-gray-400">Pusat kontrol konfigurasi utama TUKUKOIN</p>
      </div>

      <SettingsForm initialConfig={config} />
    </div>
  );
}
