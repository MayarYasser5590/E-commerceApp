import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EmailService {

  private emailSignal = signal<string | null>(null);
  email = this.emailSignal.asReadonly();

  setEmail(email: string | null) {
    this.emailSignal.set(email);
  }

  clear() {
    this.emailSignal.set(null);
  }
}