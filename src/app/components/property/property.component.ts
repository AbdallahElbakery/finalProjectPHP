import { Component, OnInit } from '@angular/core';
import { Property } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-property',
  imports: [],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent implements OnInit {
  // properties: Property[] = [
  //   {
  //     id: 1,
  //     title: 'Luxury Downtown Apartment',
  //     price: 450000,
  //     location: 'New Cairo, Cairo',
  //     city: 'Cairo',
  //     type: 'Apartment',
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     area: 120,
  //     image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
  //     description: 'Beautiful modern apartment in the heart of New Cairo with stunning city views and premium finishes.',
  //     date: '2024-01-15',
  //     seller: {
  //       id: 1,
  //       name: 'Ahmed Hassan',
  //       company: 'Prime Real Estate',
  //       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  //       rating: 4.8
  //     },
  //     gallery: [],
  //     attributes: {}
  //   },
  //   {
  //     id: 2,
  //     title: 'Seaside Villa with Pool',
  //     price: 850000,
  //     location: 'Marina, Alexandria',
  //     city: 'Alexandria',
  //     type: 'Villa',
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     area: 250,
  //     image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
  //     description: 'Stunning beachfront villa with private pool and direct sea access.',
  //     date: '2024-01-12',
  //     seller: {
  //       id: 2,
  //       name: 'Sara Mohamed',
  //       company: 'Coastal Properties',
  //       image: 'https://static.wikia.nocookie.net/disneychannel/images/3/3d/Sara_Paxton.jpg/revision/latest?cb=20231221160242',
  //       rating: 4.9
  //     },
  //     gallery: [],
  //     attributes: {}
  //   },
  //   {
  //     id: 3,
  //     title: 'Modern Studio in Zamalek',
  //     price: 180000,
  //     location: 'Zamalek, Cairo',
  //     city: 'Cairo',
  //     type: 'Studio',
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     area: 45,
  //     image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
  //     description: 'Cozy modern studio apartment in prestigious Zamalek district. Perfect for young professionals with easy access ...',
  //     date: '2024-01-10',
  //     seller: {
  //       id: 3,
  //       name: 'Mohamed Ali',
  //       company: 'Urban Living',
  //       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  //       rating: 4.6
  //     },
  //     gallery: [],
  //     attributes: {}
  //   }
  // ];

  properties: Property[] = [];

  constructor(private propertyService: PropertyServiceService) { }

  ngOnInit(): void {
    console.log("ok");
    this.propertyService.getProperties().subscribe((data) => {
      this.properties = data.slice(0, 3);
      console.log(data);
    })


  }

}
