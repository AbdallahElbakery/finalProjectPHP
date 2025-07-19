import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor (private authService: AuthService){}


 get UserName(){
    return this.authService.getUserName();
  }
  logout(){
    return this.authService.logoutAdmin().subscribe()
  }
}
