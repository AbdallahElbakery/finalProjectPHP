import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
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

  logout() {
    this.authService.logout().subscribe();
  }
}
