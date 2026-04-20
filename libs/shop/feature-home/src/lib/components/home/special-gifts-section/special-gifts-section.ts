import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { LibButton } from '@shop-workspace/shared-ui';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';

type GiftCardTheme =
  | 'wedding'
  | 'engagement'
  | 'anniversary';

type HeroSlideTheme =
  | 'flowers'
  | 'romance'
  | 'celebration';

interface GiftCard {
  readonly badge: string;
  readonly title: string;
  readonly theme: GiftCardTheme;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

interface HeroSlide {
  readonly title: string;
  readonly subtitle: string;
  readonly ctaLabel: string;
  readonly theme: HeroSlideTheme;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

interface CarouselPageEvent {
  page?: number;
}

@Component({
  selector: 'lib-special-gifts-section',
  standalone: true,
  imports: [CommonModule, CarouselModule, LibButton, LucideAngularModule],
  templateUrl: './special-gifts-section.html',
  styleUrl: './special-gifts-section.scss',
})
export class SpecialGiftsSection {
  private readonly router = inject(Router);

  protected readonly ArrowLeftIcon = ArrowLeft;
  protected readonly ArrowRightIcon = ArrowRight;
  protected heroPage = 0;
  protected readonly heroSlides: HeroSlide[] = [
    {
      title: 'Say It with Flowers',
      subtitle: 'Elegant gifts for every special moment.',
      ctaLabel: "I’m buying!",
      theme: 'flowers',
      imageSrc: '/assets/home/hero-flowers.svg',
      imageAlt: 'Pink roses arranged beside a heart-shaped box of chocolates.',
    },
    {
      title: 'Wrapped in Romance',
      subtitle: 'Curated details made for unforgettable surprises.',
      ctaLabel: 'Shop now',
      theme: 'romance',
      imageSrc: '/assets/home/hero-romance.svg',
      imageAlt: 'Romantic roses and keepsake gifts styled in warm pink tones.',
    },
    {
      title: 'Sweet Celebration',
      subtitle: 'Chocolates, roses, and keepsakes in one perfect gesture.',
      ctaLabel: 'Choose a gift',
      theme: 'celebration',
      imageSrc: '/assets/home/hero-celebration.svg',
      imageAlt: 'Chocolate gift arrangement with roses and celebration details.',
    },
    {
      title: 'Made for Loved Ones',
      subtitle: 'Premium gift styling for moments that deserve more.',
      ctaLabel: 'Find the gift',
      theme: 'romance',
      imageSrc: '/assets/home/hero-loved-ones.svg',
      imageAlt: 'Gift set with flowers and premium keepsakes for loved ones.',
    },
  ];

  protected readonly occasionCards: GiftCard[] = [
    {
      badge: 'Wedding',
      title: "Celebrate Her Forever with a Gift She’ll Always Remember",
      theme: 'wedding',
      imageSrc: '/assets/home/card-wedding.svg',
      imageAlt: 'Wedding gift box with a ring and peach flowers.',
    },
    {
      badge: 'Engagement',
      title: 'Honor the Beginning of a Beautiful Journey Together',
      theme: 'engagement',
      imageSrc: '/assets/home/card-engagement.svg',
      imageAlt: 'Engagement scrapbook and wrapped gifts in beige tones.',
    },
    {
      badge: 'Anniversary',
      title: 'Mark Every Year of Love with a Meaningful Surprise',
      theme: 'anniversary',
      imageSrc: '/assets/home/card-anniversary.svg',
      imageAlt: 'Anniversary gift boxes with red roses and ribbon bows.',
    },
  ];

  protected readonly featuredGift = {
    badge: 'Starting from 10.99 EGP',
    title: 'Special Gifts For The People You Love',
    imageSrc: '/assets/home/card-featured-gifts.svg',
    imageAlt: 'Stacked burgundy gift boxes with satin gold ribbons.',
  } as const;

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  onHeroPageChange(event: CarouselPageEvent): void {
    this.heroPage = event.page ?? 0;
  }

  protected goToHeroPage(page: number): void {
    this.heroPage = page;
  }

  protected previousHeroSlide(): void {
    this.heroPage = this.heroPage === 0 ? this.heroSlides.length - 1 : this.heroPage - 1;
  }

  protected nextHeroSlide(): void {
    this.heroPage = this.heroPage === this.heroSlides.length - 1 ? 0 : this.heroPage + 1;
  }

  protected getHeroOverlayClasses(theme: HeroSlideTheme): string {
    switch (theme) {
      case 'flowers':
        return 'bg-gradient-to-r from-[rgba(31,10,12,0.58)] via-[rgba(54,19,20,0.22)] to-[rgba(54,19,20,0.08)]';
      case 'romance':
        return 'bg-gradient-to-r from-[rgba(46,16,24,0.62)] via-[rgba(68,21,33,0.26)] to-[rgba(68,21,33,0.08)]';
      case 'celebration':
        return 'bg-gradient-to-r from-[rgba(54,17,11,0.6)] via-[rgba(81,32,18,0.24)] to-[rgba(81,32,18,0.08)]';
    }
  }
}
