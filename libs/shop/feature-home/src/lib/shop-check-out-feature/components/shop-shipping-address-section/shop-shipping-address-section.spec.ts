import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopShippingAddressSection } from './shop-shipping-address-section';

describe('ShopShippingAddressSection', () => {
  let component: ShopShippingAddressSection;
  let fixture: ComponentFixture<ShopShippingAddressSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopShippingAddressSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopShippingAddressSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
