interface OTPEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

// In-memory store — resets on server restart, fine for a single-server deployment
const store = new Map<string, OTPEntry>();

const TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

export function saveOTP(email: string, code: string) {
  store.set(email.toLowerCase(), {
    code,
    expiresAt: Date.now() + TTL_MS,
    attempts: 0,
  });
}

export function verifyOTP(email: string, code: string): "ok" | "invalid" | "expired" | "too_many" {
  const entry = store.get(email.toLowerCase());
  if (!entry) return "invalid";
  if (Date.now() > entry.expiresAt) { store.delete(email.toLowerCase()); return "expired"; }
  if (entry.attempts >= MAX_ATTEMPTS) return "too_many";

  entry.attempts++;
  if (entry.code !== code.trim()) return "invalid";

  store.delete(email.toLowerCase());
  return "ok";
}
