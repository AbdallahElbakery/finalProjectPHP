import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() property: any;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) { }


  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
    }).format(price);
  }

  truncateDescription(description: string, maxLength: number = 50): string {
    if (description.length <= maxLength) return description;
    return description.substr(0, maxLength) + '...';
  }

  viewPropertyDetails(propertyId: number) {
    this.router.navigate(['/property', propertyId]);
  }

  bookProperty(propertyId: number) {
    const suggestedPrice = prompt('Enter ur offer price');
    if (suggestedPrice && !isNaN(Number(suggestedPrice)) && Number(suggestedPrice) > 0) {
      this.bookingService.createBooking({
        property_id: propertyId,
        suggested_price: Number(suggestedPrice)
      }).subscribe({
        next: (response) => {
          alert('Booking offer has been sent successfully');
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          alert('Error Occured while sending bokking offer!');
        }
      });
    }
  }

}
