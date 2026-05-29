import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarMolecule } from './progress-bar-molecule';

describe('ProgressBarMolecule', () => {
  let component: ProgressBarMolecule;
  let fixture: ComponentFixture<ProgressBarMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarMolecule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
