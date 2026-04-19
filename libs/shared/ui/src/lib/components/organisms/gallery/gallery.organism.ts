import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { SectionHeadingAtom } from '../../atoms/heading/section-heading.atom';

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'lib-gallery-organism',
  imports: [NgOptimizedImage, SectionHeadingAtom],
  templateUrl: './gallery.organism.html',
})
export class GalleryOrganism {
  items = input<GalleryItem[]>([]);
  subtitle = input('Gallery');
  title = input('Check Out Our Wonderful Gallery');
  protected readonly displayedItems = computed(() =>
    this.items().length ? this.items() : this.defaultItems,
  );

  protected readonly cardClasses = [
    'group relative col-span-full aspect-[4/5] overflow-hidden bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:col-start-1 md:row-span-6 md:row-start-1 md:aspect-auto',
    'group relative col-span-full aspect-[4/3] overflow-hidden bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:col-start-1 md:row-span-4 md:row-start-7 md:aspect-auto',
    'group relative col-span-full aspect-[4/3] overflow-hidden bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:col-start-5 md:row-span-4 md:row-start-1 md:aspect-auto',
    'group relative col-span-full aspect-[4/3] overflow-hidden bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:col-start-9 md:row-span-4 md:row-start-1 md:aspect-auto',
    'group relative col-span-full aspect-[4/5] overflow-hidden bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:col-start-5 md:row-span-6 md:row-start-5 md:aspect-auto',
    'group relative col-span-full aspect-[4/5] overflow-hidden bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:col-start-9 md:row-span-6 md:row-start-5 md:aspect-auto',
  ];

  private readonly defaultItems: GalleryItem[] = [
    {
      src: '/assets/gallery/1.svg',
      alt: 'Gift box collection display',
      title: 'Gift box collection display',
    },
    {
      src: '/assets/gallery/5.svg',
      alt: 'Chocolate gift arrangement',
      title: 'Chocolate gift arrangement',
    },
    {
      src: '/assets/gallery/2.svg',
      alt: 'Romantic gifting arrangement',
      title: 'Romantic gifting arrangement',
    },
    {
      src: '/assets/gallery/3.svg',
      alt: 'engaging gift moment',
      title: 'engaging gift moment',
    },
    {
      src: '/assets/gallery/4.svg',
      alt: 'ring gift arrangement',
      title: 'ring gift arrangement',
    },
    {
      src: '/assets/gallery/6.svg',
      alt: 'Gift moment arrangement',
      title: 'Gift moment arrangement',
    },
  ];

  getCardClass(index: number): string {
    return (
      this.cardClasses[index] ??
      'group relative col-span-full aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#f6ecec] shadow-[0_6px_18px_rgba(92,33,39,0.08)] ring-1 ring-[#f1e0e1] md:col-span-4 md:aspect-auto'
    );
  }
}
