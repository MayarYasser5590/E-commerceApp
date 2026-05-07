import { Component, OnInit, inject, signal } from '@angular/core';
import { Order } from '@shop-workspace/shared-types';
import { CommonModule } from '@angular/common';
import { OrderService } from '../data-access/order.service';
import { LucideAngularModule, Star } from 'lucide-angular';

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

  getStatusClasses(state: string) {
    switch (state.toLowerCase()) {
      case 'pending':
        return 'bg-blue-100 text-blue-600';

      case 'done':
        return 'bg-green-600 text-white';

      case 'canceled':
        return 'bg-red-600 text-white';
      case 'inProgress':
        return 'bg-blue-600 text-white';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  }
}
