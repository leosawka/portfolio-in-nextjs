type RateLimitEntry = {
  count: number;
  timestamp: number;
};

const ipStore = new Map<string, RateLimitEntry>();
const LIMIT = 5;
const INTERVAL = 60 * 1000;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - entry.timestamp > INTERVAL) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (entry.count < LIMIT) {
    entry.count += 1;
    return true;
  }

  return false;
}
