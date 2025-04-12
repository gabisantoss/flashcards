import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

const secret = new TextEncoder().encode(secretKey);

export async function decrypt(token: string | undefined) {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Failed to decrypt token", error);
    return null;
  }
}
