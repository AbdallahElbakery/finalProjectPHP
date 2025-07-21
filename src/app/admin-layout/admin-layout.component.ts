import { Component } from '@angular/core';
import { NavbarComponent } from '../components/admin/navbar/navbar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/admin/sidebar/sidebar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarComponent, RouterOutlet, SidebarComponent, NgIf],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  showSidebar: boolean = true
  showNavbar: boolean = true
  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){

        if (this.router.url === '/admin/login') {
          this.showSidebar = false
          this.showNavbar = false

        }
        else {
          this.showSidebar = true
          this.showNavbar = true
        }
      }
  })
}


}
