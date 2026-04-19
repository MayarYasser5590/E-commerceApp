export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');

  for (const c of cookies) {
    const [key, val] = c.trim().split('=');
    if (key === name) return decodeURIComponent(val);
  }

  return null;
}
