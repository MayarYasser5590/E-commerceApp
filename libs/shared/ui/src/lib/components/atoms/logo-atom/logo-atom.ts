import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-logo-atom',
  imports: [],
  templateUrl: './logo-atom.html',
  styleUrl: './logo-atom.scss',
})
export class LogoAtom {
  @Input() imgClass = '';
}
