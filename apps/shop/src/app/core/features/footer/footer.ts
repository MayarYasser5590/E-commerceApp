import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArrowRight } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { LogoAtom } from '@shop-workspace/shared-ui';

@Component({
  selector: 'app-footer',
  imports: [LogoAtom, LucideAngularModule],
  template: `
    <footer class="bg-[#27272a] py-10 text-white">
      <div class="mx-auto flex w-full max-w-screen-xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-4 lg:px-8">
        <div class="flex w-full flex-col items-center justify-center gap-1.5 lg:w-[250px]">
          <lib-logo-atom imgClass="h-[150px] w-[160px] sm:h-[225px] sm:w-[240px]" />
          <p class="w-[182px] text-center text-[18px] font-semibold leading-none text-[#ffa3b9]">Rose E-Commerce App</p>
          <p class="text-center text-[14px] leading-none text-[#f4f4f5]">All rights reserved | 2025</p>
        </div>

        <nav class="flex min-w-0 flex-1 flex-col gap-1.5 whitespace-nowrap pl-0 lg:pl-4" aria-label="Footer navigation">
          <h2 class="text-[18px] font-semibold leading-none text-[#ffa3b9]">Discover our website</h2>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/home">Home</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/products">Products</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/Categories">Categories</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/Occasions">Occasions</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/Contact">Contact</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/About">About</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/">Terms & Conditions</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/">Privacy Policy</a>
          <a class="text-[16px] font-medium leading-none text-[#f4f4f5]" href="/">FAQs</a>
        </nav>

        <div class="flex w-full flex-col gap-5 lg:w-[375px]">
          <div class="flex flex-col">
            <p class="text-[20px] font-semibold leading-none text-[#ffa3b9]">
              Get <span class="text-[#fbeaea]">20%</span> Off Discount Coupon
            </p>
            <p class="text-[14px] leading-none text-[#71717a]">By subscribing to our newsletter</p>
          </div>
          <form class="flex h-[38px] w-full items-center justify-between rounded-[30px] bg-[#52525b] pl-4 sm:w-[375px]">
            <label class="sr-only" for="footer-email">Enter Your Email</label>
            <input
              id="footer-email"
              type="email"
              placeholder="Enter Your Email"
              class="min-w-0 flex-1 bg-transparent text-[14px] font-medium leading-none text-[#f4f4f5] placeholder:text-[#a1a1aa] focus:outline-none"
            />
            <button
              type="submit"
              class="flex h-[38px] w-[121px] items-center justify-center gap-2.5 rounded-full bg-[#fbeaea] px-4 py-2.5 text-[14px] font-medium leading-none text-[#741c21]"
            >
              Subscribe
              <lucide-icon [name]="icons.ArrowRight" class="h-4 w-4"></lucide-icon>
            </button>
          </form>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly icons = { ArrowRight };
}
