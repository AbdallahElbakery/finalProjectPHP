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
  ) {}


  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      // style: 'currency',
      // currency: 'USD',
      // minimumFractionDigits: 0
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
    const suggestedPrice = prompt('أدخل السعر المقترح للحجز:');
    if (suggestedPrice && !isNaN(Number(suggestedPrice)) && Number(suggestedPrice) > 0) {
      this.bookingService.createBooking({
        property_id: propertyId,
        suggested_price: Number(suggestedPrice)
      }).subscribe({
        next: (response) => {
          alert('تم إرسال طلب الحجز بنجاح!');
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          alert('حدث خطأ أثناء إرسال طلب الحجز');
        }
      });
    }
  }

}

// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { BookingService } from '../../services/booking.service';

// @Component({
//   selector: 'app-property-card',
//   imports: [CommonModule, RouterModule],
//   templateUrl: './property-card.component.html',
//   styleUrl: './property-card.component.css'
// })
// export class PropertyCardComponent {
//   @Input() property: any;

//   constructor(
//     private router: Router,
//     private bookingService: BookingService
//   ) {}


//   formatPrice(price: number): string {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(price);
//   }

//   truncateDescription(description: string, maxLength: number = 50): string {
//     if (description.length <= maxLength) return description;
//     return description.substr(0, maxLength) + '...';
//   }

//   viewPropertyDetails(propertyId: number) {
//     this.router.navigate(['/property-details', propertyId]);
//   }

//   // Validate offer price
//   validateOfferPrice(price: number, propertyPrice: number): { isValid: boolean; message: string } {
//     const minPrice = propertyPrice * 0.7; // 70% of original price
//     const maxPrice = propertyPrice * 1.3; // 130% of original price

//     if (price < minPrice) {
//       return {
//         isValid: false,
//         message: `Offer must be at least ${this.formatPrice(minPrice)} (70% of original price)`
//       };
//     }

//     if (price > maxPrice) {
//       return {
//         isValid: false,
//         message: `Offer cannot exceed ${this.formatPrice(maxPrice)} (130% of original price)`
//       };
//     }

//     return { isValid: true, message: '' };
//   }

//   bookProperty(propertyId: number) {
//     const suggestedPrice = prompt('Enter your suggested price for booking:');
//     if (suggestedPrice && !isNaN(Number(suggestedPrice)) && Number(suggestedPrice) > 0) {
//       // Validate the offer price if property price is available
//       if (this.property?.price) {
//         const validation = this.validateOfferPrice(Number(suggestedPrice), this.property.price);
//         if (!validation.isValid) {
//           alert(validation.message);
//           return;
//         }
//       }

//       this.bookingService.createBooking({
//         property_id: propertyId,
//         suggested_price: Number(suggestedPrice)
//       }).subscribe({
//         next: (response) => {
//           alert(response.message || 'Booking request sent successfully!');
//         },
//         error: (error) => {
//           console.error('Error creating booking:', error);
//           alert(error.message || 'An error occurred while sending the booking request');
//         }
//       });
//     }
//   }

// }
