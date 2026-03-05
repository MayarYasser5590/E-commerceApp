import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavbarOrganism } from './top-navbar-organism';

describe('TopNavbarOrganism', () => {
  let component: TopNavbarOrganism;
  let fixture: ComponentFixture<TopNavbarOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavbarOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavbarOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
