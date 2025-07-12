import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      // إذا كان المستخدم مسجل دخول، توجيهه للصفحة الرئيسية
      return this.router.parseUrl('/home');
    } else {
      // إذا لم يكن مسجل دخول، السماح له بالوصول للصفحة
      return true;
    }
  }
} 