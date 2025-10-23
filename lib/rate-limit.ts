// In-memory rate limiter - no external dependencies needed
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

// Export as default rate limiter
export const formSubmissionLimiter = {
  limit: (identifier: string) => {
    const allowed = simpleRateLimit(identifier, 5, 60000)
    return Promise.resolve({ success: allowed })
  },
}

export const apiLimiter = {
  limit: (identifier: string) => {
    const allowed = simpleRateLimit(identifier, 10, 60000)
    return Promise.resolve({ success: allowed })
  },
}
