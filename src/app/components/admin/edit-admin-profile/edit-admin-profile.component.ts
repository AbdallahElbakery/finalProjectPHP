import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../types/address';
import { PropertyServiceService } from '../../../services/property-service.service';
import { AdminServiceService } from '../../../services/admin-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-admin-profile',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-admin-profile.component.html',
  styleUrl: './edit-admin-profile.component.css'
})
export class EditAdminProfileComponent {
  getId: any;
  editForm!: FormGroup
  addresses: Address[] = []
  submitted = false;

  constructor(
    private propertyService: PropertyServiceService,
    private adminService: AdminServiceService,
    private ActivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getId = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.propertyService.getAddresses().subscribe((cities) => {
      return this.addresses = cities;
    })

    this.adminService.getProfile().subscribe((res) => {
      console.log(res.profile)
      this.editForm.patchValue({
        name: res.profile.name,
        email: res.profile.email,
        phone: res.profile.phone,
        country: res.profile.address.country,
        city: res.profile.address.city,
        role: res.profile.role,
        photo: res.profile.photo
      })
    })
  }
  isFieldInvalid(field: string): boolean {
    const control = this.editForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }
  initializeForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*]).+$/)]],
      phone: ['', Validators.required, Validators.minLength(11)],
      role: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      photo: '',
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editForm.patchValue({ photo: file })
    }
  }
  getErrorMessage(field: string): string {
    const control = this.editForm.get(field);

    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control.errors['min']) {
      return `Minimum value is ${control.errors['min'].min}`;
    }
    if (control.errors['max']) {
      return `Maximum value is ${control.errors['max'].max}`;
    }

    return 'Invalid value';
  }
  onSubmit() {

    const data = { ...this.editForm.value }
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key == 'photo' || data[key] instanceof File) {
        formData.append('photo', data[key])
      }
      else {
        formData.append(key, data[key])
      }
    })
    console.log(formData.get('photo')); // لازم يطبع File {...}

    formData.append('_method', 'PUT')
    this.adminService.editAProfile(formData).subscribe((res) => {
      console.log("res", res);
      alert('ur account has been updated successfully');
    })
  }
}
