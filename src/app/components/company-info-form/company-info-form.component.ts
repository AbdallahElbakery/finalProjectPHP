import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  templateUrl: './company-info-form.component.html',
  styleUrl: './company-info-form.component.css'
})
export class CompanyInfoFormComponent implements OnInit {
  profileForm!: FormGroup;
     options = [
    'Cairo',
    'Giza',
    'Alexandria',
    'Aswan',
    'Luxor',
    'Hurghada',
    'Sharm El Sheikh',
    '6 October',
  ];

  // العناصر المختارة
  selectedOptions: string[] = [];

  // لعرض/إخفاء القائمة
  showDropdown = false;
registerForm: any;

  // إضافة/إزالة عنصر من المحدد
  toggleSelection(option: string) {
  const index = this.selectedOptions.indexOf(option);
  if (index === -1) {
    this.selectedOptions.push(option);
  } else {
    this.selectedOptions.splice(index, 1);
  }

  // ✅ تحديث القيمة في الفورم
  this.profileForm.get('locations')?.setValue(this.selectedOptions);
  this.profileForm.get('locations')?.markAsTouched();
}

  // التحقق إذا كان العنصر محدد
  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }


  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      picture: [''],
      companyName: ['', Validators.required],
      locations: [[], Validators.required], // استخدم 'locations' لأن removeLocation تعتمد عليه
      about: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.patchValue({ picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeLocation(location: string) {
    const currentLocations = this.profileForm.get('locations')?.value || [];
    const updatedLocations = currentLocations.filter((loc: string) => loc !== location);
    this.profileForm.get('locations')?.setValue(updatedLocations);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('✅ Saved:', this.profileForm.value);
      // send data to API here

      this.router.navigate(['/home']); // ✅ يوجهك للصفحة الرئيسية بعد الحفظ
    } else {
      this.profileForm.markAllAsTouched(); // يظهر الأخطاء لو فيه
    }
  }
}
