import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const random = () => crypto.randomBytes(128).toString("base64");

export const mixSalt = (salt: string, password: string) => {
  return crypto.createHmac("sha256", [salt, password].join("/")).update(getJwtSecretKey()).digest("hex");
};

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error("The env for JWT is not set");
  }

  return secret;
};

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Token expired");
  }
};

export const createNewToken = async () => {
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(getJwtSecretKey()));
};
