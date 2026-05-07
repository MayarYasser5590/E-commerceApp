import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { UserAddressService } from '../../../data-access/user-address.service';
import { UserAddress } from '@shop-workspace/shared-types';
import { Subscription } from 'rxjs';
import { LibButton, ProgressBarMolecule } from '@shop-workspace/shared-ui';
import { LucideAngularModule, Phone } from 'lucide-angular';

@Component({
  selector: 'lib-shop-shipping-address-section',
  imports: [LibButton, LucideAngularModule, ProgressBarMolecule],
  templateUrl: './shop-shipping-address-section.html',
  styleUrl: './shop-shipping-address-section.scss',
})
export class ShopShippingAddressSection implements OnInit, OnDestroy {
  private readonly userAddressService = inject(UserAddressService);
  userAddressSubscribe: Subscription = new Subscription();

  @Output() next = new EventEmitter<UserAddress>();

  addresses = signal<UserAddress[]>([]);
  selectedAddressId = signal<string | null>(null);

  icons = {
    Phone,
  };

  ngOnInit() {
    this.getUserAddress();
  }

  getUserAddress(): void {
    this.userAddressSubscribe = this.userAddressService
      .getLoggedUserAddresses()
      .subscribe({
        next: (res) => {
          this.addresses.set(res.addresses);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  selectAddress(id: string) {
    this.selectedAddressId.set(id);
  }

  onContinue() {
    const selected = this.addresses().find(
      (a) => a._id === this.selectedAddressId(),
    );

    if (selected) {
      this.next.emit(selected);
    }
  }

  ngOnDestroy(): void {
    this.userAddressSubscribe.unsubscribe();
  }
}
