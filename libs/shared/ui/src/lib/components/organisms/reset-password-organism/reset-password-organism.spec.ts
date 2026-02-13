import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordOrganism } from './reset-password-organism';

describe('ResetPasswordOrganism', () => {
  let component: ResetPasswordOrganism;
  let fixture: ComponentFixture<ResetPasswordOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
