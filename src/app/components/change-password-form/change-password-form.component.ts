import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-change-password-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private propertyService: PropertyServiceService) {
    this.propertyService.getPass().subscribe((res) => {
      console.log(res);
      this.passwordForm.setValue({
        current_password: '',
        newPass: '',
        confirmPassword: ''
      });

    })
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPass = form.get('newPass')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPass === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const data = { ...this.passwordForm.value }

      this.propertyService.updatePass(data).subscribe(() => {
        alert('✅ Password updated');
      })
      this.router.navigate(['/edit-profile']);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
