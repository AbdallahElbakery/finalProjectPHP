import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-booking-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './booking-edit.component.html',
  styleUrl: './booking-edit.component.css'
})
export class BookingEditComponent {
  editForm!: FormGroup;
  getId: any
  submitted = false
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminServiceService
  ) { }



  ngOnInit() {
    this.initalizeForm()
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')
    this.adminService.getBooking(this.getId).subscribe((res) => {
      console.log(res.booking.status)
      this.editForm.patchValue({
        status: res.booking.status
      })
    })
  }
  initalizeForm() {
    this.editForm = this.fb.group({
      status: ['', [Validators.required]],
    })
  }

  onSubmit() {
    const data = { ...this.editForm.value }
    console.log(data)
    this.adminService.editBooking(this.getId,data).subscribe((res)=>{
      alert('updated successfully')
      console.log(res)
    })
  }
  isFieldInvalid(field: string): boolean {
    const control = this.editForm.get(field);
    return !!control && control.invalid && (control.touched || this.submitted);
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
    return 'Invalid value';
  }
}
