/**
 * Throttle function to limit how often a function can be called
 * @param func - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns A throttled version of the function
 */
// eslint-disable-next-line no-unused-vars
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
  // eslint-disable-next-line no-unused-vars
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}
