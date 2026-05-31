import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingFlowLayout } from './shopping-flow-layout';

describe('ShoppingFlowLayout', () => {
  let component: ShoppingFlowLayout;
  let fixture: ComponentFixture<ShoppingFlowLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingFlowLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingFlowLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
