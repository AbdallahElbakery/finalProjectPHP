import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { Category } from '../../../types/category';
import { Property } from '../../../types/property';
import { PropertyServiceService } from '../../../services/property-service.service';
import { SellerData } from '../../../types/seller';

@Component({
  selector: 'app-property-add',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './property-add.component.html',
  styleUrl: './property-add.component.css'
})
export class PropertyAddComponent {
  addForm!: FormGroup;
  submitted = false;
  categories: Category[] = [];
  sellers: any;
  private fb = inject(FormBuilder);
  constructor(
    private adminService: AdminServiceService,
    private propertyService: PropertyServiceService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      citynum: [''],
      purpose: [''],
      status: [''],
      area: [''],
      bedrooms: [''],
      bathrooms: [''],
      seller_id: [''],
      category_id: [''],
      city: [''],
      country: [''],
      image: ['image'],
    });
  }

  ngOnInit() {
    this.initalizeForm();
    this.propertyService.getCategories().subscribe((category) => {
      this.categories = category
    })
    this.adminService.getSellers().subscribe((res) => {
      console.log(res.allsellers);
      this.sellers = res.allsellers
    });
  }
  onSubmit() {
    const data = { ...this.addForm.value };
    this.adminService.addProperty(data).subscribe({

      next: (res) => {
        console.log('Property added successfully', res)
        alert('Property added successfully');
        this.addForm.reset();
        this.router.navigate(['/admin/properties']);
      }, error: (err) => {
        console.error('Error adding property', err);
      }
    })
  }
  initalizeForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(500), Validators.max(100000000)]],
      citynum: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      status: ['', [Validators.required]],
      payment_method: ['', [Validators.required]],
      area: ['', [Validators.required, Validators.min(50)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]],
      seller_id: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      image: ['image'],
    });
  }
  //check field validity
  isFieldInvalid(field: string): boolean {
    const control = this.addForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // error messages
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
