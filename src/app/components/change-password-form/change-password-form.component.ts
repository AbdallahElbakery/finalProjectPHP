import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-form',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent implements OnInit {
 passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('✅ Password updated:', this.passwordForm.value);
      // هنا تبعت الـ API لتحديث كلمة المرور

      // توجيه بعد الحفظ
      this.router.navigate(['/home']);
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}
