import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const secret = process.env.JWT_SECRET;
export const generateToken = (id: string) => {
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  return jwt.sign({ id }, secret, { expiresIn: "3d" });
};

export const verifyToken = (token: string) => {
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

export const getUserFromCookie = async() => {
  const cookieStore =await cookies();
  const token =  cookieStore.get('auth-token')?.value;
  if (!token) return null;
  return verifyToken(token);
};