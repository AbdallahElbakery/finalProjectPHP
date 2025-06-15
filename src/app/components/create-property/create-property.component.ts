import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  route: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      city: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      area: ['', Validators.required],
      image: ['']
    });

    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
    const id = params['id'];
    if (id) {
      // هنا مؤقتًا نجيب العقار من local أو mock data
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
    if (this.propertyForm.valid) {
      console.log('New Property:', this.propertyForm.value);
      alert('✅ The property has been added successfully');
      this.propertyForm.reset();
    }
  }
}
