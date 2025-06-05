import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
  profileForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      image: ['https://example.com/profile.jpg'],
      locations: [[], Validators.required]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeLocation(location: string) {
  const currentLocations = this.profileForm.get('locations')?.value;
  const updatedLocations = currentLocations.filter((loc: string) => loc !== location);
  this.profileForm.get('locations')?.setValue(updatedLocations);
}

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('تم الحفظ:', this.profileForm.value);
      // هنا أرسل البيانات لخادم API
      this.router.navigate(['/']); // العودة للصفحة الرئيسية بعد الحفظ
    }
  }
}