export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'object' && error && 'error' in error) {
    const response = (error as { error?: { message?: string } }).error;
    return response?.message || fallback;
  }

  return fallback;
}
