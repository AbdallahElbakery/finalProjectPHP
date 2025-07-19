import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  authService = inject(AuthService);
  router = inject(Router);

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  get userName() {
    return this.authService.getUserName();
  }
  get photo() {
    return this.authService.getPhoto();
  }
  get photoUrl() {
    const photo = this.authService.getPhoto();
    return photo ? `http://127.0.0.1:8000/uploads/${photo}` : 'assets/images/logo.png'; // fallback to default image
  }
  get isUser() {
    return this.authService.isAuthenticated() && this.authService.getRole() === 'user';
  }
  get isSeller() {
    return this.authService.isAuthenticated() && this.authService.getRole() === 'seller';
  }

  logout() {
    this.authService.logout().subscribe();
  }

  
  getrole() {
    if (this.authService.getRole() == 'seller') {
      this.router.navigate(['/seller-profile'])
    } else if (this.authService.getRole() == 'user') {
      this.router.navigate(['/user-profile'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  listProperty() {
    this.router.navigate(['/my-properties']);
  }
  listBookings() {
    this.router.navigate(['/seller-bookings']);
  }
  addProperty() {
    this.router.navigate(['/create-property']);
  }
}
