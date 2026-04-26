import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppToastService {
  private messageService = inject(MessageService);

  success(summary: string) {
    this.messageService.add({
      severity: 'success',
      summary,
    });
  }

  error(summary: string) {
    this.messageService.add({
      severity: 'error',
      summary,
    });
  }
}
