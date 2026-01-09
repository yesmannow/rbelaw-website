/**
 * URL Parameter Utilities
 * Helper functions for managing search/filter state in URL parameters
 * This allows filters to persist across page reloads and be shareable
 */

/**
 * Get a URL parameter value
 */
export function getUrlParam(key: string): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get(key)
}

/**
 * Get multiple URL parameter values (for arrays)
 */
export function getUrlParams(key: string): string[] {
  if (typeof window === 'undefined') return []
  const params = new URLSearchParams(window.location.search)
  return params.getAll(key)
}

/**
 * Set a URL parameter
 */
export function setUrlParam(key: string, value: string | null): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (value === null || value === '') {
    url.searchParams.delete(key)
  } else {
    url.searchParams.set(key, value)
  }
  window.history.replaceState({}, '', url.toString())
}

/**
 * Set multiple URL parameter values (for arrays)
 */
export function setUrlParams(key: string, values: string[]): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.delete(key)
  values.forEach(value => {
    if (value) {
      url.searchParams.append(key, value)
    }
  })
  window.history.replaceState({}, '', url.toString())
}

/**
 * Remove a URL parameter
 */
export function removeUrlParam(key: string): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.delete(key)
  window.history.replaceState({}, '', url.toString())
}

/**
 * Clear all URL parameters
 */
export function clearUrlParams(): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.search = ''
  window.history.replaceState({}, '', url.toString())
}

/**
 * Get all URL parameters as an object
 */
export function getAllUrlParams(): Record<string, string | string[]> {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const result: Record<string, string | string[]> = {}

  for (const [key, value] of params.entries()) {
    if (result[key]) {
      // Convert to array if multiple values exist
      if (Array.isArray(result[key])) {
        (result[key] as string[]).push(value)
      } else {
        result[key] = [result[key] as string, value]
      }
    } else {
      result[key] = value
    }
  }

  return result
}
