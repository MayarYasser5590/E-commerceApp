import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticatedMenuMolecule } from './authenticated-menu-molecule';

describe('AuthenticatedMenuMolecule', () => {
  let component: AuthenticatedMenuMolecule;
  let fixture: ComponentFixture<AuthenticatedMenuMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedMenuMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatedMenuMolecule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
