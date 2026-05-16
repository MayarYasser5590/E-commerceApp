import { Component, Input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'lib-select-input',
  imports: [FormsModule, SelectModule],
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInput),
      multi: true,
    },
  ],
})
export class SelectInput implements ControlValueAccessor {
  @Input() options: unknown[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue?: string;
  @Input() placeholder = '';
  @Input() inputId?: string;
  @Input() inputClass = '';
  @Input() panelStyleClass = '';
  @Input() filter = false;
  @Input() showClear = false;

  value = signal<unknown>(null);
  isDisabled = signal(false);

  onChange: (value: unknown) => void = () => undefined;
  onTouched: () => void = () => undefined;

  writeValue(value: unknown): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onValueChange(value: unknown): void {
    this.value.set(value);
    this.onChange(value);
  }
}
