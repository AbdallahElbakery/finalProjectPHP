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
  profilePhoto: string | null = null;
  private serverUrl = 'http://127.0.0.1:8000/uploads/';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private propertyService: PropertyServiceService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zأ-ي]{2,}\s[A-Za-zأ-ي]{2,}$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      role: ['seller'],
      photo: [''] // فقط عند رفع صورة جديدة
    });

    this.propertyService.getCurrentUserProfile().subscribe((res) => {
      const user = res.user;
      let city = '', country = '';
      if (user.address && typeof user.address === 'object') {
        city = user.address.city || '';
        country = user.address.country || '';
      }
      this.registerForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        city,
        country
      });
      this.setProfilePhoto(user.photo ?? null);
    });
  }

  setProfilePhoto(photo: string | null) {
    if (!photo) {
      this.profilePhoto = null;
    } else if (photo.startsWith('data:image')) {
      this.profilePhoto = photo;
    } else {
      this.profilePhoto = this.serverUrl + photo;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ 'photo': file });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.setProfilePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const data = { ...this.registerForm.value };
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      formData.append('_method', 'PATCH');

      this.propertyService.updateUserProfile(formData).subscribe((res) => {
        // بعد الحفظ، حدث بيانات الفورم والصورة
        const user = res.user || res.data || res;
        let city = '', country = '';
        if (user.address && typeof user.address === 'object') {
          city = user.address.city || '';
          country = user.address.country || '';
        }
        this.registerForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          city,
          country
        });
        this.setProfilePhoto(user.photo ?? null);
        // عرض Toast Bootstrap للنجاح
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-bg-success border-0 show position-fixed top-0 end-0 m-3';
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `<div class='d-flex'><div class='toast-body'>Profile updated successfully!</div><button type='button' class='btn-close btn-close-white me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button></div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }



}
