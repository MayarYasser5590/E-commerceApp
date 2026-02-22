import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastToast } from './toast';

describe('ToastToast', () => {
  let component: ToastToast;
  let fixture: ComponentFixture<ToastToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastToast],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
