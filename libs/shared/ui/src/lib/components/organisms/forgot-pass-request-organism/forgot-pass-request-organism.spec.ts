import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassRequestOrganism } from './forgot-pass-request-organism';

describe('ForgotPassRequestOrganism', () => {
  let component: ForgotPassRequestOrganism;
  let fixture: ComponentFixture<ForgotPassRequestOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassRequestOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassRequestOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
