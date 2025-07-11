import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingService, BookingRequest } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent implements OnInit {
  @Input() propertyId: number = 0;
  
  showOfferForm = false;
  offerForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    // validate for form
    this.offerForm = this.fb.group({
      suggested_price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    // Get property ID from route or input
    if (!this.propertyId) {
      // You can get it from route params or other sources
      this.propertyId = 1; // Default for demo
    }
  }

  toggleOfferForm() {
    this.showOfferForm = !this.showOfferForm;
    if (!this.showOfferForm) {
      this.resetForm();
    }
  }

  submitOffer() {
    if (this.offerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';
      
      const bookingData: BookingRequest = {
        property_id: this.propertyId,
        suggested_price: this.offerForm.value.suggested_price
      };

      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = 'تم إرسال عرضك بنجاح! سنتواصل معك قريباً.';
          this.resetForm();
          this.showOfferForm = false;
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = 'حدث خطأ أثناء إرسال العرض. يرجى المحاولة مرة أخرى.';
          this.isSubmitting = false;
          console.error('Booking error:', error);
        }
      });
    }
  }

  private resetForm() {
    this.offerForm.reset();
    this.submitMessage = '';
    this.submitSuccess = false;
  }

  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
}
