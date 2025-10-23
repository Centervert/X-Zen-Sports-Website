/**
 * Client-side rate limiting using localStorage
 * Tracks submission timestamps to prevent spam
 */

const RATE_LIMIT_KEY = "xzen_form_submissions"
const MAX_SUBMISSIONS = 5
const TIME_WINDOW = 60000 // 1 minute in milliseconds

interface SubmissionRecord {
  timestamps: number[]
}

export function checkRateLimit(): { allowed: boolean; remainingTime?: number } {
  try {
    // Get existing submissions from localStorage
    const stored = localStorage.getItem(RATE_LIMIT_KEY)
    const record: SubmissionRecord = stored ? JSON.parse(stored) : { timestamps: [] }

    const now = Date.now()
    const windowStart = now - TIME_WINDOW

    // Filter out timestamps older than the time window
    const recentTimestamps = record.timestamps.filter((timestamp) => timestamp > windowStart)

    // Check if rate limit is exceeded
    if (recentTimestamps.length >= MAX_SUBMISSIONS) {
      const oldestTimestamp = Math.min(...recentTimestamps)
      const remainingTime = Math.ceil((oldestTimestamp + TIME_WINDOW - now) / 1000)
      return { allowed: false, remainingTime }
    }

    return { allowed: true }
  } catch (error) {
    // If localStorage is not available or there's an error, allow the submission
    console.error("Rate limit check failed:", error)
    return { allowed: true }
  }
}

export function recordSubmission(): void {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY)
    const record: SubmissionRecord = stored ? JSON.parse(stored) : { timestamps: [] }

    const now = Date.now()
    const windowStart = now - TIME_WINDOW

    // Add current timestamp and filter old ones
    record.timestamps = [...record.timestamps.filter((timestamp) => timestamp > windowStart), now]

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record))
  } catch (error) {
    console.error("Failed to record submission:", error)
  }
}
