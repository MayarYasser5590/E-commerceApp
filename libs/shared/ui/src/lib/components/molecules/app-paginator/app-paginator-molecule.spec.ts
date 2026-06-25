import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppPaginatorMolecule } from './app-paginator-molecule';

describe('AppPaginatorMolecule', () => {
  let component: AppPaginatorMolecule;
  let fixture: ComponentFixture<AppPaginatorMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPaginatorMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPaginatorMolecule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
