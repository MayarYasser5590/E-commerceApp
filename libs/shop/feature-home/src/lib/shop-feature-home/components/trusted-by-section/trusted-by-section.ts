import { Component } from '@angular/core';

@Component({
  selector: 'lib-trusted-by-section',
  imports: [],
  templateUrl: './trusted-by-section.html',
  styleUrl: './trusted-by-section.scss',
})
export class TrustedBySection {
  logos: string[] = [
    '/assets/trustedBy/coconut.webp',
    '/assets/trustedBy/ginyard.webp',
    '/assets/trustedBy/ingoude2.webp',
    '/assets/trustedBy/velvet.webp',
    '/assets/trustedBy/ingoude.webp',
    '/assets/trustedBy/habu.webp',
  ];
}
