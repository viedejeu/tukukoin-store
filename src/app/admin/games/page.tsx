import { getGames } from "@/app/actions/gamesActions";
import GamesManager from "./GamesManager";

export const dynamic = 'force-dynamic';

export default async function AdminGames() {
  const games = await getGames();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Game</h1>
          <p className="text-sm text-gray-400">Atur daftar game dan link web tujuan Anda di sini.</p>
        </div>
      </div>

      <GamesManager initialGames={games} />
    </div>
  );
}
