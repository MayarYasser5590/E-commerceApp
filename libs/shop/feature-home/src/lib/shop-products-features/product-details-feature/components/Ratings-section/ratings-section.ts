import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-ratings-section',
  imports: [],
  templateUrl: './ratings-section.html',
  styleUrl: './ratings-section.scss',
})
export class RatingsSection {
    @Input() productId!: string | null;

}
