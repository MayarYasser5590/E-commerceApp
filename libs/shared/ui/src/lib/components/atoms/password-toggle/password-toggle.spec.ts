import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordToggle } from './password-toggle';

describe('PasswordToggle', () => {
  let component: PasswordToggle;
  let fixture: ComponentFixture<PasswordToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
