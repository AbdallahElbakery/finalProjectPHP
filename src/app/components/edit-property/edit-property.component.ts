import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../types/category';
import { Address } from '../../types/address';
import { PropertyServiceService } from '../../services/property-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Property } from '../../types/property';
import { NotificationComponent } from '../notification';

@Component({
  selector: 'app-edit-property',
  imports: [ReactiveFormsModule, NotificationComponent],
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  updatePropForm!: FormGroup;
  submitted = false;
  getId: any;
  categories: Category[] = [];
  addresses: Address[] = []
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' | 'info' | 'warning' = 'success';
  constructor(
    private propertyService: PropertyServiceService,
    public formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
  ) {
    this.getId = this.activateRoute.snapshot.queryParamMap.get('id');
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
    this.propertyService.getProperty(this.getId).subscribe((res) => {
      console.log(res.Property)
      this.updatePropForm.patchValue({
        name: res.Property.name,
        description: res.Property['description'],
        citynum: res.Property['citynum'],
        price: res.Property['price'],
        area: res.Property['area'],
        city: res.Property['city'],
        country: res.Property['country'],
        bedrooms: res.Property['bedrooms'],
        bathrooms: res.Property['bathrooms'],
        purpose: res.Property['purpose'],
        category_id: res.Property['category_id'],
        // address_id: res.Property['address_id'],
        image: res.Property.image
      })
    });
  }


  initializeForm() {
    this.updatePropForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      citynum: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      price: [null, [Validators.required, Validators.min(100000), Validators.max(100000000)]],
      // address_id: ['', Validators.required],
      category_id: ['', Validators.required],
      purpose: ['', Validators.required],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      area: [null, [Validators.required, Validators.min(20), Validators.max(5000)]],
      bedrooms: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      bathrooms: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
      image: ['']
    });
  }

  loadPropertyData() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const mock = JSON.parse(localStorage.getItem('myProperties') || '[]');
        const property = mock.find((p: any) => p.id == id);
        if (property) {
          this.updatePropForm.patchValue(property);
        }
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.updatePropForm.patchValue({ 'image': file })
    }
  }

  onSubmit() {
    console.log(this.updatePropForm.value);
    const data = { ...this.updatePropForm.value };
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == 'image' || data[key] instanceof File) {
        formData.append('image', data[key])
      }
      else {
        formData.append(key, data[key])
      }
    })
    formData.append('_method', 'PUT')
    this.submitted = true;

    if (this.updatePropForm.valid) {
      console.log(data);
      this.propertyService.updateProperty(this.getId, formData).subscribe({
        next: () => {
          console.log("updated")
          if (data.image === null || data.image === '') {
            delete data.image;
          }
          // alert('✅ The property has been updated successfully');
          this.toastMessage = 'The property has been updated successfully';
          this.toastType = 'success';
          this.showToast = true;
        },
        error: (error) => {
          console.log(error);
          this.toastMessage = 'Failed to update property. Please try again.';
          this.toastType = 'danger';
          this.showToast = true;
        }
      })
      this.submitted = false;
    } else {
      Object.values(this.updatePropForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }

  //check field validity
  isFieldInvalid(field: string): boolean {
    const control = this.updatePropForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // error messages
  getErrorMessage(field: string): string {
    const control = this.updatePropForm.get(field);

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