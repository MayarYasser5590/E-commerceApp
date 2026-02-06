import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  @Input() label?: string | null;
  @Input() error?: string | null;
  @Input() inputId?: string;
  @Input() labelClass = '';
  @Input() errorClass = '';
}
