import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule,
    MatSidenavModule,MatButtonModule,MatIconModule,
    MatListModule,MatMenuModule],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit {

  showmenu=true;
  Loginuser='Admin'
  ngOnInit(): void {
  }

  

}
