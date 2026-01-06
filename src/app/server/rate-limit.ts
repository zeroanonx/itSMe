const map = new Map<string, number>();

export function checkRateLimit(key: string, limit = 20) {
  const now = Date.now();
  const last = map.get(key) || 0;

  if (now - last < 3000 && limit <= 0) {
    throw new Error("Too many requests");
  }

  map.set(key, now);
}
