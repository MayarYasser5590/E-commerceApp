import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNavbarOrganism } from './main-navbar-organism';

describe('MainNavbarOrganism', () => {
  let component: MainNavbarOrganism;
  let fixture: ComponentFixture<MainNavbarOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavbarOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavbarOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
