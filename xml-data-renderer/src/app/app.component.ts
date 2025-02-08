import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { EditAreaComponent } from "./components/edit-area/edit-area.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, EditAreaComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'xml-data-renderer';
}
