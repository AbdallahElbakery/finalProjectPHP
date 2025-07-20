import { Component, inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { PropertyServiceService } from '../../../services/property-service.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-property-edit',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './property-edit.component.html',
  styleUrl: './property-edit.component.css'
})
export class PropertyEditComponent {
  editForm!: FormGroup;
  categories: Category[] = [];
  sellers: any
  getId: any;
  submitted = false;
  available = 'available';
  sold = 'sold';
  private fb = inject(FormBuilder);
  constructor(
    private adminService: AdminServiceService,
    private activeRoute: ActivatedRoute,
    private propertyService: PropertyServiceService,
    private router: Router

  ) { }
  ngOnInit() {
    this.initializeForm();
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.propertyService.getCategories().subscribe((category) => {
      this.categories = category
    })
    this.adminService.getSellers().subscribe((res) => {
      console.log(res.allsellers);
      this.sellers = res.allsellers
    });
    this.adminService.getProperty(this.getId).subscribe((res) => {
      console.log(res.Property);
      this.editForm.patchValue({
        name: res.Property.name,
        description: res.Property.description,
        price: res.Property.price,
        citynum: res.Property.citynum,
        purpose: res.Property.purpose,
        status: res.Property.status,
        payment_method: res.Property.payment_method,
        area: res.Property.area,
        bedrooms: res.Property.bedrooms,
        bathrooms: res.Property.bathrooms,
        seller_id: res.Property.seller.user_id,
        category: res.Property.category,
        city: res.Property.city,
        country: res.Property.country,
        image: res.Property.image,

      })
    })
  }

  initializeForm() {
    this.editForm = this.fb.group({
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

    })
  }
  isFieldInvalid(field: string): boolean {
    const control = this.editForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }
  onSubmit() {
    const data = { ...this.editForm.value }

    this.adminService.editProperty(data, this.getId).subscribe((res) => {
      alert('edited successfully');
      console.log("res", res);
      this.submitted = true;
      // this.router.navigate(['/admin/properties']);
    })
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
}
