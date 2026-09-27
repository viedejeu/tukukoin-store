"use server";

import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth";

export interface User {
  id: string;
  username: string;
  role: "SUPER_ADMIN" | "EDITOR";
  isActive: boolean;
  createdAt: string;
}

// Check if current user is Super Admin
async function isSuperAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('tukukoin_admin_session');
  if (!token) return false;
  
  const payload = await verifyJwt(token.value);
  return payload?.role === 'SUPER_ADMIN';
}

export async function getUsers(): Promise<User[]> {
  try {
    const db = await getDb();
    if (!db) return [];
    
    // Auto-migrate: if no users exist, create the first super admin
    const usersCount = await db.collection('users').countDocuments();
    if (usersCount === 0) {
      // Find the old password hash from config
      const config = await db.collection('config').findOne({});
      const legacyHash = config?.adminPasswordHash;
      
      // If legacy hash doesn't exist, we must generate a new one for "admin123"
      let defaultHash = legacyHash;
      if (!defaultHash) {
        defaultHash = await bcrypt.hash("admin123", 10);
      }

      await db.collection('users').insertOne({
        username: "admin",
        passwordHash: defaultHash,
        role: "SUPER_ADMIN",
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }

    const users = await db.collection('users').find({}).toArray();
    return users.map(u => ({
      id: u._id.toString(),
      username: u.username,
      role: u.role,
      isActive: u.isActive !== false,
      createdAt: u.createdAt
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function createUser(data: { username: string; passwordRaw: string; role: "SUPER_ADMIN" | "EDITOR" }) {
  if (!(await isSuperAdmin())) return { success: false, error: "Akses ditolak" };
  
  try {
    const db = await getDb();
    if (!db) throw new Error("DB Connection failed");

    // Check if username exists
    const existing = await db.collection('users').findOne({ username: data.username });
    if (existing) return { success: false, error: "Username sudah digunakan" };

    const passwordHash = await bcrypt.hash(data.passwordRaw, 10);

    await db.collection('users').insertOne({
      username: data.username,
      passwordHash,
      role: data.role,
      isActive: true,
      createdAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal membuat pengguna" };
  }
}

export async function updateUserStatus(id: string, isActive: boolean) {
  if (!(await isSuperAdmin())) return { success: false, error: "Akses ditolak" };
  
  try {
    const db = await getDb();
    if (!db) throw new Error("DB connection failed");

    // Prevent deactivating the only active super admin
    if (!isActive) {
      const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      if (user?.role === 'SUPER_ADMIN') {
        const activeAdmins = await db.collection('users').countDocuments({ role: 'SUPER_ADMIN', isActive: true });
        if (activeAdmins <= 1) {
          return { success: false, error: "Tidak dapat menonaktifkan satu-satunya Super Admin aktif" };
        }
      }
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive } }
    );
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal memperbarui status" };
  }
}

export async function deleteUser(id: string) {
  if (!(await isSuperAdmin())) return { success: false, error: "Akses ditolak" };
  
  try {
    const db = await getDb();
    if (!db) throw new Error("DB connection failed");

    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (user?.role === 'SUPER_ADMIN') {
      const activeAdmins = await db.collection('users').countDocuments({ role: 'SUPER_ADMIN' });
      if (activeAdmins <= 1) {
        return { success: false, error: "Tidak dapat menghapus satu-satunya Super Admin" };
      }
    }

    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal menghapus pengguna" };
  }
}

export async function changeUserPassword(id: string, newPasswordRaw: string) {
  if (!(await isSuperAdmin())) return { success: false, error: "Akses ditolak" };
  
  try {
    const db = await getDb();
    if (!db) throw new Error("DB connection failed");

    const passwordHash = await bcrypt.hash(newPasswordRaw, 10);
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { passwordHash } }
    );
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Gagal mengubah kata sandi" };
  }
}
