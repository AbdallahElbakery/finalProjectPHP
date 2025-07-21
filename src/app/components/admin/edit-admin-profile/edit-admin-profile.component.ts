import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../types/address';
import { PropertyServiceService } from '../../../services/property-service.service';
import { AdminServiceService } from '../../../services/admin-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-admin-profile',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
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
    private fb :FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getId = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.propertyService.getAddresses().subscribe((cities) => {
      return this.addresses = cities;
    })

    this.adminService.getSingleUser(this.getId).subscribe((res) => {
      console.log("res", res)
      this.editForm.patchValue({
        name: res.user.name,
        email: res.user['email'],
        phone: res.user.phone,
        role: res.user.role,
        address_id: res.user.address_id,
        photo: res.user.photo
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
      phone: [''],
      role: ['', Validators.required],
      address_id: ['', Validators.required],
      photo:[''],
    });
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

    const data={...this.editForm.value}
    // const formData=new FormData();

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });
    // formData.append('_method','PUT')
    this.adminService.editUser(data, this.getId).subscribe((res) => {
      console.log("res", res);
      alert('User updated successfully');
    })
   }
}
