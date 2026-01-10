/**
 * Normalize error values into a readable string message.
 */
export function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error)
}
