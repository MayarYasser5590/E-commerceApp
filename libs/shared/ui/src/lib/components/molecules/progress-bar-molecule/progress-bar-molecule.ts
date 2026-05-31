import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-progress-bar-molecule',
  imports: [],
  templateUrl: './progress-bar-molecule.html',
  styleUrl: './progress-bar-molecule.scss',
})
export class ProgressBarMolecule {
  step = input<1 | 2>(1);
}
