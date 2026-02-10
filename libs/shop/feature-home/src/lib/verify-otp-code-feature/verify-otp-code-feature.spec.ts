import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyOtpCodeFeature } from './verify-otp-code-feature';

describe('VerifyOtpCodeFeature', () => {
  let component: VerifyOtpCodeFeature;
  let fixture: ComponentFixture<VerifyOtpCodeFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOtpCodeFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyOtpCodeFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
