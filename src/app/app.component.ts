import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppmenuComponent } from './component/common/appmenu/appmenu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AppmenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PMS';
}
