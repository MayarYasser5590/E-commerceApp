import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthFooterService {
  footerType = signal<
    'login' | 'register' | 'forgot' | 'verify' | 'reset' | null
  >(null);

  setFooter(type: 'login' | 'register' | 'forgot' | 'verify' | 'reset') {
    this.footerType.set(type);
  }
}
