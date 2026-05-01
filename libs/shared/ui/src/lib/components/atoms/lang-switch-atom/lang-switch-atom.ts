import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lib-lang-switch-atom',
  standalone: true,
  template: `
    <button (click)="toggleLang()" class="cursor-pointer">
      {{ currentLang === 'ar' ? 'English' : 'العربية' }}
    </button>
  `,
})
export class LangSwitchAtom implements OnInit {
  private translate = inject(TranslateService);

  get currentLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }

  toggleLang() {
    const newLang = this.currentLang === 'ar' ? 'en' : 'ar';

    this.translate.use(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', newLang);
  }
}
