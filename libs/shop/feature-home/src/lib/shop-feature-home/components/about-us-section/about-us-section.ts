import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { LibButton } from '@shop-workspace/shared-ui';
import { ArrowRight, Check, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'lib-about-us-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, LibButton, LucideAngularModule],
  templateUrl: './about-us-section.html',
  styleUrl: './about-us-section.scss',
})
export class AboutUsSection {
  private readonly router = inject(Router);
  protected readonly ArrowRightIcon = ArrowRight;
  protected readonly CheckIcon = Check;

  protected readonly features = [
    'Competitive Prices & Easy Shopping',
    'Premium Quality & Elegant Packaging',
    'Perfect for Every Occasion',
    'Fast & Reliable Delivery',
  ];

  goToProducts(): void {
    void this.router.navigate(['/products']);
  }
}
