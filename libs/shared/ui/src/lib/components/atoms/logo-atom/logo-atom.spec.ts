import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoAtom } from './logo-atom';

describe('LogoAtom', () => {
  let component: LogoAtom;
  let fixture: ComponentFixture<LogoAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoAtom],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoAtom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
