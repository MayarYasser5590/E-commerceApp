import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassRequestPage } from './forgot-pass-request-page';
import { appConfig } from '../../../app.config';

describe('ForgotPassRequestPage', () => {
  let component: ForgotPassRequestPage;
  let fixture: ComponentFixture<ForgotPassRequestPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassRequestPage],
      providers: appConfig.providers,
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassRequestPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
