import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyServiceService } from '../../../services/property-service.service';
import { AdminServiceService } from '../../../services/admin-service.service';
import { Address } from '../../../types/address';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  addForm!: FormGroup
  fb = inject(FormBuilder);
  submitted = false;
  addresses: Address[] = []
  constructor(
    private propertyService: PropertyServiceService,
    private adminService: AdminServiceService
  ) {
    this.addForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      phone: [''],
      role: [''],
      city: [''],
      country: [''],
      photo: ['photo']

    })
  }

  ngOnInit() {
    this.initializeForm()
    this.propertyService.getAddresses().subscribe((res) => {
      this.addresses = res;
    })
  }
  initializeForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*]).+$/)]],
      phone: [''],
      role: ['', Validators.required],
      // address_id: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      photo: ['photo'],
    });
  }
  onSubmit() {
    const data = { ...this.addForm.value }
    console.log(data),
    this.adminService.addUser(data).subscribe({
      next: () => {
        console.log(data),
          alert('✅ The user has been added successfully');
        this.addForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert('Error adding user');
      }
    })
  }
  isFieldInvalid(field: string): boolean {
    const control = this.addForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }
  getErrorMessage(field: string): string {
    const control = this.addForm.get(field);

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
  
}
