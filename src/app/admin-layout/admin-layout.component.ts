import { Component } from '@angular/core';
import { NavbarComponent } from '../components/admin/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarComponent, RouterOutlet , SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
