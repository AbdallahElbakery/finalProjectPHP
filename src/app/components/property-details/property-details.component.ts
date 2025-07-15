import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingService, BookingRequest } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-property-details',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
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
        }
      });
    } else {
      this.fetchProperty();
    }
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