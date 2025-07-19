import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { AllUser, Root, User } from '../../../types/admin-users';
import { CommonModule, NgClass } from '@angular/common';
import { S } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-users-list,date-pipe',
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  allusers: AllUser[] = [];
  user: User[] = [];
  getId: any;
  constructor(
    private adminService: AdminServiceService,
    private router: Router
  ) { }

  @Input() userDetails: any;

  ngOnInit(): void {

    this.adminService.getUsers().subscribe((res) => {
      console.log(res);
      this.allusers = res.allUsers;
    })
  }
  viewUser(userId: number) {
    this.router.navigate(['admin/details/users', userId])
  }
  onImageError(event: any) {
    const SrcElement = event.target as HTMLImageElement;
    SrcElement.src = 'https://ui-avatars.com/api/?name=user&background=1e40af&color=fff&rounded=true&size=80';
  }

  deleteUser(id: number, i: number) {
    if (confirm('are u share u want to permenantly delete this user?')) {
      return this.adminService.deleteUser(id).subscribe((res) => {
        this.allusers.splice(i, 1)
        alert('deleted successfully');
      })
    }
    else {
      return false;
    }
  }

  goEditUser(id: any) {
    return this.router.navigate(['admin/edit/users', id]);
  }

  goAddUser() {
    return this.router.navigate(['admin/add/users']);
  }
}
