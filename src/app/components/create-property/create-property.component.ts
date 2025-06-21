import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    this.initializeForm();
    this.loadPropertyData();
  }

  initializeForm() {
    this.propertyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(100000), Validators.max(100000000)]],
      city: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      purpose: ['', Validators.required],
      area: [null, [Validators.required, Validators.min(20), Validators.max(5000)]],
      bedrooms: [null, [Validators.required, Validators.min(1), Validators.max(20)]],
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
          this.propertyForm.patchValue(property);
        }
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.propertyForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.propertyForm.valid) {
      console.log('New Property:', this.propertyForm.value);
      alert('✅ The property has been added successfully');
      this.propertyForm.reset();
      this.submitted = false;
    } else {
      // Mark all fields as touched to show validation messages
      Object.values(this.propertyForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  // Helper method to check field validity
  isFieldInvalid(field: string): boolean {
    const control = this.propertyForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  // Helper method to get error message
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