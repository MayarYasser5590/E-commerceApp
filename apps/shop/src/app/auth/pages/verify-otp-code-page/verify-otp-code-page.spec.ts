import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyOtpCodePage } from './verify-otp-code-page';

describe('VerifyOtpCodePage', () => {
  let component: VerifyOtpCodePage;
  let fixture: ComponentFixture<VerifyOtpCodePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOtpCodePage],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyOtpCodePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
