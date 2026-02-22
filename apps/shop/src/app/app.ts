import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShopFeatureHome } from '@shop-workspace/shop-feature-home';

@Component({
  imports: [RouterModule, ShopFeatureHome],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'shop';
}
