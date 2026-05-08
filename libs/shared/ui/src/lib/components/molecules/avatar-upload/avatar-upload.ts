import { ChangeDetectionStrategy, Component, OnDestroy, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CloudUpload } from 'lucide-angular';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

@Component({
  selector: 'lib-avatar-upload',
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex w-full items-center gap-4">
      <button
        type="button"
        class="relative h-[120px] w-[120px] shrink-0 rounded-full border border-[#e4e4e7] bg-[#f4f4f5]"
        [disabled]="disabled()"
        (click)="fileInput.click()"
        [attr.aria-label]="'Upload profile photo'"
      >
        <span class="block h-full w-full overflow-hidden rounded-full">
          @if (previewUrl()) {
            <img [src]="previewUrl()" [alt]="avatarAlt()" class="h-full w-full object-cover" />
          } @else {
            <span class="flex h-full w-full items-center justify-center bg-[#FBEAEA] text-[#741C21]">
              <span class="text-3xl font-semibold">{{ initials() }}</span>
            </span>
          }
        </span>
        <span class="absolute bottom-[-1px] right-0 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#e4e4e7] bg-[#fafafa] text-[#27272a]">
          <lucide-icon [name]="icons.CloudUpload" class="h-5 w-5"></lucide-icon>
        </span>
      </button>

      <div class="min-w-0 flex-1 overflow-hidden">
        <input
          #fileInput
          type="file"
          class="sr-only"
          accept="image/jpeg,image/png,image/gif"
          [disabled]="disabled()"
          (change)="onFileSelected($event)"
        />
        <button type="button" class="text-left text-[20px] font-semibold leading-none text-[#27272a]" [disabled]="disabled()" (click)="fileInput.click()">
          Upload Photo
        </button>
        <p class="mt-4 text-[16px] leading-none text-[#71717a]">
          You can upload a .jpg, .png, or .gif photo with max size of 5MB.
        </p>
        @if (selectedFileName()) {
          <p class="mt-1 truncate text-sm font-medium text-zinc-700">{{ selectedFileName() }}</p>
        }
        @if (validationError()) {
          <p class="mt-2 text-sm text-[#A6252A]" role="alert">{{ validationError() }}</p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarUpload implements OnDestroy {
  imageUrl = input<string | null | undefined>(null);
  userName = input<string>('');
  disabled = input<boolean>(false);

  fileSelected = output<File | null>();
  validationFailed = output<string | null>();

  protected readonly icons = { CloudUpload };
  protected readonly localPreviewUrl = signal<string | null>(null);
  protected readonly selectedFileName = signal<string | null>(null);
  protected readonly validationError = signal<string | null>(null);
  protected readonly previewUrl = computed(() => this.localPreviewUrl() || this.imageUrl() || null);
  protected readonly avatarAlt = computed(() => `${this.userName() || 'User'} profile photo`);
  protected readonly initials = computed(() =>
    this.userName()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'U',
  );

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0] ?? null;

    if (!file) {
      this.clearFileState();
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      this.setValidationError('Only JPG, PNG, or GIF images are allowed.');
      inputElement.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      this.setValidationError('Image must be 5MB or smaller.');
      inputElement.value = '';
      return;
    }

    this.revokeLocalPreview();
    this.validationError.set(null);
    this.validationFailed.emit(null);
    this.selectedFileName.set(file.name);
    this.localPreviewUrl.set(URL.createObjectURL(file));
    this.fileSelected.emit(file);
  }

  clearSelection(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.clearFileState();
  }

  ngOnDestroy(): void {
    this.revokeLocalPreview();
  }

  private clearFileState(): void {
    this.revokeLocalPreview();
    this.selectedFileName.set(null);
    this.validationError.set(null);
    this.validationFailed.emit(null);
    this.fileSelected.emit(null);
  }

  private setValidationError(message: string): void {
    this.clearFileState();
    this.validationError.set(message);
    this.validationFailed.emit(message);
  }

  private revokeLocalPreview(): void {
    const preview = this.localPreviewUrl();
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    this.localPreviewUrl.set(null);
  }
}
