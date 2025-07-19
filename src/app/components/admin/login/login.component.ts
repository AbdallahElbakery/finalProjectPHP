import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface SocialProvider {
  id: string;
  name: string;
  icon: string;
}

interface StatItem {
  value: string;
  label: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  loginForm: FormGroup;
  showPassword = false;
  passwordValidationMessage = '';
  loading = false;
  errorMessage = '';

  socialProviders: SocialProvider[] = [
    { id: 'google', name: 'Google', icon: 'fa-google' },
    { id: 'facebook', name: 'Facebook', icon: 'fa-facebook-f' }
  ];

  stats: StatItem[] = [
    { value: '50K+', label: 'Properties Listed' },
    { value: '25K+', label: 'Happy Clients' },
    { value: '150+', label: 'Cities Covered' }
  ];

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*]).+$/)
      ]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validatePassword() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.errors) {
      if (passwordControl.errors['required']) {
        this.passwordValidationMessage = 'Password is required';
      } else if (passwordControl.errors['minLength']) {
        this.passwordValidationMessage = 'Password must be at least 8 characters';
      } else if (passwordControl.errors['pattern']) {
        this.passwordValidationMessage = 'Password must contain letters, numbers, and special characters (!@#$%&*)';
      }
    } else {
      this.passwordValidationMessage = '';
    }
  }

  socialLogin(providerId: string) {
    console.log('Logging in with:', providerId);
    // Implement social login logic here
  }

  isMobileScreen(): boolean {
    return window.innerWidth < 992; // LG breakpoint
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err?.error?.Message || 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.validatePassword();
    }
  }
}