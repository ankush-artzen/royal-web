import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "royal_jwt-secret-key"; // use same secret as signing

export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    throw error
  }
}
