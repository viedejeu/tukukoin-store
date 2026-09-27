"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Baca artikel ini: ${title}`,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center justify-center gap-2 bg-black-light border border-black-border hover:border-gold hover:text-gold px-4 py-1.5 rounded-full text-xs font-bold transition-colors w-full sm:w-auto mt-2 sm:mt-0"
    >
      <Share2 className="w-3.5 h-3.5" /> Bagikan
    </button>
  );
}
