"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface Testimonial {
  id: string;
  name: string;
  game: string;
  rating: number;
  message: string;
  isApproved: boolean;
  createdAt: string;
}

const testimonialsFilePath = path.join(process.cwd(), 'src', 'data', 'db', 'testimonials.json');

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const db = await getDb();
    if (db) {
      const testimonials = await db.collection('testimonials').find({}).sort({ createdAt: -1 }).toArray();
      if (testimonials.length > 0) {
        return testimonials.map(t => {
          const { _id, ...rest } = t;
          return { ...rest, id: _id.toString() } as unknown as Testimonial;
        });
      }
    }

    try {
      const fileContent = await fs.readFile(testimonialsFilePath, 'utf-8');
      return JSON.parse(fileContent) as Testimonial[];
    } catch {
      return [];
    }
  } catch (error) {
    console.error("Gagal membaca testimonials:", error);
    return [];
  }
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const all = await getTestimonials();
  return all.filter(t => t.isApproved);
}

export async function saveTestimonials(testimonials: Testimonial[]) {
  try {
    await fs.writeFile(testimonialsFilePath, JSON.stringify(testimonials, null, 2), 'utf-8');
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: "Berhasil menyimpan Testimoni" };
  } catch (error) {
    console.error("Gagal menyimpan testimonials.json:", error);
    throw new Error("Gagal menyimpan testimoni");
  }
}

export async function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'isApproved' | 'createdAt'>) {
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    isApproved: false,
    createdAt: new Date().toISOString()
  };

  const db = await getDb();
  if (db) {
    await db.collection('testimonials').insertOne({ ...newTestimonial });
    revalidatePath('/admin/testimonials');
    return { success: true, message: "Testimoni berhasil dikirim dan menunggu persetujuan" };
  } else {
    const testimonials = await getTestimonials();
    testimonials.unshift(newTestimonial);
    return saveTestimonials(testimonials);
  }
}

export async function toggleApproval(id: string, isApproved: boolean) {
  const db = await getDb();
  if (db) {
    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { id };
    }
    await db.collection('testimonials').updateOne(filter, { $set: { isApproved } });
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: "Status testimoni diperbarui" };
  } else {
    const testimonials = await getTestimonials();
    const index = testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      testimonials[index].isApproved = isApproved;
      return saveTestimonials(testimonials);
    }
    throw new Error("Testimoni tidak ditemukan");
  }
}

export async function deleteTestimonial(id: string) {
  const db = await getDb();
  if (db) {
    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { id };
    }
    await db.collection('testimonials').deleteOne(filter);
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: "Berhasil menghapus Testimoni" };
  } else {
    const testimonials = await getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    return saveTestimonials(filtered);
  }
}

export async function bulkDeleteTestimonials(ids: string[]) {
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

    await db.collection('testimonials').deleteMany(filter);
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true, message: 'Berhasil menghapus testimoni terpilih' };
  } else {
    const testimonials = await getTestimonials();
    const filtered = testimonials.filter(t => !ids.includes(t.id));
    return saveTestimonials(filtered);
  }
}
