import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
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
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,}$/)
      ]],
      address: ['', Validators.required],
      company_name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/)
      ]],
      service_areas: ['', Validators.required],
      about: ['', Validators.required],
      logo: [null],
      photo: [null, Validators.required],
      personal_id_image: [null, Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

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
      console.log('Form submitted:', this.registerForm.value);
      // Handle form submission
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}