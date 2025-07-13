import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService, BookingRequest } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {
  @Input() propertyId: number = 0;
  
  showOfferForm = false;
  offerForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  hasExistingOffer = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {
    // validate for form
    this.offerForm = this.fb.group({
      suggested_price: ['', [Validators.required, Validators.min(1)]],
    });

    // Form initialized
  }

  // Get property price for validation (you'll need to fetch this from your property data)
  getPropertyPrice(): number {
    // This should return the actual property price from your property data
    // For now, returning a default value - you should replace this with actual property price
    return 2850000; // Example property price
  }

  // Validate offer price
  validateOfferPrice(price: number): { isValid: boolean; message: string } {
    const propertyPrice = this.getPropertyPrice();
    const minPrice = propertyPrice * 0.7; // 70% of original price
    const maxPrice = propertyPrice * 1.3; // 130% of original price

    if (price < minPrice) {
      return {
        isValid: false,
        message: `Offer must be at least ${this.formatPrice(minPrice)} (70% of original price)`
      };
    }

    if (price > maxPrice) {
      return {
        isValid: false,
        message: `Offer cannot exceed ${this.formatPrice(maxPrice)} (130% of original price)`
      };
    }

    return { isValid: true, message: '' };
  }

  ngOnInit() {
    // Get property ID from route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        // this.propertyId = +params['id'];
        this.propertyId = 2;
        console.log('Property ID loaded:', this.propertyId);
      } else if (!this.propertyId) {
        // Fallback to default if no ID provided
        this.propertyId = 2;
        console.log('Using default Property ID:', this.propertyId);
      }
      
      // Check if user already has an offer for this property
      this.checkExistingOffer();
    });
  }

  // Check if user already has an offer for this property
  private checkExistingOffer() {
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        const existingBooking = bookings.find(booking => 
          booking.property_id === this.propertyId
        );
        this.hasExistingOffer = !!existingBooking;
      },
      error: (error) => {
        console.error('Error checking existing offers:', error);
      }
    });
  }

  ngAfterViewInit() {
    // Component initialized
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
      
      // Get the price value and remove commas for API
      let priceValue = this.offerForm.value.suggested_price;
      if (typeof priceValue === 'string') {
        priceValue = parseInt(priceValue.replace(/,/g, ''));
      }
      
      // Validate the offer price
      const validation = this.validateOfferPrice(priceValue);
      if (!validation.isValid) {
        this.submitSuccess = false;
        this.submitMessage = validation.message;
        this.showToast(validation.message, false);
        this.isSubmitting = false;
        return;
      }
      
      const bookingData: BookingRequest = {
        property_id: this.propertyId,
        suggested_price: priceValue
      };

      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = response.message || 'Your offer has been sent successfully! We will contact you soon.';
          this.showToast(this.submitMessage, true);
          this.resetForm();
          this.showOfferForm = false;
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = error.message || 'An error occurred while sending your offer. Please try again.';
          this.showToast(this.submitMessage, false);
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
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  // Format price input while typing
  formatPriceInput(event: any) {
    const input = event.target;
    let value = input.value.replace(/[^\d]/g, ''); // Remove non-digits
    
    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        const formattedValue = numValue.toLocaleString('en-US');
        input.value = formattedValue;
        
        // Update form control
        this.offerForm.patchValue({
          suggested_price: formattedValue
        }, { emitEvent: false });
      }
    }
  }



  // Close toast notification
  closeToast() {
    const toastElement = document.getElementById('offerToast');
    if (toastElement) {
      toastElement.classList.remove('show');
      setTimeout(() => {
        toastElement.style.display = 'none';
      }, 300);
    }
  }

  // Show toast notification
  private showToast(message: string, isSuccess: boolean = true) {
    const toastElement = document.getElementById('offerToast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toastElement?.querySelector('.toast-header i');
    
    if (toastElement && toastMessage && toastIcon) {
      // Update message
      toastMessage.textContent = message;
      
      // Update icon and styling
      if (isSuccess) {
        toastIcon.className = 'fas fa-check-circle text-success me-2';
        toastElement.classList.remove('bg-danger', 'text-white');
        toastElement.classList.add('bg-success', 'text-white');
      } else {
        toastIcon.className = 'fas fa-exclamation-circle text-danger me-2';
        toastElement.classList.remove('bg-success', 'text-white');
        toastElement.classList.add('bg-danger', 'text-white');
      }
      
      // Show toast
      toastElement.classList.add('show');
      toastElement.style.display = 'block';
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        toastElement.classList.remove('show');
        setTimeout(() => {
          toastElement.style.display = 'none';
        }, 300);
      }, 5000);
    }
  }
}
