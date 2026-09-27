"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Globe, Image as ImageIcon, Phone, UploadCloud, CheckCircle2, Lock, LayoutDashboard } from "lucide-react";
import { SiteConfig, updateConfig } from "@/app/actions/configActions";
import toast from 'react-hot-toast';

export default function SettingsForm({ initialConfig }: { initialConfig: SiteConfig }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "images" | "theme" | "contacts" | "security">("general");
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<"logoUrl" | "bannerUrl" | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateConfig(config);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan konfigurasi");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "logoUrl" | "bannerUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(field);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.url) {
        // Auto-save to DB directly
        const updatedConfig = { ...config, [field]: data.url };
        setConfig(updatedConfig); // Update local state for UI preview
        
        // Push directly to backend
        const saveRes = await updateConfig(updatedConfig);
        if (saveRes.success) {
          toast.success("Gambar berhasil diunggah & disimpan otomatis");
        } else {
          toast.error("Gagal menyimpan ke database");
        }
      } else {
        toast.error("Gagal mengunggah gambar ke cloud");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat mengunggah");
    } finally {
      setIsUploading(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 max-w-7xl mx-auto">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide snap-x">
          <button 
            onClick={() => setActiveTab("general")}
            className={`whitespace-nowrap flex-shrink-0 snap-start flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all text-xs sm:text-base ${
              activeTab === "general" 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "bg-black-light text-gray-400 hover:bg-black-border hover:text-white border border-transparent hover:border-white/10"
            }`}
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" /> Informasi Utama
          </button>
          <button 
            onClick={() => setActiveTab("images")}
            className={`whitespace-nowrap flex-shrink-0 snap-start flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all text-xs sm:text-base ${
              activeTab === "images" 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "bg-black-light text-gray-400 hover:bg-black-border hover:text-white border border-transparent hover:border-white/10"
            }`}
          >
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" /> Logo & Banner
          </button>
          <button 
            onClick={() => setActiveTab("theme")}
            className={`whitespace-nowrap flex-shrink-0 snap-start flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all text-xs sm:text-base ${
              activeTab === "theme" 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "bg-black-light text-gray-400 hover:bg-black-border hover:text-white border border-transparent hover:border-white/10"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" /> Tema & Warna
          </button>
          <button 
            onClick={() => setActiveTab("contacts")}
            className={`whitespace-nowrap flex-shrink-0 snap-start flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl transition-all text-xs sm:text-base ${
              activeTab === "contacts" 
                ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(255,95,0,0.2)]" 
                : "bg-black-light text-gray-400 hover:bg-black-border hover:text-white border border-transparent hover:border-white/10"
            }`}
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Kontak & Komunitas
          </button>
          
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full min-w-0">
        <div className="bg-black-light border border-black-border rounded-xl p-4 sm:p-6 shadow-xl">
          
          {activeTab === "general" && (
            <>
              <div className="border-b border-black-border pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold">Informasi Utama</h2>
                <p className="text-xs sm:text-sm text-gray-400">Pengaturan dasar identitas website Anda.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300">Nama Website / Brand</label>
                  <input 
                    type="text" 
                    value={config.siteName}
                    onChange={(e) => setConfig({...config, siteName: e.target.value})}
                    className="w-full bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300">Tagline (Slogan)</label>
                  <input 
                    type="text" 
                    value={config.siteTagline}
                    onChange={(e) => setConfig({...config, siteTagline: e.target.value})}
                    className="w-full bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "images" && (
            <>
              <div className="border-b border-black-border pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold">Upload Gambar Langsung</h2>
                <p className="text-xs sm:text-sm text-gray-400">Pilih gambar dari komputer, akan otomatis terkirim ke Cloudinary Anda.</p>
              </div>
              <div className="space-y-4 sm:space-y-6">
                
                {/* Logo Uploader */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 flex justify-between items-center">
                    <span>Logo Website</span>
                    {config.logoUrl && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Terpasang</span>}
                  </label>
                  <div className={`relative border-2 border-dashed ${isUploading === 'logoUrl' ? 'border-gold bg-gold/5' : 'border-black-border hover:border-gray-500'} rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center text-center transition-colors`}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleUpload(e, "logoUrl")}
                      disabled={isUploading !== null}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <UploadCloud className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 ${isUploading === 'logoUrl' ? 'text-gold animate-bounce' : 'text-gray-500'}`} />
                    <div className="text-xs sm:text-sm font-medium">
                      {isUploading === 'logoUrl' ? 'Mengunggah ke awan...' : 'Klik atau seret logo ke sini'}
                    </div>
                    <div className="text-[0.6rem] sm:text-xs text-gray-500 mt-1">PNG, JPG, SVG (Maks. 2MB)</div>
                  </div>
                </div>

                {/* Banner Utama Uploader */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300 flex justify-between items-center">
                    <span>Banner Utama (Tema Classic)</span>
                    {config.bannerUrl && <span className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Terpasang</span>}
                  </label>
                  <div className={`relative border-2 border-dashed ${isUploading === 'bannerUrl' ? 'border-gold bg-gold/5' : 'border-black-border hover:border-gray-500'} rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center text-center transition-colors`}>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleUpload(e, "bannerUrl")}
                      disabled={isUploading !== null}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <UploadCloud className={`w-6 h-6 sm:w-8 sm:h-8 mb-2 ${isUploading === 'bannerUrl' ? 'text-gold animate-bounce' : 'text-gray-500'}`} />
                    <div className="text-xs sm:text-sm font-medium">
                      {isUploading === 'bannerUrl' ? 'Mengunggah ke awan...' : 'Klik atau seret banner ke sini'}
                    </div>
                    <div className="text-[0.6rem] sm:text-xs text-gray-500 mt-1">Rasio 16:9 (Maks. 5MB)</div>
                  </div>
                </div>

              </div>
            </>
          )}

          {activeTab === "theme" && (
            <>
              <div className="border-b border-black-border pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold">Warna Aurora & Background</h2>
                <p className="text-xs sm:text-sm text-gray-400">Pilih warna untuk efek cahaya Aurora dan latar belakang utama.</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Warna Background (Deep Space)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={config.auroraBgColor || "#030014"}
                        onChange={(e) => setConfig({...config, auroraBgColor: e.target.value})}
                        className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input 
                        type="text" 
                        value={config.auroraBgColor || "#030014"}
                        onChange={(e) => setConfig({...config, auroraBgColor: e.target.value})}
                        className="flex-1 bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Warna Aurora 1 (Kiri)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={config.auroraOrb1Color || "#D4AF37"}
                        onChange={(e) => setConfig({...config, auroraOrb1Color: e.target.value})}
                        className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input 
                        type="text" 
                        value={config.auroraOrb1Color || "#D4AF37"}
                        onChange={(e) => setConfig({...config, auroraOrb1Color: e.target.value})}
                        className="flex-1 bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Warna Aurora 2 (Kanan)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={config.auroraOrb2Color || "#3b82f6"}
                        onChange={(e) => setConfig({...config, auroraOrb2Color: e.target.value})}
                        className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input 
                        type="text" 
                        value={config.auroraOrb2Color || "#3b82f6"}
                        onChange={(e) => setConfig({...config, auroraOrb2Color: e.target.value})}
                        className="flex-1 bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">Warna Aurora 3 (Bawah)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={config.auroraOrb3Color || "#9333ea"}
                        onChange={(e) => setConfig({...config, auroraOrb3Color: e.target.value})}
                        className="w-12 h-12 rounded cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input 
                        type="text" 
                        value={config.auroraOrb3Color || "#9333ea"}
                        onChange={(e) => setConfig({...config, auroraOrb3Color: e.target.value})}
                        className="flex-1 bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "contacts" && (
            <>
              <div className="border-b border-black-border pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold">Kontak & Sosial Media</h2>
                <p className="text-xs sm:text-sm text-gray-400">Atur nomor WhatsApp dan tautan ke komunitas.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300">Nomor WhatsApp (628...)</label>
                  <input 
                    type="text" 
                    value={config.whatsappNumber}
                    onChange={(e) => setConfig({...config, whatsappNumber: e.target.value})}
                    className="w-full bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300">Tautan Telegram CS</label>
                  <input 
                    type="text" 
                    value={config.telegramUrl}
                    onChange={(e) => setConfig({...config, telegramUrl: e.target.value})}
                    className="w-full bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-300">Saluran WhatsApp</label>
                  <input 
                    type="text" 
                    value={config.officialChannelUrl}
                    onChange={(e) => setConfig({...config, officialChannelUrl: e.target.value})}
                    className="w-full bg-background border border-black-border rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          

        </div>

        {/* Save Button for other tabs */}
        {activeTab !== "security" && (
          <div className="mt-4 sm:mt-6 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-[#ff7a00] text-black font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,95,0,0.3)]"
            >
              {isSaving ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}









