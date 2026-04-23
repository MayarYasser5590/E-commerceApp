import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Truck,
  RefreshCw,
  ShieldCheck,
  Headset,
} from 'lucide-angular';

@Component({
  selector: 'lib-features-bar-section',
  imports: [LucideAngularModule],
  templateUrl: './features-bar-section.html',
  styleUrl: './features-bar-section.scss',
})
export class FeaturesBarSection {
  features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      desc: 'For orders above 120 EGP',
    },
    {
      icon: RefreshCw,
      title: 'Get Refund',
      desc: 'Refunds within 30 days',
    },
    {
      icon: ShieldCheck,
      title: 'Safe Payment',
      desc: '100% Secure Payment',
    },
    {
      icon: Headset,
      title: '24/7 Support',
      desc: 'Contact us at any time',
    },
  ];
}
