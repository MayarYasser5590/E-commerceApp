import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Navbar } from './navbar';
import { appConfig } from '../../../app.config';
import { WishlistService } from '@shop-workspace/shop-feature-home';

class WishlistServiceMock {
  wishlistCount = signal(0);

  loadWishlist(): void {
    return undefined;
  }
}

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        ...appConfig.providers,
        { provide: WishlistService, useClass: WishlistServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
