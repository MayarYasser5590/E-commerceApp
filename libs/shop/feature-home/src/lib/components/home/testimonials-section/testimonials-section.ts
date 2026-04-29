import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeadingAtom } from '@shop-workspace/shared-ui';
import { LucideAngularModule, Star } from 'lucide-angular';

interface Testimonial {
  readonly name: string;
  readonly date: string;
  readonly quote: string;
  readonly rating: number;
  readonly avatarSrc: string;
  readonly avatarAlt: string;
}

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Jake Miller',
    date: 'January 12, 2025',
    quote:
      'I have been ordering flowers from Shop for years and they never disappoint. The quality and service are exceptional.',
    rating: 5,
    avatarSrc: '/assets/home/testimonials-avatar-1.svg',
    avatarAlt: 'Jake Miller',
  },
  {
    name: 'Tyler Brooks',
    date: 'January 12, 2025',
    quote:
      'Customer service is top notch and the flowers last longer than any others I have bought.',
    rating: 5,
    avatarSrc: '/assets/home/testimonials-avatar-2.svg',
    avatarAlt: 'Tyler Brooks',
  },
  {
    name: 'Max Turner',
    date: 'January 12, 2025',
    quote:
      'The team truly cares about every order. I always get fresh, beautiful roses and quick delivery.',
    rating: 5,
    avatarSrc: '/assets/home/testimonials-avatar-3.svg',
    avatarAlt: 'Max Turner',
  },
] as const;

@Component({
  selector: 'lib-testimonials-section',
  imports: [NgOptimizedImage, LucideAngularModule, SectionHeadingAtom],
  templateUrl: './testimonials-section.html',
})
export class TestimonialsSection {
  protected readonly StarIcon = Star;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly stars = Array.from({ length: 5 });
}
