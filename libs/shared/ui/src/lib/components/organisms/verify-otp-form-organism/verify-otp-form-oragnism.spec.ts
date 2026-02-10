import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyOtpFormOragnism } from './verify-otp-form-oragnism';

describe('VerifyOtpFormOragnism', () => {
  let component: VerifyOtpFormOragnism;
  let fixture: ComponentFixture<VerifyOtpFormOragnism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOtpFormOragnism],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyOtpFormOragnism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
