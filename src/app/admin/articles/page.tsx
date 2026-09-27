import { getArticles } from "@/app/actions/articlesActions";
import { getGames } from "@/app/actions/gamesActions";
import ArticlesManager from "./ArticlesManager";

export const dynamic = 'force-dynamic';

export default async function AdminArticles() {
  const articles = await getArticles();
  const games = await getGames();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Artikel Blog</h1>
          <p className="text-sm text-gray-400">Tulis dan kelola artikel untuk website Anda.</p>
        </div>
      </div>

      <ArticlesManager initialArticles={articles} games={games} />
    </div>
  );
}
