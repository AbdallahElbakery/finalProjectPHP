import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-property-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {
  @Input() property: any;

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
    console.log('View property details for ID:', propertyId);
  }
}