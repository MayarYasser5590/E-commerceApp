import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Flourish } from './flourish';

describe('Flourish', () => {
  let component: Flourish;
  let fixture: ComponentFixture<Flourish>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flourish],
    }).compileComponents();

    fixture = TestBed.createComponent(Flourish);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
