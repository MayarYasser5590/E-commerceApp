import { Component, signal } from '@angular/core';
import { LibButton } from '@shop-workspace/shared-ui';
import { Plus, Search, Settings } from 'lucide-angular';

@Component({
  selector: 'lib-button-showcase',
  imports: [LibButton],
  templateUrl: './button-showcase.html',
  styleUrl: './button-showcase.scss',
})
export class ButtonShowcase {
  protected readonly Search = Search;
  protected readonly Settings = Settings;
  protected readonly Plus = Plus;
  isLoading = signal(false);

  toggleLoading() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  onButtonClick() {
    console.log('Button clicked!');
  }
}
