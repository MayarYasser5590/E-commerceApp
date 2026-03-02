import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputMolecule } from './search-input-molecule';

describe('SearchInputMolecule', () => {
  let component: SearchInputMolecule;
  let fixture: ComponentFixture<SearchInputMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputMolecule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
