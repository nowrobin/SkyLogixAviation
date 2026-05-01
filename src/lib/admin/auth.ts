import { createHmac } from "crypto";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

const COOKIE_NAME = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function getPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return password;
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hash = Buffer.from(getPassword(), "base64").toString("utf8");
  return bcrypt.compare(input, hash);
}

export function createSessionToken(): string {
  const payload = JSON.stringify({
    role: "admin",
    iat: Date.now(),
    exp: Date.now() + COOKIE_MAX_AGE * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = createHmac("sha256", getSecret())
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;

    const expectedSig = createHmac("sha256", getSecret())
      .update(encoded)
      .digest("base64url");

    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (payload.exp < Date.now()) return false;

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function setSessionCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
}

export function clearSessionCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    if (name) {
      cookies[name.trim()] = rest.join("=").trim();
    }
  });
  return cookies;
}

export function getSessionFromRequest(req: NextApiRequest): string | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookies = parseCookies(cookieHeader);
  return cookies[COOKIE_NAME] || null;
}

export function isAuthenticated(req: NextApiRequest): boolean {
  const token = getSessionFromRequest(req);
  if (!token) return false;
  return verifySessionToken(token);
}

type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

export function withAuth(handler: ApiHandler): ApiHandler {
  return async (req, res) => {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return handler(req, res);
  };
}
