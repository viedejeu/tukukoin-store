import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import gamesDataFallback from '@/data/db/games.json';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const db = await getDb();
    
    if (!db) {
      return NextResponse.json({ 
        status: "error", 
        message: "Tidak dapat terhubung ke MongoDB. Pastikan MONGODB_URI sudah diatur di environment (Vercel)." 
      }, { status: 500 });
    }

    const gamesCollection = db.collection('games');
    let insertedOrUpdated = 0;

    for (const game of gamesDataFallback) {
      // Hilangkan id (karena MongoDB menggunakan _id)
      const { id, ...gameDataWithoutId } = game as any;
      
      await gamesCollection.updateOne(
        { slug: gameDataWithoutId.slug },
        { $set: gameDataWithoutId },
        { upsert: true }
      );
      insertedOrUpdated++;
    }

    // Bersihkan cache statis Next.js agar perubahan langsung terlihat
    revalidatePath('/', 'layout');

    return NextResponse.json({  
      status: "success", 
      message: "Sinkronisasi berhasil! Mega-Mall telah tertanam di MongoDB.",
      total_synced: insertedOrUpdated 
    });

  } catch (error: any) {
    console.error("Gagal melakukan sinkronisasi:", error);
    return NextResponse.json({ 
      status: "error", 
      message: "Terjadi kesalahan saat sinkronisasi.", 
      error: error.message 
    }, { status: 500 });
  }
}
