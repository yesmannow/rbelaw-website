/**
 * Firecrawl Client Wrapper with Rate Limiting
 *
 * Provides robust error handling, retry logic, and concurrency control
 * for Firecrawl API calls to prevent rate limit errors.
 */

interface CallOptions {
  name: string
  maxRetries?: number
}

interface PollOptions {
  maxWait?: number
  initialInterval?: number
  maxInterval?: number
}

/**
 * Simple concurrency limiter
 */
class ConcurrencyLimiter {
  private queue: Array<() => void> = []
  private running = 0

  constructor(private limit: number) {}

  async run<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        this.running++
        try {
          const result = await fn()
          resolve(result)
        } catch (error) {
          reject(error)
        } finally {
          this.running--
          this.processQueue()
        }
      })
      this.processQueue()
    })
  }

  private processQueue() {
    if (this.running >= this.limit || this.queue.length === 0) {
      return
    }

    const next = this.queue.shift()
    if (next) {
      next()
    }
  }
}

// Default concurrency limiter (2 concurrent requests)
export const firecrawlLimiter = new ConcurrencyLimiter(2)

/**
 * Parse retry timing from error message
 * Handles formats like:
 * - "retry after 2s"
 * - "resets at 2024-01-01T12:00:00Z"
 * - "Rate limit exceeded. Retry after 5 seconds"
 */
function parseRetryTime(error: any): number | null {
  const message = error?.message || error?.toString() || ''
  const lowerMessage = message.toLowerCase()

  // Pattern 1: "retry after Xs" or "retry after X seconds"
  const retryAfterMatch = lowerMessage.match(/retry after (\d+)\s*(?:s|sec|second|seconds)?/i)
  if (retryAfterMatch) {
    return parseInt(retryAfterMatch[1], 10) * 1000 // Convert to milliseconds
  }

  // Pattern 2: "resets at <timestamp>"
  const resetsAtMatch = message.match(/resets at (.+)/i)
  if (resetsAtMatch) {
    try {
      const resetTime = new Date(resetsAtMatch[1]).getTime()
      const now = Date.now()
      const waitTime = resetTime - now
      if (waitTime > 0) {
        return waitTime
      }
    } catch (e) {
      // Invalid date format, fall through to exponential backoff
    }
  }

  // Pattern 3: Check for Retry-After header (if error has response/headers)
  if (error?.response?.headers?.['retry-after']) {
    const retryAfter = parseInt(error.response.headers['retry-after'], 10)
    if (!isNaN(retryAfter)) {
      return retryAfter * 1000 // Convert to milliseconds
    }
  }

  // Pattern 4: Check status code 429 and look for retry-after in any headers
  if (error?.status === 429 || error?.statusCode === 429) {
    const headers = error?.headers || error?.response?.headers || {}
    if (headers['retry-after']) {
      const retryAfter = parseInt(headers['retry-after'], 10)
      if (!isNaN(retryAfter)) {
        return retryAfter * 1000
      }
    }
  }

  return null
}

/**
 * Sleep for specified milliseconds with optional jitter
 */
function sleep(ms: number, jitter = true): Promise<void> {
  if (jitter) {
    // Add ±10% jitter to prevent thundering herd
    const jitterAmount = ms * 0.1 * (Math.random() * 2 - 1)
    ms = Math.max(0, ms + jitterAmount)
  }
  return new Promise(resolve => setTimeout(resolve, Math.ceil(ms)))
}

/**
 * Calculate exponential backoff delay
 * Base: 2s, max: 60s
 */
function exponentialBackoff(attempt: number, baseMs = 2000, maxMs = 60000): number {
  const delay = baseMs * Math.pow(2, attempt)
  return Math.min(delay, maxMs)
}

/**
 * Check if error is a rate limit error (429)
 */
