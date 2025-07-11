import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-user-bookings',
  imports: [CommonModule],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  error = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
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

  deleteBooking(bookingId: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
          alert('Error deleting booking');
        }
      });
    }
  }

  editBooking(booking: Booking) {
    const newPrice = prompt('Enter new price:', booking.suggested_price.toString());
    if (newPrice && !isNaN(Number(newPrice)) && Number(newPrice) > 0) {
      this.bookingService.updateBooking(booking.id!, { suggested_price: Number(newPrice) }).subscribe({
        next: (updatedBooking) => {
          const index = this.bookings.findIndex(b => b.id === booking.id);
          if (index !== -1) {
            this.bookings[index] = updatedBooking;
          }
        },
        error: (error) => {
          console.error('Error updating booking:', error);
          alert('Error updating booking');
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'cancelled':
        return 'status-cancelled';
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
      default:
        return 'Pending';
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
