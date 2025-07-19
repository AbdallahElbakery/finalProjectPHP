import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-users-list',
  imports: [RouterLink],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  allusers: any[] = [];

  constructor(private adminService: AdminServiceService) { }


  ngOnInit():void{

      this.adminService.getUsers().subscribe((res) => {
        console.log("resoponse is " + res);
        this.allusers = res;
      })
  }
}
