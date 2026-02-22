import { Component, Input, computed, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CustomInput } from '../../atoms/custom-input/custom-input';
import { SelectInput } from '../../atoms/select-input/select-input';

export interface PhoneCountryOption {
  code: string;
  name: string;
  dialCode?: string;
  flag?: string;
}

export interface PhoneInputValue {
  countryCode: string | null;
  number: string;
}

@Component({
  selector: 'lib-phone-input',
  imports: [FormsModule, SelectInput, CustomInput],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInput),
      multi: true,
    },
  ],
})
export class PhoneInput implements ControlValueAccessor {
  @Input() inputId?: string;
  @Input() phonePlaceholder = '1012345678';
  @Input() containerClass = '';
  @Input() selectClass = '';
  @Input() numberClass = '';
  @Input() countries: PhoneCountryOption[] = [];

  countryCode = signal<string | null>(null);
  number = signal('');
  isDisabled = signal(false);

  countryOptions = computed(() =>
    this.countries.map((country) => ({
      code: country.code,
      label:
        `${country.flag ?? ''} ${country.code}(${country.dialCode})`.trim(),
    })),
  );

  selectPlaceholder = computed(
    () =>
      this.countryOptions().find((country) => country.code === 'EG')?.label ??
      '',
  );
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_value: PhoneInputValue) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(value: PhoneInputValue | null): void {
    this.countryCode.set(value?.countryCode ?? null);
    this.number.set(value?.number ?? '');
  }

  registerOnChange(fn: (_value: PhoneInputValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onCountryCodeChange(value: string | null): void {
    this.countryCode.set(value);
    this.propagateChange();
    this.onTouched();
  }

  onPhoneNumberChange(value: string): void {
    this.number.set(value);
    this.propagateChange();
    this.onTouched();
  }

  private propagateChange(): void {
    this.onChange({
      countryCode: this.countryCode(),
      number: this.number(),
    });
  }
}
