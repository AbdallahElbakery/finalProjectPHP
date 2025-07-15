import { Component, OnInit } from '@angular/core';
import { Property } from '../../interfaces/property';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Router } from '@angular/router';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-seller-bookings',
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './seller-bookings.component.html',
  styleUrl: './seller-bookings.component.css'
})
export class SellerBookingsComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 4;
  bookings: Booking[] = [];
  loading = true;
  error = '';
  
  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit() {
    this.loadSellerBookings();
  }

  loadSellerBookings() {
    this.loading = true;
    this.error = '';
    
    this.bookingService.getSellerBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
        console.log('Seller bookings loaded:', bookings);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error loading seller bookings:', error);
      }
    });
  }



  showToast(title: string, message: string, type: 'success' | 'error' | 'info') {
    // Create toast element
    const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
    
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>${title}:</strong> ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Show the toast
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
      
      // Remove toast element after it's hidden
      toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
      });
    }
  }

  createToastContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
  }

  // Modal handling methods
  private selectedBookingId: number | null = null;

  confirmBooking(bookingId: number) {
    this.selectedBookingId = bookingId;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmBookingModal'));
    modal.show();
  }

  cancelBooking(bookingId: number) {
    this.selectedBookingId = bookingId;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('cancelBookingModal'));
    modal.show();
  }

  confirmBookingAction() {
    if (this.selectedBookingId) {
      this.bookingService.confirmBooking(this.selectedBookingId).subscribe({
        next: (response) => {
          this.showToast('Success', response.message || 'Booking confirmed successfully!', 'success');
          this.loadSellerBookings();
          // Close modal
          const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('confirmBookingModal'));
          modal?.hide();
        },
        error: (error) => {
          this.showToast('Error', error.message || 'Error confirming booking', 'error');
        }
      });
    }
  }

  cancelBookingAction() {
    if (this.selectedBookingId) {
      this.bookingService.cancelBooking(this.selectedBookingId).subscribe({
        next: (response) => {
          this.showToast('Success', response.message || 'Booking cancelled successfully!', 'success');
          this.loadSellerBookings();
          // Close modal
          const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('cancelBookingModal'));
          modal?.hide();
        },
        error: (error) => {
          this.showToast('Error', error.message || 'Error cancelling booking', 'error');
        }
      });
    }
  }

  navigateToProperty(propertyId: number | undefined) {
    if (propertyId) {
      this.router.navigate(['/property-details', propertyId]);
    }
  }

  getUserPhotoUrl(photo: string): string {
    return photo ? `http://127.0.0.1:8000/uploads/${photo}` : 'assets/images/default-user.jpg';
  }

  getPropertyImageUrl(image: string | undefined): string {
    return image ? `http://127.0.0.1:8000/uploads/${image}` : 'assets/images/default-property.jpg';
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

  // Mock data for fallback (remove this later)
  properties: Property[] = [
    {
      "id": 2,
      "title": "Spacious Villa ",
      "price": 850000,
      "location": "Sheikh Zayed, Giza",
      "city": "Giza",
      "type": "Villa",
      "status": "pending",
      "purpose": "sale",
      "bedrooms": 5,
      "bathrooms": 4,
      "area": 300,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Luxurious villa in Sheikh Zayed with a large garden and private pool, perfect for families.",
      "date": "2024-02-10",
      "seller": {
        "id": 2,
        "name": "Fatima Ali",
        "company": "Elite Properties",
        "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        "rating": 4.9
      },
      "gallery": [],
      "attributes": {
        "pool": true,
        "garage": true
      }
    },
    {
      "id": 3,
      "title": "Cozy Studio in Zamalek",
      "price": 200000,
      "location": "Zamalek, Cairo",
      "city": "Cairo",
      "type": "Studio",
      "purpose": "rent",
      "status": "pending",
      "bedrooms": 1,
      "bathrooms": 1,
      "area": 60,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Charming studio in the vibrant Zamalek area, ideal for singles or young professionals.",
      "date": "2024-03-05",
      "seller": {
        "id": 3,
        "name": "Omar Khaled",
        "company": "City Homes",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        "rating": 4.5
      },
      "gallery": [],
      "attributes": {
        "furnished": true
      }
    },
    {
      "id": 4,
      "title": "Beachfront Apartment in Alex",
      "price": 350000,
      "purpose": "sale",
      "status": "confirmed",
      "location": "Miami, Alexandria",
      "city": "Alexandria",
      "type": "Apartment",
      "bedrooms": 2,
      "bathrooms": 2,
      "area": 100,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Stunning apartment with direct sea views in Alexandria, close to amenities.",
      "date": "2024-04-20",
      "seller": {
        "id": 4,
        "name": "Sara Mahmoud",
        "company": "Coastal Realty",
        "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
        "rating": 4.7
      },
      "gallery": [],
      "attributes": {
        "sea_view": true
      }
    },
    {
      "id": 5,
      "title": "Modern Townhouse in 6th of October",
      "price": 600000,
      "location": "6th of October, Giza",
      "city": "Giza",
      "purpose": "sale",
      "status": "confirmed",
      "type": "Townhouse",
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 220,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Elegant townhouse with modern design and spacious interiors in a gated community.",
      "date": "2024-05-12",
      "seller": {
        "id": 5,
        "name": "Youssef Amr",
        "company": "Urban Living",
        "image": "https://images.unsplash.com/photo-1525874684015-8f21a2e4e676?w=100",
        "rating": 4.6
      },
      "gallery": [],
      "attributes": {
        "gated_community": true
      }
    },
    {
      "id": 6,
      "title": "Penthouse in Maadi",
      "price": 700000,
      "location": "Maadi, Cairo",
      "city": "Cairo",
      "type": "Penthouse",
      "bedrooms": 4,
      "purpose": "sale",
      "status": "confirmed",
      "bathrooms": 3,
      "area": 250,
      "image": "https://images.unsplash.com/photo-1572120361630-6f2b09e21b2e?w=400",
      "description": "Luxury penthouse with rooftop terrace and panoramic views in Maadi.",
      "date": "2024-06-01",
      "seller": {
        "id": 6,
        "name": "Laila Mostafa",
        "company": "Skyline Realty",
        "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
        "rating": 4.9
      },
      "gallery": [],
      "attributes": {
        "rooftop": true
      }
    },
    {
      "id": 7,
      "title": "Duplex in Nasr City",
      "price": 400000,
      "location": "Nasr City, Cairo",
      "city": "Cairo",
      "purpose": "sale",
      "status": "cancelled",
      "type": "Duplex",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 180,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Spacious duplex in Nasr City with modern amenities and close to shopping centers.",
      "date": "2024-07-10",
      "seller": {
        "id": 7,
        "name": "Khaled Omar",
        "company": "Metro Properties",
        "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        "rating": 4.4
      },
      "gallery": [],
      "attributes": {
        "parking": true
      }
    },
    {
      "id": 8,
      "title": "Seafront Villa in Hurghada",
      "price": 950000,
      "location": "Sahl Hasheesh, Hurghada",
      "city": "Hurghada",
      "purpose": "rent",
      "status": "cancelled",
      "type": "Villa",
      "bedrooms": 6,
      "bathrooms": 5,
      "area": 400,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Luxurious seafront villa with private beach access in Hurghada.",
      "date": "2024-08-15",
      "seller": {
        "id": 8,
        "name": "Nadia Salem",
        "company": "Red Sea Homes",
        "image": "https://images.unsplash.com/photo-1517841902194-8a4e2e4a6e6b?w=100",
        "rating": 4.8
      },
      "gallery": [],
      "attributes": {
        "private_beach": true,
        "pool": true
      }
    },
    {
      "id": 9,
      "title": "Apartment in Heliopolis",
      "price": 320000,
      "location": "Heliopolis, Cairo",
      "city": "Cairo",
      "type": "Apartment",
      "status": "pending",
      "purpose": "rent",
      "bedrooms": 2,
      "bathrooms": 1,
      "area": 90,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Modern apartment in the heart of Heliopolis, close to schools and malls.",
      "date": "2024-09-01",
      "seller": {
        "id": 9,
        "name": "Mohamed Tarek",
        "company": "Sunrise Realty",
        "image": "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100",
        "rating": 4.5
      },
      "gallery": [],
      "attributes": {
        "near_schools": true
      }
    },
    {
      "id": 10,
      "title": "Chalet in Ain Sokhna",
      "price": 280000,
      "location": "Ain Sokhna, Suez",
      "city": "Suez",
      "type": "Chalet",
      "purpose": "rent",
      "status": "confirmed",
      "bedrooms": 2,
      "bathrooms": 1,
      "area": 85,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Cozy chalet with sea views in Ain Sokhna, perfect for vacation homes.",
      "date": "2024-10-10",
      "seller": {
        "id": 10,
        "name": "Hana Ezz",
        "company": "Beachfront Realty",
        "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        "rating": 4.7
      },
      "gallery": [],
      "attributes": {
        "sea_view": true
      }
    },
    {
      "id": 11,
      "title": "Luxury Apartment in Madinaty",
      "price": 500000,
      "location": "Madinaty, Cairo",
      "city": "Cairo",
      "purpose": "rent",
      "type": "Apartment",
      "status": "pending",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 140,
      "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
      "description": "Premium apartment in Madinaty with access to exclusive community amenities.",
      "date": "2024-11-05",
      "seller": {
        "id": 11,
        "name": "Amr Salem",
        "company": "Madinaty Homes",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        "rating": 4.6
      },
      "gallery": [],
      "attributes": {
        "gated_community": true,
        "clubhouse": true
      }
    },
    {
      "id": 12,
      "title": "Family Villa in Rehab City",
      "price": 750000,
      "location": "Rehab City, Cairo",
      "city": "Cairo",
      "type": "Villa",
      "purpose": "rent",
      "status": "confirmed",
      "bedrooms": 5,
      "bathrooms": 4,
      "area": 320,
      "image": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
      "description": "Spacious villa in Rehab City with modern design and large garden.",
      "date": "2024-12-01",
      "seller": {
        "id": 12,
        "name": "Rania Mostafa",
        "company": "Green Homes",
        "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
        "rating": 4.8
      },
      "gallery": [],
      "attributes": {
        "garden": true,
        "parking": true
      }
    },
  ]

  reject(id: number) {
    this.properties = this.properties.filter(p => p.id !== id)
  }
}
