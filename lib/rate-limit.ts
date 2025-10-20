import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL || "https://placeholder.com",
  token: process.env.UPSTASH_KV_REST_API_TOKEN || "placeholder",
})

// Create rate limiters for different endpoints
export const formSubmissionLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
  analytics: true,
})

export const apiLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
  analytics: true,
})

// Fallback rate limiter for when Redis is not available
export const memoryRateLimit = new Map<string, { count: number; resetTime: number }>()

export function simpleRateLimit(identifier: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const key = identifier
  const record = memoryRateLimit.get(key)

  if (!record || now > record.resetTime) {
    memoryRateLimit.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}
