import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminFeatureDashboard } from './admin-feature-dashboard';

describe('AdminFeatureDashboard', () => {
  let component: AdminFeatureDashboard;
  let fixture: ComponentFixture<AdminFeatureDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFeatureDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFeatureDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
