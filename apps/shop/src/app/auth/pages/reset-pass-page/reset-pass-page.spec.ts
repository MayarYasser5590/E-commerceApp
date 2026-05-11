import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPassPage } from './reset-pass-page';
import { appConfig } from '../../../app.config';

describe('ResetPassPage', () => {
  let component: ResetPassPage;
  let fixture: ComponentFixture<ResetPassPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassPage],
      providers: appConfig.providers,
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
