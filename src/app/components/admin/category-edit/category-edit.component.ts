import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { PropertyServiceService } from '../../../services/property-service.service';

@Component({
  selector: 'app-category-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
  submitted = false;
  editForm!: FormGroup;
  getId: any;
  // private fb = inject(FormBuilder);

  constructor(
    private adminService: AdminServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }



  ngOnInit() {
    this.initalizeForm()
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getSingleCategory(this.getId).subscribe((res) => {
      console.log(res.category)
      this.editForm.patchValue({
        category_name: res.category.category_name
      })
    })
  }
  isFieldInvalid(field: string): boolean {
    const control = this.editForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
  }
  initalizeForm() {
    this.editForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    })
  }

  // error messages
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
    return 'Invalid value';
  }

  onSubmit() {
    const data = { ...this.editForm.value }
    console.log(data)
    console.log(this.getId)
    this.adminService.editCategory(this.getId, data).subscribe((res) => {
      console.log('edited', res)
      alert('edited successfully')
      this.router.navigate(['/admin/categories'])
    })
  }
}
