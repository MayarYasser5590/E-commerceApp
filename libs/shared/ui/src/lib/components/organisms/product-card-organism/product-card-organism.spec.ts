import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardOrganism } from './product-card-organism';

describe('ProductCardOrganism', () => {
  let component: ProductCardOrganism;
  let fixture: ComponentFixture<ProductCardOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
