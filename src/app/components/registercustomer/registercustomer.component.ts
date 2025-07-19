import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registercustomer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './registercustomer.component.html',
  styleUrl: './registercustomer.component.css'
})
export class RegistercustomerComponent {
  registerForm: FormGroup;
  showPassword = false;
  loading = false;
  errorMessage = '';
  photoFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+\s[A-Za-z]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*.])[A-Za-z\d!@#$%&*.]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      photo: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;
      this.registerForm.patchValue({ photo: file });
      this.registerForm.get('photo')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const { name, email, phone, password, city, country, confirmPassword } = this.registerForm.value;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);
      formData.append('city', city);
      formData.append('country', country);
      formData.append('role', 'user');
      if (this.photoFile) {
        formData.append('photo', this.photoFile);
      }
      this.authService.registerUser(formData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          if (err?.error?.errors) {
            this.errorMessage = Object.values(err.error.errors).join(' | ');
          } else {
            this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
          }
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}