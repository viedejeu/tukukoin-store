"use client";

import { useState } from "react";
import { Bot, X, ChevronRight } from "lucide-react";
import type { SiteConfig } from "@/app/actions/configActions";

export default function FloatingChat({ config }: { config?: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  // Fallback if config is missing for some reason
  const waNumber = config?.whatsappNumber || "6281234567890";
  const telegramUrl = config?.telegramUrl || "#";
  const channelUrl = config?.officialChannelUrl || "#";
  const siteName = config?.siteName || "TukuKoin";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Compact Popup Menu */}
      {isOpen && (
        <div className="mb-4 w-[280px] sm:w-[300px] bg-[#0A0A0A]/95  border border-white/10 rounded-2xl shadow-[0_5px_30px_rgba(255,140,0,0.15)] overflow-hidden animate-in slide-in-from-bottom-3 fade-in duration-200">
          
          {/* Header */}
          <div className="p-3 flex items-center justify-between border-b border-white/5 bg-white/5">
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF8C00] to-yellow-600 flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0A0A0A] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm leading-tight">{siteName} Asisten</h3>
                <p className="text-[0.6rem] text-green-400 font-medium">Online</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              aria-label="Tutup chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Content Area */}
          <div className="p-4 flex flex-col gap-3">
            
            {/* AI Message Bubble */}
            <div className="bg-white/5 border border-white/5 rounded-xl rounded-tl-sm p-3 text-xs text-gray-300">
              <p>Halo! Ada yang bisa kami bantu hari ini?</p>
            </div>

            {/* Options */}
            <div className="space-y-2 mt-1">
              
              {/* WhatsApp Option */}
              <a 
                href={`https://wa.me/${waNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-green-500/30 hover:bg-green-500/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-[0.8rem] font-medium text-gray-300 group-hover:text-white transition-colors">WhatsApp Admin</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-green-500 transition-colors" />
              </a>
              
              {/* Telegram Option */}
              <a 
                href={telegramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <span className="text-[0.8rem] font-medium text-gray-300 group-hover:text-white transition-colors">Grup Telegram</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-500 transition-colors" />
              </a>

              {/* Channel Option */}
              <a 
                href={channelUrl} 
                target="_blank"
                rel="noopener noreferrer" 
                className="group flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 hover:border-green-500/30 hover:bg-green-500/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-[0.8rem] font-medium text-gray-300 group-hover:text-white transition-colors">Saluran WhatsApp</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-green-500 transition-colors" />
              </a>

            </div>
          </div>
        </div>
      )}

      {/* Simplified Compact Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Asisten"
        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden border ${
          isOpen 
            ? "bg-black/90 border-white/20 text-gray-400 shadow-lg" 
            : "bg-gradient-to-br from-[#1a1a1a] to-[#050505] border-[#FF8C00]/40 text-[#FF8C00] shadow-[0_0_15px_rgba(255,140,0,0.2)]"
        }`}
      >
        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>
      </button>
    </div>
  );
}
