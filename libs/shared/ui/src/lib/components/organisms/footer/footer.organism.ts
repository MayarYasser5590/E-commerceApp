import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  route: string;
}

@Component({
  selector: 'lib-footer-organism',
  imports: [RouterLink],
  templateUrl: './footer.organism.html',
})
export class FooterOrganism {
  // TODO: Replace placeholder routes when categories, occasions, contact,
  // about, terms, privacy, and FAQs pages are added to the shop app.
  protected readonly footerLinks: FooterLink[] = [
    { label: 'Home', route: '/home' },
    { label: 'Products', route: '/products' },
    { label: 'Categories', route: '/home' },
    { label: 'Occasions', route: '/home' },
    { label: 'Contact', route: '/home' },
    { label: 'About', route: '/home' },
    { label: 'Terms & Conditions', route: '/home' },
    { label: 'Privacy Policy', route: '/home' },
    { label: 'FAQs', route: '/home' },
  ];
}
