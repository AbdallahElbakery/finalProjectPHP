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

  selectedOptions: string[] = [];

  showDropdown = false;
  registerForm: any;

  toggleSelection(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }

    this.profileForm.get('locations')?.setValue(this.selectedOptions);
    this.profileForm.get('locations')?.markAsTouched();
  }

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
        about_company: res['about_company'],
        logo: '',
      })
    })
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.fb.group({
      company_name: ['', Validators.required],
      locations: [[], Validators.required],
      about_company: ['', Validators.required],
      logo:['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        this.profileForm.patchValue({ 'logo': file});
    }
  }

  removeLocation(location: string) {
    const currentLocations = this.profileForm.get('locations')?.value || [];
    const updatedLocations = currentLocations.filter((loc: string) => loc !== location);
    this.profileForm.get('locations')?.setValue(updatedLocations);
  }

  onSubmit() {
    if (this.profileForm.valid) {
    
      const data = { ... this.profileForm.value }
    const formData=new FormData();
    
    Object.keys(data).forEach((key)=>{
      if(key =='logo'||data[key] instanceof File){
        formData.append('logo',data[key])
      }
      formData.append(key,data[key])
    })

    formData.append('_method','PATCH')
    console.log(this.profileForm.value)
      this.propertyService.updateCompanyDetails(formData).subscribe(() => {
        console.log('✅ Saved:', this.profileForm.value);
        alert('✅ Company details updated')
        this.router.navigate(['/edit-profile']);
      })
    } else {
      this.profileForm.markAllAsTouched(); 
    }
  }
}
