import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  DestroyRef,
} from '@angular/core';
import { UserAddressService } from '../../../data-access/user-address.service';
import { UserAddress } from '@shop-workspace/shared-types';
import { LibButton, ProgressBarMolecule } from '@shop-workspace/shared-ui';
import { LucideAngularModule, Phone } from 'lucide-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-shop-shipping-address-section',
  imports: [LibButton, LucideAngularModule, ProgressBarMolecule],
  templateUrl: './shop-shipping-address-section.html',
  styleUrl: './shop-shipping-address-section.scss',
})
export class ShopShippingAddressSection implements OnInit {
  private readonly userAddressService = inject(UserAddressService);
  private readonly destroyRef = inject(DestroyRef);

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
    this.userAddressService
      .getLoggedUserAddresses()
      .pipe(takeUntilDestroyed(this.destroyRef))
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
}
