"use server";

import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Sultan, sultansFallback } from '@/data/sultans';

async function ensureMigrated(db: any) {
  const count = await db.collection('sultans').countDocuments();
  if (count === 0) {
    const cloned = sultansFallback.map(s => {
      const { id, ...rest } = s;
      return rest;
    });
    await db.collection('sultans').insertMany(cloned);
  }
}

export async function getSultans(): Promise<Sultan[]> {
  try {
    const db = await getDb();
    if (db) {
      await ensureMigrated(db);
      const sultans = await db.collection('sultans').find({}).sort({ amount: -1 }).toArray();
      if (sultans.length > 0) {
        return sultans.map((s, index) => {
          const { _id, ...rest } = s;
          return { ...rest, id: _id.toString(), rank: index + 1 } as Sultan;
        });
      }
      return sultansFallback;
    }
  } catch (error) {
    console.error("Failed to get sultans from MongoDB", error);
  }
  return sultansFallback;
}

export async function saveSultan(sultan: Partial<Sultan>) {
  try {
    const db = await getDb();
    if (db) {
      if (sultan.id && ObjectId.isValid(sultan.id)) {
        const { id, rank, ...updateData } = sultan as any;
        await db.collection('sultans').updateOne({ _id: new ObjectId(id) }, { $set: updateData });
      } else {
        const { id, rank, ...insertData } = sultan as any;
        await db.collection('sultans').insertOne(insertData);
      }
      revalidatePath('/', 'layout');
      return { success: true };
    }
    return { success: false, message: "Database not connected" };
  } catch (error: any) {
    console.error("Error saving sultan", error);
    return { success: false, message: error.message };
  }
}

export async function deleteSultan(id: string) {
  try {
    const db = await getDb();
    if (db) {
      if (!ObjectId.isValid(id)) {
        return { success: false, message: "Tidak dapat menghapus data pancingan bawaan. Silakan refresh halaman." };
      }
      await db.collection('sultans').deleteOne({ _id: new ObjectId(id) });
      revalidatePath('/', 'layout');
      return { success: true };
    }
    return { success: false, message: "Database not connected" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
