import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Seller } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';
import { OwnProperty, Root } from '../../types/seller';
import { NotificationComponent } from '../notification';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  imports: [CommonModule, NgxPaginationModule, NotificationComponent],
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit {

  currentPage = 1;
  itemsPerPage = 8;
  // properties = [
  //   {
  //     id: 1,
  //     title: 'Luxury Apartment in Maadi',
  //     city: 'Cairo',
  //     price: 950000,
  //     image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: 150
  //   },
  //   {
  //     id: 2,
  //     title: 'Elegant Villa in Sheikh Zayed',
  //     city: 'Giza',
  //     price: 2400000,
  //     image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  //     bedrooms: 5,
  //     bathrooms: 3,
  //     area: 400
  //   }
  // ];
  sellerproperties: OwnProperty[] = [];
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' | 'info' | 'warning' = 'success';
  showDeleteModal = false;
  propertyToDelete: { id: number, index: number } | null = null;
  constructor(private router: Router, public propertyService: PropertyServiceService) { }

  ngOnInit(): void {

    this.propertyService.getSingleSeller().subscribe((sellerProps) => {
      this.sellerproperties = sellerProps.Seller.own_properties;
    });

  }

  openDeleteModal(id: number, i: number) {
    this.propertyToDelete = { id, index: i };
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.propertyToDelete) return;
    const { id, index } = this.propertyToDelete;
    this.propertyService.delteProperty(id).subscribe({
      next: () => {
        this.toastMessage = 'Property deleted successfully';
        this.toastType = 'success';
        this.showToast = true;
        this.sellerproperties.splice(index, 1);
        this.showDeleteModal = false;
        this.propertyToDelete = null;
      },
      error: () => {
        this.toastMessage = 'Failed to delete property. Please try again.';
        this.toastType = 'danger';
        this.showToast = true;
        this.showDeleteModal = false;
        this.propertyToDelete = null;
      }
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.propertyToDelete = null;
  }

  goToEditProperty(id: number) {
    this.router.navigate(['/edit-property'], { queryParams: { id } });
  }


}