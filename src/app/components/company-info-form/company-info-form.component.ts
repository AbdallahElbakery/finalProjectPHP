import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-company-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private propertyService: PropertyServiceService) {
    this.propertyService.getComapnyDetails().subscribe((res) => {
      this.profileForm.setValue({
        company_name: res['company_name'],
        logo: res['logo'],
        about_company: res['about_company'],
      })
    })
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      picture: [''],
      company_name: ['', Validators.required],
      locations: [[], Validators.required], // استخدم 'locations' لأن removeLocation تعتمد عليه
      about_company: ['', Validators.required],
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
    const data = { ... this.profileForm.value }
    if (this.profileForm.valid) {
      if (data.logo == null || data.logo == '') {
        delete data.logo;
      }
      this.propertyService.updateCompanyDetails(data).subscribe(() => {
        console.log('✅ Saved:', this.profileForm.value);
        alert('✅ Company details updated')
        this.router.navigate(['/edit-profile']);
      })
    } else {
      this.profileForm.markAllAsTouched(); 
    }
  }
}
