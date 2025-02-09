import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonComponent } from './components/ui/button/button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, ButtonComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'xml-data-renderer';
}
