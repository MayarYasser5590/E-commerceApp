import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavUserDataMolecule } from './nav-user-data-molecule';

describe('NavUserDataMolecule', () => {
  let component: NavUserDataMolecule;
  let fixture: ComponentFixture<NavUserDataMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavUserDataMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavUserDataMolecule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
