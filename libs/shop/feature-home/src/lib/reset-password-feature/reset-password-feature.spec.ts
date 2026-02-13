import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordFeature } from './reset-password-feature';

describe('ResetPasswordFeature', () => {
  let component: ResetPasswordFeature;
  let fixture: ComponentFixture<ResetPasswordFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
