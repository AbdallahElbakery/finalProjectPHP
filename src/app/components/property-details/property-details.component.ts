import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-property-details',
  imports: [ReactiveFormsModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent {
  showOfferForm = false;
  offerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // validate for form
    this.offerForm = this.fb.group({
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  toggleOfferForm() {
    this.showOfferForm = !this.showOfferForm;
  }

  submitOffer() {
    if (this.offerForm.valid) {
      const offerValue = this.offerForm.value.price;
      // hold price to send database 
      this.offerForm.reset();
      this.showOfferForm = false;
    }
  }
}
