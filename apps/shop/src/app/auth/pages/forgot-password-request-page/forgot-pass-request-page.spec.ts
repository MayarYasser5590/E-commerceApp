import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassRequestPage } from './forgot-pass-request-page';

describe('ForgotPassRequestPage', () => {
  let component: ForgotPassRequestPage;
  let fixture: ComponentFixture<ForgotPassRequestPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassRequestPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassRequestPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
