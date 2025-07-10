import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerseller',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registerseller.component.html',
  styleUrl: './registerseller.component.css'
})
export class RegistersellerComponent {
  registerForm: FormGroup;
  showPassword = false;
  loading = false;
  errorMessage = '';
  serviceAreas = [
    { value: 'cairo', label: 'Cairo' },
    { value: 'giza', label: 'Giza' },
    { value: 'alexandria', label: 'Alexandria' },
    { value: 'luxor', label: 'Luxor' },
    { value: 'aswan', label: 'Aswan' },
    { value: 'hurghada', label: 'Hurghada' },
    { value: 'sharm-el-sheikh', label: 'Sharm El Sheikh' },
    { value: 'nationwide', label: 'Nationwide' }
  ];

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
      company_name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/)
      ]],
      logo: [null],
      photo: [null, Validators.required],
      personal_id_image: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ [field]: file });
      this.registerForm.get(field)?.updateValueAndValidity();
      
      // Preview logic would go here
      const previewId = `${field}-preview`;
      const previewElement = document.getElementById(previewId);
      if (previewElement && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          previewElement.innerHTML = `<img src="${e.target.result}" class="img-thumbnail" style="max-height: 100px;">`;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const formValue = this.registerForm.value;
      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('email', formValue.email);
      formData.append('phone', formValue.phone);
      formData.append('password', formValue.password);
      formData.append('password_confirmation', formValue.confirmPassword);
      formData.append('city', formValue.city);
      formData.append('country', formValue.country);
      formData.append('company_name', formValue.company_name);
      if (formValue.logo) formData.append('logo', formValue.logo);
      if (formValue.photo) formData.append('photo', formValue.photo);
      if (formValue.personal_id_image) formData.append('personal_id_image', formValue.personal_id_image);
      formData.append('role', 'seller');
      this.authService.registerSeller(formData).subscribe({
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