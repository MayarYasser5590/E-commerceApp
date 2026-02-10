import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFormHeaderMolecule } from './AuthFormHeaderMolecule';

describe('AuthFormHeaderMolecule', () => {
  let component: AuthFormHeaderMolecule;
  let fixture: ComponentFixture<AuthFormHeaderMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormHeaderMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormHeaderMolecule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
