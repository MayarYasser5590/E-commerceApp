import { Component ,   computed,forwardRef,Input,signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordToggle } from "../password-toggle/password-toggle";


@Component({
  selector: 'lib-custom-input',
  imports: [PasswordToggle],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true
    }
  ]
})
export class CustomInput implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'tel' = 'text';
  @Input() placeholder = '';
  @Input() inputId?: string;  
  @Input() autocomplete?: string;
  @Input() inputClass = '';

  value = signal('');
  isDisabled = signal(false);
  showPassword = signal(false);

  inputType = computed(() => {
    if (this.type === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type;
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: string) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  togglePassword(): void {
    if (this.type !== 'password') return;
    this.showPassword.update(v => !v);
  }

}
