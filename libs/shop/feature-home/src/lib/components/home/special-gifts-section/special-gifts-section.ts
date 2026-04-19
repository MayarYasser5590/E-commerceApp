import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LibButton } from '@shop-workspace/shared-ui';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
} from 'lucide-angular';

type GiftCardTheme =
  | 'wedding'
  | 'engagement'
  | 'anniversary';

interface GiftCard {
  readonly badge: string;
  readonly title: string;
  readonly theme: GiftCardTheme;
}

@Component({
  selector: 'lib-special-gifts-section',
  standalone: true,
  imports: [CommonModule, LibButton, LucideAngularModule],
  templateUrl: './special-gifts-section.html',
  styleUrl: './special-gifts-section.scss',
})
export class SpecialGiftsSection {
  private readonly router = inject(Router);

  protected readonly ArrowRightIcon = ArrowRight;
  protected readonly ChevronLeftIcon = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;

  protected readonly occasionCards: GiftCard[] = [
    {
      badge: 'Wedding',
      title: "Celebrate Her Forever with a Gift She'll Always Remember",
      theme: 'wedding',
    },
    {
      badge: 'Engagement',
      title: 'Honor the Beginning of a Beautiful Journey Together',
      theme: 'engagement',
    },
    {
      badge: 'Anniversary',
      title: 'Mark Every Year of Love with a Meaningful Surprise',
      theme: 'anniversary',
    },
  ];

  goToProducts(): void {
    void this.router.navigate(['/products']);
  }
}
