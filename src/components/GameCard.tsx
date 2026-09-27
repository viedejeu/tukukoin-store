import Image from "next/image";
import Link from "next/link";
import { Game } from "@/data/games";

export default function GameCard({ game }: { game: Game }) {
  const cardContent = (
    <>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={game.image}
          alt={`Top Up ${game.name} Termurah - TukuKoin`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
        />
      </div>
      <div className="p-2 sm:p-5 flex flex-col flex-grow justify-end relative z-10">
        <h3 className="font-bold text-foreground text-[0.65rem] sm:text-lg leading-tight sm:leading-snug mb-0.5 sm:mb-1 truncate group-hover:text-gold transition-colors">
          {game.name}
        </h3>
        <p className="text-[0.55rem] sm:text-sm text-gray-400 truncate">{game.developer}</p>
      </div>
    </>
  );

  const className = "group block h-full bg-black-light border border-white/5 rounded-xl md:rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-gold/50 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/80 before:z-0";

  if (game.externalUrl) {
    return (
      <a href={game.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={`/game/${game.slug}`} className={className}>
      {cardContent}
    </Link>
  );
}
