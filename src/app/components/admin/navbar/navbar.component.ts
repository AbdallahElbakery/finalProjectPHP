import { AdminServiceService } from '../../../services/admin-service.service';
import { AllUser } from '../../../types/admin-users';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    user: any;
  
constructor (private authService: AuthService,
      private adminService: AdminServiceService,


){}


 get UserName(){
    return this.authService.getUserName();
  }
  logout(){
    return this.authService.logoutAdmin().subscribe()
  }

  ngOnInit(): void {
    this.adminService.getProfile().subscribe((res) => {
      this.user = res.profile;
    })
  }

onImageError(event: any) {
    const SrcElement = event.target as HTMLImageElement;
    SrcElement.src = 'https://ui-avatars.com/api/?name=user&background=1e40af&color=fff&rounded=true&size=80';
  }
}
