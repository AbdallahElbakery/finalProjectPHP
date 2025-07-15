import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingService, BookingRequest } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-property-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent implements OnInit {
  propertyData: any = null;
  loading = false;
  @Input() propertyId: number = 0;
  
  showOfferForm = false;
  offerForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  addressData: any = null;
  toastMessage: string = '';
  toastType: 'success' | 'danger' | '' = '';
  showToast: boolean = false;
  hasBookingForThisProperty: boolean = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    // validate for form
    this.offerForm = this.fb.group({
      suggested_price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    // Get property ID from route or input
    if (!this.propertyId) {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.propertyId = +id;
          this.fetchProperty();
          this.checkUserBooking();
          this.checkBookingSuccessMessage();
        }
      });
    } else {
      this.fetchProperty();
      this.checkUserBooking();
      this.checkBookingSuccessMessage();
    }
  }

  checkUserBooking() {
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.hasBookingForThisProperty = bookings.some((b: any) => b.property_id === this.propertyId);
      },
      error: (err) => {
        this.hasBookingForThisProperty = false;
      }
    });
  }

  fetchProperty() {
    this.loading = true;
    this.http.get<any>(`http://127.0.0.1:8000/api/properties/${this.propertyId}`).subscribe({
      next: (res) => {
        this.propertyData = res.Property;
        this.loading = false;
        if (this.propertyData && this.propertyData.address_id) {
          this.http.get<any>(`http://127.0.0.1:8000/api/addresses/${this.propertyData.address_id}`).subscribe({
            next: (addressRes) => {
              this.addressData = Array.isArray(addressRes) ? addressRes[0] : addressRes;
            },
            error: () => {
              this.addressData = null;
            }
          });
        }
      },
      error: (err) => {
        this.propertyData = null;
        this.loading = false;
      }
    });
  }

  toggleOfferForm() {
    this.showOfferForm = !this.showOfferForm;
    if (!this.showOfferForm) {
      this.resetForm();
    }
  }

  showToastWithTimeout() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  minAllowedPrice(): number {
    return this.propertyData ? Math.floor(this.propertyData.price * 0.7) : 0;
  }
  maxAllowedPrice(): number {
    return this.propertyData ? Math.ceil(this.propertyData.price * 1.3) : 0;
  }

  submitOffer() {
    if (this.offerForm.valid && !this.isSubmitting) {
      const price = this.offerForm.value.suggested_price;
      if (this.propertyData && (price < this.minAllowedPrice() || price > this.maxAllowedPrice())) {
        this.submitSuccess = false;
        this.submitMessage = `Offer must be between $${this.minAllowedPrice()} and $${this.maxAllowedPrice()}`;
        this.toastMessage = this.submitMessage;
        this.toastType = 'danger';
        this.showToastWithTimeout();
        return;
      }
      this.isSubmitting = true;
      this.submitMessage = '';
      this.showToast = false;
      const bookingData: BookingRequest = {
        property_id: this.propertyId,
        suggested_price: this.offerForm.value.suggested_price
      };
      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = 'Your offer has been sent successfully! We will contact you soon.';
          this.toastMessage = 'Your offer has been sent successfully! We will contact you soon.';
          this.toastType = 'success';
          this.showToastWithTimeout();
          this.resetForm();
          this.showOfferForm = false;
          this.isSubmitting = false;
          this.hasBookingForThisProperty = true;
          localStorage.setItem(this.bookingSuccessKey(), '1');
        },
        error: (error) => {
          this.submitSuccess = false;
          if (error.message && (error.message.includes('عرض') || error.message.includes('offer'))) {
            this.submitMessage = 'You have already made a booking for this property.';
            this.toastMessage = 'You have already made a booking for this property.';
          } else {
            this.submitMessage = 'An error occurred while sending your offer. Please try again.';
            this.toastMessage = 'An error occurred while sending your offer. Please try again.';
          }
          this.toastType = 'danger';
          this.showToastWithTimeout();
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

  bookingSuccessKey(): string {
    return `bookingSuccess_property_${this.propertyId}`;
  }

  checkBookingSuccessMessage() {
    const key = this.bookingSuccessKey();
    if (localStorage.getItem(key)) {
      this.submitSuccess = true;
      setTimeout(() => {
        this.submitSuccess = false;
        localStorage.removeItem(key);
      }, 5000);
    }
  }

  // Format price for display
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
}