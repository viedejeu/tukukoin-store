import { getGames } from "@/app/actions/gamesActions";
import { getArticles } from "@/app/actions/articlesActions";
import GameCard from "@/components/GameCard";
import ArticleCard from "@/components/ArticleCard";
import { SearchX } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Pencarian",
  description: "Cari game dan artikel",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : "";
  const lowerQuery = query.toLowerCase();

  const [allGames, allArticles] = await Promise.all([
    getGames(),
    getArticles(),
  ]);

  // Filter games based on query
  const games = allGames.filter(
    (game) =>
      game.name.toLowerCase().includes(lowerQuery) ||
      game.developer.toLowerCase().includes(lowerQuery) ||
      game.description.toLowerCase().includes(lowerQuery)
  );

  // Filter articles based on query
  const articles = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery)
  );

  const hasResults = games.length > 0 || articles.length > 0;

  return (
    <main className="flex min-h-screen flex-col pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="border-b border-black-border pb-6">
          <h1 className="text-3xl font-bold">Hasil Pencarian</h1>
          <p className="text-gray-400 mt-2">
            Menampilkan hasil untuk: <span className="text-white font-semibold">&quot;{query}&quot;</span>
          </p>
        </div>

        {!hasResults && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-black-border rounded-full flex items-center justify-center mb-4">
              <SearchX className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold">Tidak Ditemukan</h2>
            <p className="text-gray-400 max-w-md">
              Maaf, kami tidak dapat menemukan game atau artikel yang cocok dengan kata kunci &quot;{query}&quot;. Coba gunakan kata kunci lain.
            </p>
          </div>
        )}

        {games.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-gold rounded-sm inline-block"></span>
              Game Terkait ({games.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section className="pt-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-gold rounded-sm inline-block"></span>
              Artikel Terkait ({articles.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
