import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopPaymentMethodSection } from './shop-payment-method-section';

describe('ShopPaymentMethodSection', () => {
  let component: ShopPaymentMethodSection;
  let fixture: ComponentFixture<ShopPaymentMethodSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPaymentMethodSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopPaymentMethodSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
