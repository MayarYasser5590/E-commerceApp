import { Component, OnInit, inject, signal } from '@angular/core';
import { Order } from '@shop-workspace/shared-types';
import { CommonModule } from '@angular/common';
import { OrderService } from '../data-access/order.service';
import { LucideAngularModule, Star } from 'lucide-angular';
import {
  DEFAULT_STATUS_CLASS,
  STATUS_CLASSES,
} from '@shop-workspace/shared-util';

@Component({
  selector: 'lib-shop-orders-feature',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './shop-orders-feature.html',
  styleUrl: './shop-orders-feature.scss',
})
export class ShopOrdersFeature implements OnInit {
  private readonly orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  expandedOrderId = signal<string | null>(null);

  icons = {
    Star,
  };

  ngOnInit() {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orders.set(res.orders);
      },
      error: (err) => console.error(err),
    });
  }

  toggle(orderId: string) {
    this.expandedOrderId.update((current) =>
      current === orderId ? null : orderId,
    );
  }

  isExpanded(orderId: string) {
    return this.expandedOrderId() === orderId;
  }

  getStatusClasses(state: string): string {
    return STATUS_CLASSES[state.toLowerCase()] ?? DEFAULT_STATUS_CLASS;
  }
}
