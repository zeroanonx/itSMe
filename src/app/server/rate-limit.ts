const map = new Map<string, number>();

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const last = map.get(ip) ?? 0;

  if (now - last < 1500) {
    throw new Error("Too many requests");
  }

  map.set(ip, now);
}
