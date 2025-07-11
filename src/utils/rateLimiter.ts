import {LRUCache} from 'lru-cache'

const rateLimiter = new LRUCache <string, number>({
  max: 500,
  ttl: 1000 * 60
})

export const checkRateLimit = (ip: string): boolean => {
  const count = rateLimiter.get(ip) || 0
  if (count >= 5) return false
  rateLimiter.set(ip, count + 1)
  return true
}
