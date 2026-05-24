import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const COOKIE_NAME = "rsr_admin";
const IS_PROD = process.env.NODE_ENV === "production";

if (IS_PROD && !process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set in production");
}
if (IS_PROD && !process.env.ADMIN_PASSCODE) {
  throw new Error("ADMIN_PASSCODE must be set in production");
}

const SESSION_SECRET =
  process.env.SESSION_SECRET || "rsr-dev-secret-DO-NOT-USE-IN-PROD";
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "4451";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function sign(value: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(value)
    .digest("hex");
}

function makeToken(): string {
  const payload = `ok.${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [tag, ts, sig] = parts;
  if (tag !== "ok") return false;
  const issuedAt = Number(ts);
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > MAX_AGE_MS) return false;
  const expected = sign(`${tag}.${ts}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function isAdmin(req: Request): boolean {
  const token = (req as Request & { cookies?: Record<string, string> }).cookies?.[
    COOKIE_NAME
  ];
  return verifyToken(token);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!isAdmin(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function checkPasscode(passcode: string): boolean {
  if (typeof passcode !== "string" || !passcode) return false;
  const a = Buffer.from(passcode);
  const b = Buffer.from(ADMIN_PASSCODE);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function setAdminCookie(res: Response): void {
  const token = makeToken();
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_MS,
    path: "/",
  });
}

export function clearAdminCookie(res: Response): void {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}
