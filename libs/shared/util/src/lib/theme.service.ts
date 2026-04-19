import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    this.loadTheme();

    effect(() => {
      const currentTheme = this.theme();

      // Apply class html
      document.documentElement.classList.toggle(
        'dark',
        currentTheme === 'dark',
      );

      // Save in cookie
      this.setCookie('theme', currentTheme, 7);
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  //helpers

  setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');

    for (let c of cookies) {
      c = c.trim();
      if (c.startsWith(name + '=')) {
        return c.substring(name.length + 1);
      }
    }

    return null;
  }

  loadTheme() {
    const savedTheme = this.getCookie('theme') as 'light' | 'dark';

    if (savedTheme) {
      this.theme.set(savedTheme);

      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }
}
