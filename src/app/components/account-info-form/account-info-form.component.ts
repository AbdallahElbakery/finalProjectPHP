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
        photo: res['image'],
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
      image: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.registerForm.patchValue({ picture: reader.result });
      // };
      // reader.readAsDataURL(file);
      this.registerForm.patchValue({ 'image': file })
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const data = { ...this.registerForm.value };
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('role', data.role);
      formData.append('address', data.address);

      if (data.image instanceof File) {
        formData.append('image', data.image);
      }
      this.propertyService.updateProfile(formData).subscribe(() => {
        console.log("updated")

      })
      console.log(formData.get('image'));
      alert('✅ Profile Info Updated')
      console.log('✅ Form submitted:', this.registerForm.value);
      this.router.navigate(['/edit-profile']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}