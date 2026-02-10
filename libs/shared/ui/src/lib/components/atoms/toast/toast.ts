import { MessageService, ToastMessageOptions } from 'primeng/api';
import { Component, inject, input } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ToastPassThrough, ToastPositionType } from 'primeng/types/toast';

@Component({
  selector: 'lib-toast',
  imports: [ToastModule],
  template: `<p-toast [pt]="pt" [position]="position()" [life]="life()" /> `,
})
export class ToastToast {
  position = input<ToastPositionType>('bottom-right');
  life = input<number>(8000);
  private readonly messageService = inject(MessageService);

  private readonly severityClass: Record<string, string> = {
    success: 'bg-emerald-50 border-emerald-600 text-emerald-800',
    info: 'bg-zinc-100 border-zinc-400 text-zinc-800',
    error: 'bg-red-50 border-red-600 text-red-800',
  };

  protected readonly pt: ToastPassThrough = {
    message: (options: any) => ({
      class: [
        'rounded-2xl border shadow-none',
        this.severityClass[options?.context?.message?.severity ?? 'info'],
      ],
    }),
    messageContent: { class: 'px-8 py-5 gap-4 items-center' },
    messageIcon: { class: 'text-2xl' },
    summary: { class: 'text-3xl font-medium leading-tight' },
    detail: { class: 'hidden' },
    closeButton: { class: 'text-zinc-400 hover:text-zinc-600 w-8 h-8' },
    closeIcon: { class: 'text-xl' },
  };

  show(message: ToastMessageOptions) {
    this.messageService.add(message);
  }

  showSuccess(summary: string, detail = '') {
    this.show({ severity: 'success', summary, detail });
  }

  showInfo(summary: string, detail = '') {
    this.show({ severity: 'info', summary, detail });
  }

  showError(summary: string, detail = '') {
    this.show({ severity: 'error', summary, detail });
  }
}
