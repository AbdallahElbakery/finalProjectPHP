import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../services/booking.service';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-user-bookings',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent implements OnInit, AfterViewInit {
  bookings: Booking[] = [];
  loading = true;
  error = '';
  approvalLink: string = ''
  // Modal states
  showDeleteModal = false;
  showEditModal = false;
  selectedBooking: Booking | null = null;
  editForm: FormGroup;
  isSubmitting = false;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private fb: FormBuilder,
    private propertyService: PropertyServiceService
  ) {
    this.editForm = this.fb.group({
      suggested_price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loading = true;
    console.log('Loading bookings...');
    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => {
        console.log('Bookings loaded:', bookings);
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.error = 'Error loading bookings';
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    // Component initialized
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading bookings';
        this.loading = false;
        console.error('Error loading bookings:', error);
      }
    });
  }

  // Navigate to property details
  viewProperty(propertyId: number) {
    this.router.navigate(['/property-details', propertyId]);
  }

  // Show delete confirmation modal
  showDeleteConfirmation(booking: Booking) {
    this.selectedBooking = booking;
    this.showDeleteModal = true;
  }

  // Hide delete modal
  hideDeleteModal() {
    this.showDeleteModal = false;
    this.selectedBooking = null;
  }

  // Show edit modal
  showEditForm(booking: Booking) {
    this.selectedBooking = booking;
    this.editForm.patchValue({
      suggested_price: booking.suggested_price.toLocaleString('en-US')
    });
    this.showEditModal = true;
  }

  // Hide edit modal
  hideEditModal() {
    this.showEditModal = false;
    this.selectedBooking = null;
    this.editForm.reset();
  }

  // Format price input
  formatPriceInput(event: any) {
    const input = event.target;
    let value = input.value.replace(/[^\d]/g, '');

    if (value) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        const formattedValue = numValue.toLocaleString('en-US');
        input.value = formattedValue;

        this.editForm.patchValue({
          suggested_price: formattedValue
        }, { emitEvent: false });
      }
    }
  }

  // Delete booking
  deleteBooking() {
    if (!this.selectedBooking) return;

    this.isSubmitting = true;
    this.bookingService.deleteBooking(this.selectedBooking.id!).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(booking => booking.id !== this.selectedBooking!.id);
        this.hideDeleteModal();
        this.showToast('Booking deleted successfully!', true);
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error deleting booking:', error);
        this.showToast('Error deleting booking. Please try again.', false);
        this.isSubmitting = false;
      }
    });
  }

  // Validate offer price
  validateOfferPrice(price: number, propertyPrice: number): { isValid: boolean; message: string } {
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

  // Edit booking
  editBooking() {
    if (!this.selectedBooking || this.editForm.invalid) return;

    this.isSubmitting = true;
    let priceValue = this.editForm.value.suggested_price;
    if (typeof priceValue === 'string') {
      priceValue = parseInt(priceValue.replace(/,/g, ''));
    }

    // Validate the offer price if property price is available
    if (this.selectedBooking.property?.price) {
      const validation = this.validateOfferPrice(priceValue, this.selectedBooking.property.price);
      if (!validation.isValid) {
        this.showToast(validation.message, false);
        this.isSubmitting = false;
        return;
      }
    }

    this.bookingService.updateBooking(this.selectedBooking.id!, { suggested_price: priceValue }).subscribe({
      next: (updatedBooking) => {
        const index = this.bookings.findIndex(b => b.id === this.selectedBooking!.id);
        if (index !== -1) {
          this.bookings[index] = updatedBooking;
        }
        this.hideEditModal();
        this.showToast('Booking updated successfully!', true);
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error updating booking:', error);
        this.showToast('Error updating booking. Please try again.', false);
        this.isSubmitting = false;
      }
    });
  }

  // Close toast notification
  closeToast() {
    const toastElement = document.getElementById('bookingToast');
    if (toastElement) {
      toastElement.classList.remove('show');
      setTimeout(() => {
        toastElement.style.display = 'none';
      }, 300);
    }
  }

  // Show toast notification
  private showToast(message: string, isSuccess: boolean = true) {
    const toastElement = document.getElementById('bookingToast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toastElement?.querySelector('.toast-header i');

    if (toastElement && toastMessage && toastIcon) {
      toastMessage.textContent = message;

      if (isSuccess) {
        toastIcon.className = 'fas fa-check-circle text-success me-2';
        toastElement.classList.remove('bg-danger', 'text-white');
        toastElement.classList.add('bg-success', 'text-white');
      } else {
        toastIcon.className = 'fas fa-exclamation-circle text-danger me-2';
        toastElement.classList.remove('bg-success', 'text-white');
        toastElement.classList.add('bg-danger', 'text-white');
      }

      toastElement.classList.add('show');
      toastElement.style.display = 'block';

      setTimeout(() => {
        toastElement.classList.remove('show');
        setTimeout(() => {
          toastElement.style.display = 'none';
        }, 300);
      }, 5000);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'cancelled':
        return 'status-cancelled';
      case 'paid':
        return 'status-paid';
      default:
        return 'status-pending';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'cancelled':
        return 'Cancelled';
      case 'paid':
        return 'Paid';
      default:
        return 'Pending';
    }
  }

  getImageUrl(image: string): string {
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    if (image.startsWith('public/uploads/')) {
      image = image.replace('public/uploads/', '');
    }
    return 'http://127.0.0.1:8000/uploads/' + image;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }


  pay(id: number) {
    this.propertyService.getPayment(id).subscribe((res) => {
      this.approvalLink = res.approval_url;
      window.open(this.approvalLink, '_blank')
    })
  }
}
