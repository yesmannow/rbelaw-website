/**
 * Utility constants and functions for the mega menu
 */

// Image placeholder for failed image loads
export const PLACEHOLDER_IMAGE_URL = 
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250"%3E%3Crect fill="%23f1f5f9" width="400" height="250"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3EImage%3C/text%3E%3C/svg%3E'

// Key codes for keyboard shortcuts
export const KEY_CODES = {
  K: 75,
} as const

/**
 * Triggers the global search command palette
 * Dispatches a synthetic keyboard event (Cmd/Ctrl+K)
 */
export function triggerGlobalSearch(): void {
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    keyCode: KEY_CODES.K,
    metaKey: true,
    ctrlKey: true,
    bubbles: true,
    cancelable: true,
  })
  document.dispatchEvent(event)
}
