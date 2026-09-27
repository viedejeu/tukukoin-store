"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  const q = searchParams.get("q");

  // Sync state with URL parameter when URL changes
  useEffect(() => {
    if (q !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(q);
    }
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden md:flex relative max-w-xs w-full mx-8 group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gold transition-colors" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari game atau artikel..."
        className="w-full h-10 bg-black-light rounded-full pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold border border-transparent focus:border-gold transition-all placeholder:text-gray-500"
      />
      {query.trim() && (
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-black text-xs px-2 py-1 rounded-full font-bold hover:bg-yellow-500 transition-colors"
        >
          Cari
        </button>
      )}
    </form>
  );
}
