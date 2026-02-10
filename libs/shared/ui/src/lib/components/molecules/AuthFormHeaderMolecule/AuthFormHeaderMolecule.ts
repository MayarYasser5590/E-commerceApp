import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-auth-form-header-molecule',
  imports: [],
  templateUrl: './AuthFormHeaderMolecule.html',
  styleUrl: './AuthFormHeaderMolecule.scss',
  standalone:true,
})
export class AuthFormHeaderMolecule {
  @Input({ required: true }) title!: string;
@Input() description?: string;
@Input() actionLabel?: string;     
}
