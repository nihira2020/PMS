import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
    MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatMenuModule],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit, DoCheck {

  showmenu = true;
  Loginuser = 'Admin'

  constructor(private router:Router){

  }
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.Loginuser = localStorage.getItem('username') as string;
    this.Setaccess();
  }

  Setaccess() {
    let userrole = localStorage.getItem('userrole');
    let currentUrl = this.router.url;
    if (currentUrl === '/login') {
      this.showmenu = false;
    } else {
      this.showmenu = true;
    }
  }



}
