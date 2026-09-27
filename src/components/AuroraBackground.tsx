"use client";

import { motion } from "framer-motion";
import { SiteConfig } from "@/app/actions/configActions";

export default function AuroraBackground({ config }: { config: SiteConfig }) {
  // Use config colors or fallbacks
  const bg = config.auroraBgColor || "#030014";
  const orb1 = config.auroraOrb1Color || "#D4AF37";
  const orb2 = config.auroraOrb2Color || "#3b82f6";
  const orb3 = config.auroraOrb3Color || "#9333ea";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ backgroundColor: bg }}>
      {/* Orb 1: Kiri Ekstrim */}
      <motion.div 
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -left-[10%] w-[30rem] md:w-[45rem] h-[30rem] md:h-[45rem] blur-[120px] rounded-full mix-blend-screen opacity-15"
        style={{ backgroundColor: orb1 }}
      />
      {/* Orb 2: Kanan Ekstrim */}
      <motion.div 
        animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0], scale: [1, 1.5, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] -right-[15%] w-[35rem] md:w-[50rem] h-[35rem] md:h-[50rem] blur-[130px] rounded-full mix-blend-screen opacity-15"
        style={{ backgroundColor: orb2 }}
      />
      {/* Orb 3: Bawah Menyebar */}
      <motion.div 
        animate={{ x: [0, 100, -100, 0], y: [0, 30, -30, 0], scale: [1, 0.9, 1.3, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[40rem] md:w-[60rem] h-[25rem] md:h-[35rem] blur-[140px] rounded-[100%] mix-blend-screen opacity-15"
        style={{ backgroundColor: orb3 }}
      />
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
      />
    </div>
  );
}
