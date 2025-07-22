import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-dashboard,app-monthly-sales',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showSidebar: boolean = true
  properties: any
  users: any
  constructor(
    private adminService: AdminServiceService
  ) { }
 
  ngOnInit() {
    this.properties = this.adminService.getProperties().subscribe((res) => {
      return this.properties = res.properties
    })

    this.users = this.adminService.getUsers().subscribe((res) => {
      return this.users = res.allUsers
    })

  }
}
