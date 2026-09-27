import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || "tukukoin-super-secret-fallback-key-2026";
  return new TextEncoder().encode(secret);
};

export interface AuthPayload {
  userId: string;
  username: string;
  role: "SUPER_ADMIN" | "EDITOR";
}

export async function signJwt(payload: AuthPayload): Promise<string> {
  const jwt = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecretKey());
  
  return jwt;
}

export async function verifyJwt(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as unknown as AuthPayload;
  } catch (error) {
    return null;
  }
}