export function isRateLimitError(error: any): boolean {
  const status = error?.status || error?.statusCode || error?.response?.status
  const message = error?.message || error?.toString() || ''
  
  return (
    status === 429 ||
    message.toLowerCase().includes('rate limit') ||
    message.toLowerCase().includes('429') ||
    error?.name === 'FirecrawlSdkError' && status === 429
  )
}

/**
 * Wrapper for Firecrawl API calls with automatic retry on rate limits
 * 
 * @param fn - Function that returns a Promise (the Firecrawl API call)
 * @param options - Options including name for logging and maxRetries
 * @returns The result of the API call
 */
export async function callFirecrawl<T>(
  fn: () => Promise<T>,
  options: CallOptions
): Promise<T> {
  const { name, maxRetries = 6 } = options
  let lastError: any = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Use concurrency limiter to prevent too many simultaneous requests
      return await firecrawlLimiter.run(fn)
    } catch (error: any) {
      lastError = error

      // Only retry on rate limit errors
      if (!isRateLimitError(error)) {
        throw error
      }

      // If this was the last attempt, throw the error
      if (attempt >= maxRetries) {
        console.error(`❌ ${name}: Rate limit error after ${maxRetries + 1} attempts`)
        throw error
      }

      // Parse retry time from error message
      let waitTime = parseRetryTime(error)
      
      // Fallback to exponential backoff if no retry time found
      if (waitTime === null) {
        waitTime = exponentialBackoff(attempt)
      }

      console.warn(
        `⏳ ${name}: Rate limited (attempt ${attempt + 1}/${maxRetries + 1}). ` +
        `Waiting ${Math.ceil(waitTime / 1000)}s before retry...`
      )

      await sleep(waitTime, true)
    }
  }

  // Should never reach here, but TypeScript needs this
  throw lastError
}

/**
 * Poll a crawl job status with adaptive backoff on rate limits
 * 
 * @param getStatusFn - Function that returns the crawl status
 * @param options - Polling options
 * @returns The final crawl status
 */
export async function pollWithBackoff<T>(
  getStatusFn: () => Promise<T>,
  options: PollOptions = {}
): Promise<T> {
  const {
    maxWait = 15 * 60 * 1000, // 15 minutes default
    initialInterval = 2500, // 2.5 seconds
    maxInterval = 15000, // 15 seconds max
  } = options

  const startTime = Date.now()
  let pollInterval = initialInterval
  let lastStatus: T | null = null

  while (true) {
    const elapsed = Date.now() - startTime
    
    if (elapsed >= maxWait) {
      throw new Error(
        `Polling timeout after ${Math.floor(maxWait / 1000)}s. ` +
        `Last status: ${JSON.stringify(lastStatus)}`
      )
    }

    try {
      const status = await callFirecrawl(getStatusFn, {
        name: 'Poll crawl status',
        maxRetries: 3, // Fewer retries for polling
      })

      lastStatus = status

      // Check if status indicates completion (implementation depends on Firecrawl API)
      const statusObj = status as any
      
      // Log progress if still scraping
      if (statusObj?.status === 'scraping' && statusObj.completed !== undefined) {
        console.log(`   Progress: ${statusObj.completed || 0}/${statusObj.total || 0} pages scraped`)
      }
      
      // Return if completed or failed
      if (statusObj?.status === 'completed' || statusObj?.status === 'failed') {
        return status
      }
      
      // Continue polling if status is 'scraping' or any other non-terminal state

      // Reset interval on successful poll (not rate limited)
      pollInterval = initialInterval

      // Wait before next poll
      await sleep(pollInterval, false)

    } catch (error: any) {
      // If rate limited, double the interval (up to max)
      if (isRateLimitError(error)) {
        pollInterval = Math.min(pollInterval * 2, maxInterval)
        console.warn(
          `⏳ Polling rate limited. Increasing interval to ${pollInterval}ms`
        )
        await sleep(pollInterval, true)
      } else {
        // For non-rate-limit errors, throw immediately
        throw error
      }
    }
  }
}
