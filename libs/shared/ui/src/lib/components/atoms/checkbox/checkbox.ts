import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-checkbox',
  template: `
    <label [class]="'flex items-center gap-2 cursor-pointer ' + containerClass">
      <input
        type="checkbox"
        [class]="boxClass"
        [checked]="value"
        [disabled]="isDisabled"
        (change)="onChange($event)"
        (blur)="onTouchedFn()"
      />
      <span [class]="labelClass">
        {{ label }}
      </span>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibCheckbox),
      multi: true,
    },
  ],
})
export class LibCheckbox implements ControlValueAccessor {
  @Input() label = '';
  @Input() containerClass = '';
  @Input() boxClass = '';
  @Input() labelClass = '';

  value = false;
  isDisabled = false;

  onChangeFn: (value: boolean) => void = () => {
    throw new Error('onChange not registered');
  };

  onTouchedFn: () => void = () => {
    throw new Error('onTouched not registered');
  };

  onChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.value = checked;
    this.onChangeFn(checked);
  }

  writeValue(value: boolean): void {
    this.value = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
