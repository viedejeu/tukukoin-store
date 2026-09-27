"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Game } from '@/data/games';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import gamesDataFallback from '@/data/db/games.json';

const gamesFilePath = path.join(process.cwd(), 'src', 'data', 'db', 'games.json');

export async function getGames(): Promise<Game[]> {
  try {
    const db = await getDb();
    if (db) {
      const games = await db.collection('games').find({}).sort({ order: 1, _id: 1 }).toArray();
      if (games.length > 0) {
        return games.map(g => {
          const { _id, ...rest } = g;
          return { ...rest, id: _id.toString() } as unknown as Game;
        });
      }
    }

    try {
      const fileContent = await fs.readFile(gamesFilePath, 'utf-8');
      return JSON.parse(fileContent) as Game[];
    } catch {
      return gamesDataFallback as Game[];
    }
  } catch (error) {
    console.error("Gagal membaca games:", error);
    return gamesDataFallback as Game[];
  }
}

export async function saveGames(games: Game[]) {
  // This is a helper used by local JSON. For MongoDB we won't rewrite the whole file.
  try {
    await fs.writeFile(gamesFilePath, JSON.stringify(games, null, 2), 'utf-8');
    revalidatePath('/', 'layout');
    return { success: true, message: "Berhasil menyimpan daftar Game" };
  } catch (error) {
    console.error("Gagal menyimpan games.json:", error);
    throw new Error("Gagal menyimpan game");
  }
}

export async function addGame(game: Game) {
  const db = await getDb();
  if (db) {
    await db.collection('games').insertOne({ ...game });
    revalidatePath('/', 'layout');
    return { success: true, message: "Berhasil menyimpan daftar Game" };
  } else {
    const games = await getGames();
    games.push(game);
    return saveGames(games);
  }
}

export async function updateGame(id: string, updatedGame: Partial<Game>) {
  const db = await getDb();
  if (db) {
    const { id: _, ...updateData } = updatedGame as any; // eslint-disable-line
    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { id };
    }
    await db.collection('games').updateOne(filter, { $set: updateData });
    revalidatePath('/', 'layout');
    return { success: true, message: "Berhasil menyimpan daftar Game" };
  } else {
    const games = await getGames();
    const index = games.findIndex(g => g.id === id);
    if (index !== -1) {
      games[index] = { ...games[index], ...updatedGame, id };
      return saveGames(games);
    }
    throw new Error("Game tidak ditemukan");
  }
}

export async function deleteGame(id: string) {
  const db = await getDb();
  if (db) {
    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { id };
    }
    await db.collection('games').deleteOne(filter);
    revalidatePath('/', 'layout');
    return { success: true, message: "Berhasil menyimpan daftar Game" };
  } else {
    const games = await getGames();
    const filtered = games.filter(g => g.id !== id);
    return saveGames(filtered);
  }
}

export async function bulkDeleteGames(ids: string[]) {
  const db = await getDb();
  if (db) {
    const objectIds: ObjectId[] = [];
    const stringIds: string[] = [];
    
    for (const id of ids) {
      try {
        objectIds.push(new ObjectId(id));
      } catch {
        stringIds.push(id);
      }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filter: any = {};
    if (objectIds.length > 0 && stringIds.length > 0) {
      filter = { $or: [{ _id: { $in: objectIds } }, { id: { $in: stringIds } }] };
    } else if (objectIds.length > 0) {
      filter = { _id: { $in: objectIds } };
    } else if (stringIds.length > 0) {
      filter = { id: { $in: stringIds } };
    } else {
      return { success: true };
    }

    await db.collection('games').deleteMany(filter);
    revalidatePath('/', 'layout');
    return { success: true, message: 'Berhasil menghapus game terpilih' };
  } else {
    const games = await getGames();
    const filtered = games.filter(g => !ids.includes(g.id));
    return saveGames(filtered);
  }
}




export async function reorderGame(gameId: string, direction: 'up' | 'down') {
  const db = await getDb();
  if (!db) return { success: false, message: "Hanya berlaku jika menggunakan MongoDB" };

  // Fetch all games sorted
  const games = await db.collection('games').find({}).sort({ order: 1, _id: 1 }).toArray();
  
  // Find current game index
  const currentIndex = games.findIndex(g => g._id.toString() === gameId);
  if (currentIndex === -1) return { success: false, message: "Game tidak ditemukan" };

  // Determine target index
  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= games.length) return { success: true }; // Already at edge

  const currentGame = games[currentIndex];
  const targetGame = games[targetIndex];

  // Assign base order if missing
  games.forEach((g, idx) => {
    if (g.order === undefined) g.order = idx;
  });

  // Swap orders
  const tempOrder = games[targetIndex].order;
  games[targetIndex].order = games[currentIndex].order;
  games[currentIndex].order = tempOrder;

  // If orders are identical (can happen on first init), force a strict swap
  if (games[targetIndex].order === games[currentIndex].order) {
    games[targetIndex].order = targetIndex;
    games[currentIndex].order = currentIndex;
  }

  // Update both in DB
  await db.collection('games').updateOne({ _id: new ObjectId(currentGame._id) }, { $set: { order: games[currentIndex].order } });
  await db.collection('games').updateOne({ _id: new ObjectId(targetGame._id) }, { $set: { order: games[targetIndex].order } });

  revalidatePath('/', 'layout');
  return { success: true };
}
