import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsPages } from './product-details-pages';
import { appConfig } from '../../../../app.config';

describe('ProductDetailsPages', () => {
  let component: ProductDetailsPages;
  let fixture: ComponentFixture<ProductDetailsPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsPages],
      providers: appConfig.providers,
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsPages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
