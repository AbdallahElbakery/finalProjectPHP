import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AllUser, User } from '../../../types/admin-users';
import { AdminServiceService } from './../../../services/admin-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details,date-pipe',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  getId: any;
  user: any;
  constructor(
    private adminService: AdminServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.adminService.getSingleUser(this.getId).subscribe((res) => {
      console.log(res);
      this.user = res.user;
    });
  }
  onImgError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'https://ui-avatars.com/api/?name=Sarah+Smith&background=1e40af&color=fff&rounded=true&size=80';
}
 goEditUser(id:any){
    return this.router.navigate(['admin/edit/users', id]);
  }
}
