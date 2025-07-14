import { Component, NgZone, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyServiceService } from '../../services/property-service.service';
import { Category } from '../../types/category';
import { Address } from '../../types/address';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  propertyForm!: FormGroup;
  submitted = false;
  categories: Category[] = [];
  addresses: Address[] = []
  constructor(
    private propertyService: PropertyServiceService,
    public formBuilder: FormBuilder,
  ) {
    this.propertyForm = this.formBuilder.group({
      name: [''],
      description: [''],
      citynum: [''],
      price: [''],
      area: [''],
      bedrooms: [''],
      bathrooms: [''],
      purpose: [''],
      category_id: [''],
      address_id: [''],
      image: ['']
    });

  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPropertyData();

    this.propertyService.getCategories().subscribe((category) => {
      this.categories = category
    })

    this.propertyService.getAddresses().subscribe((cities) => {
      return this.addresses = cities;
    })
  }

  initializeForm() {
    this.propertyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      citynum: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      price: [null, [Validators.required, Validators.min(100000), Validators.max(100000000)]],
      address_id: ['', Validators.required],
      category_id: ['', Validators.required],
      purpose: ['', Validators.required],
      area: [null, [Validators.required, Validators.min(20), Validators.max(5000)]],
      bedrooms: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      bathrooms: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      image: ['', [Validators.required]]
    });
  }

  loadPropertyData() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const mock = JSON.parse(localStorage.getItem('myProperties') || '[]');
        const property = mock.find((p: any) => p.id == id);
        if (property) {
          this.propertyForm.patchValue(property);
        }
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.propertyForm.patchValue({ 'image': file })
    }
  }

  onSubmit() {
    console.log(this.propertyForm.valid)
    this.submitted = true;

    if (this.propertyForm.valid) {
      const formData = new FormData();
      const data = { ...this.propertyForm.value };
      if (data.image === null || data.image === '') {
        delete data.image;
      }
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key] instanceof File) {
        formData.append('image', data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });


      this.propertyService.addProperty(formData).subscribe(
        () => console.log('New Property:', this.propertyForm.value),
        err => console.error(err)
      )
      alert('✅ The property has been added successfully');
      this.propertyForm.reset();
      this.submitted = false;
    } else {
      Object.values(this.propertyForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }

  //check field validity
  isFieldInvalid(field: string): boolean {
    const control = this.propertyForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // error messages
  getErrorMessage(field: string): string {
    const control = this.propertyForm.get(field);

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