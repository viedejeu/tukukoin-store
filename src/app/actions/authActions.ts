"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { signJwt, verifyJwt, AuthPayload } from "@/lib/auth";

const COOKIE_NAME = "tukukoin_admin_session";

export async function login(username: string, passwordRaw: string) {
  try {
    const db = await getDb();
    
    // --- OFFLINE FALLBACK MODE ---
    if (!db) {
      if (username === "admin" && (passwordRaw === "admin123" || passwordRaw === "admin")) {
        const payload: AuthPayload = {
          userId: "offline-admin",
          username: "admin",
          role: "SUPER_ADMIN"
        };
        const token = await signJwt(payload);
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        });
        return { success: true };
      }
      return { success: false, error: "Database offline. Gunakan admin / admin123 untuk login lokal." };
    }
    // --- END OFFLINE FALLBACK ---

    // Auto-migrate on login attempt if no users exist
    const usersCount = await db.collection('users').countDocuments();
    if (usersCount === 0) {
      // Find the old password hash from config
      const config = await db.collection('config').findOne({});
      const legacyHash = config?.adminPasswordHash;
      
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

    const user = await db.collection('users').findOne({ username });
    
    if (!user) {
      return { success: false, error: "Username tidak ditemukan" };
    }

    if (user.isActive === false) {
      return { success: false, error: "Akun ini telah dinonaktifkan" };
    }

    const isPasswordValid = await bcrypt.compare(passwordRaw, user.passwordHash);

    if (isPasswordValid) {
      const payload: AuthPayload = {
        userId: user._id.toString(),
        username: user.username,
        role: user.role
      };

      const token = await signJwt(payload);
      
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return { success: true };
    }

    return { success: false, error: "Kata sandi salah" };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Terjadi kesalahan server" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
}

export async function getSession(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) return null;
  return await verifyJwt(token.value);
}
