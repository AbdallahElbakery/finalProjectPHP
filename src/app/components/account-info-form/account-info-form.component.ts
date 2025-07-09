import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-info-form.component.html',
  styleUrl: './account-info-form.component.css'
})
export class AccountInfoFormComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      picture: [''],
      name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zأ-ي]{2,}\s[A-Za-zأ-ي]{2,}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      address: ['', Validators.required],
      role: ['seller']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.registerForm.patchValue({ picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('✅ Form submitted:', this.registerForm.value);
      this.router.navigate(['/seller-profile']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
