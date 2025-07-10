import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Seller } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';
import { OwnProperty, Root } from '../../types/seller';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  imports: [CommonModule, NgxPaginationModule],
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
  constructor(private router: Router, public propertyService: PropertyServiceService) { }

  ngOnInit(): void {
    this.propertyService.getSingleSeller().subscribe((sellerProps) => {
      this.sellerproperties = sellerProps.Seller.own_properties;

    });

  }


  deleteProp(id: number, i: number) {
    if (confirm('are u sure u wanna delete this property')) {
      return this.propertyService.delteProperty(id).subscribe(() => {
        alert('Property deleted successfully');
        this.sellerproperties.splice(i, 1);
      })
    }
    else return false;

  }
  goToEditProperty(id: number) {
    this.router.navigate(['/create-property'], { queryParams: { id } });
  }


}