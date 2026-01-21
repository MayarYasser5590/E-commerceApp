import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopFeatureHome } from './shop-feature-home';

describe('ShopFeatureHome', () => {
  let component: ShopFeatureHome;
  let fixture: ComponentFixture<ShopFeatureHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFeatureHome],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopFeatureHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
