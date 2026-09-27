"use client";

import { useState } from "react";

export default function ExpandableSeoBlock({ content, title }: { content: string, title: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content || content.trim() === "") return null;

  return (
    <div className="mt-16 bg-black-light border border-black-border p-6 rounded-[1.35rem] shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-yellow-500 opacity-50"></div>
      
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-white">Informasi & Tips {title}</h2>
      
      <div className="relative">
        <div 
          className={`prose prose-invert prose-sm max-w-none transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px]' : 'max-h-[150px] overflow-hidden'}`}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black-light to-transparent pointer-events-none" />
        )}
      </div>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="mt-6 flex items-center gap-2 text-gold hover:text-yellow-400 font-bold text-sm transition-colors mx-auto bg-black-dark/50 px-6 py-2 rounded-full border border-gold/30 hover:border-gold group-hover:shadow-[0_0_15px_rgba(255,95,0,0.2)]"
      >
        {isExpanded ? (
          <>
            Tutup Informasi
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </>
        ) : (
          <>
            Baca Selengkapnya
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </>
        )}
      </button>
    </div>
  );
}
