import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormOrganism } from './register-form-organism';

describe('RegisterFormOrganism', () => {
  let component: RegisterFormOrganism;
  let fixture: ComponentFixture<RegisterFormOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
