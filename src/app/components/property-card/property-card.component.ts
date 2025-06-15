import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() property: any;

  constructor(private router: Router) {}


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
    this.router.navigate(['/user-bookings']);
  }

}