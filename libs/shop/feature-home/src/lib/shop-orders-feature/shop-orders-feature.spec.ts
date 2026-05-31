import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopOrdersFeature } from './shop-orders-feature';

describe('ShopOrdersFeature', () => {
  let component: ShopOrdersFeature;
  let fixture: ComponentFixture<ShopOrdersFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopOrdersFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopOrdersFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
