import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PropertyServiceService } from '../../../services/property-service.service';
import { AdminServiceService } from '../../../services/admin-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-add',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent {
  submitted = false;
  addForm!: FormGroup;
  // private fb = inject(FormBuilder);

  constructor(
    private adminService: AdminServiceService,
    private propertyService: PropertyServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }



  ngOnInit() {
    this.initalizeForm()

    this.addForm = this.fb.group({
      category_name: ['']
    })
  }
  isFieldInvalid(field: string): boolean {
    const control = this.addForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }
  initalizeForm() {
    this.addForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    })
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
    return 'Invalid value';
  }

  onSubmit() {
    const data = { ...this.addForm.value }
    this.adminService.addCategory(data).subscribe((res) => {
      console.log('added', res)
      alert('added successfully')
      this.router.navigate(['/admin/categories'])
    })
  }
}

