import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-account-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-info-form.component.html',
  styleUrl: './account-info-form.component.css'
})
export class AccountInfoFormComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private propertyService: PropertyServiceService
  ) {
    this.propertyService.getProfile().subscribe((res) => {
      this.registerForm.setValue({
        name: res['name'],
        email: res['email'],
        phone: res['phone'],
        role: res['role'],
        address: res['full_address'],
        photo: res['photo'],
      })
    })
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zأ-ي]{2,}\s[A-Za-zأ-ي]{2,}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      address: ['', Validators.required],
      role: ['seller'],
      photo: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ 'photo': file })
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const data = { ...this.registerForm.value };
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
      formData.append('_method', 'PATCH');

      this.propertyService.updateProfile(formData).subscribe(() => {
        console.log("updated")
      })
    
      
      alert('✅ Profile Info Updated')
      this.router.navigate(['/edit-profile']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }



  }
