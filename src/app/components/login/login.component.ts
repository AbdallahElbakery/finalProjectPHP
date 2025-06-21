import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  
  loginForm: FormGroup;
  showPassword = false;
  passwordValidationMessage = '';

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

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Handle form submission
    } else {
      this.loginForm.markAllAsTouched();
      this.validatePassword();
    }
  }
}