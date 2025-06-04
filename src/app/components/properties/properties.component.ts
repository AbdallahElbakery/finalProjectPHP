import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  properties = [
    {
      id: 1,
      title: 'Luxury Downtown Apartment',
      price: 450000,
      location: 'New Cairo, Cairo',
      city: 'Cairo',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      description: 'Beautiful modern apartment in the heart of New Cairo with stunning city views and premium finishes.',
      date: '2024-01-15',
      seller: {
        id: 1,
        name: 'Ahmed Hassan',
        company: 'Prime Real Estate',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        rating: 4.8
      },
      gallery: [],
      attributes: {}
    },
    {
      id: 2,
      title: 'Seaside Villa with Pool',
      price: 850000,
      location: 'Marina, Alexandria',
      city: 'Alexandria',
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      description: 'Stunning beachfront villa with private pool and direct sea access.',
      date: '2024-01-12',
      seller: {
        id: 2,
        name: 'Sara Mohamed',
        company: 'Coastal Properties',
        image: 'https://static.wikia.nocookie.net/disneychannel/images/3/3d/Sara_Paxton.jpg/revision/latest?cb=20231221160242',
        rating: 4.9
      },
      gallery: [],
      attributes: {}
    },
    {
      id: 3,
      title: 'Modern Studio in Zamalek',
      price: 180000,
      location: 'Zamalek, Cairo',
      city: 'Cairo',
      type: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      description: 'Cozy modern studio apartment in prestigious Zamalek district. Perfect for young professionals with easy access to cafes, restaurants, and transportation.',
      date: '2024-01-10',
      seller: {
        id: 3,
        name: 'Mohamed Ali',
        company: 'Urban Living',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 4.6
      },
      gallery: [],
      attributes: {}
    },
    {
      id: 4,
      title: 'Family House in Maadi',
      price: 620000,
      location: 'Maadi, Cairo',
      city: 'Cairo',
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
      description: 'Spacious family house in quiet Maadi neighborhood with large garden and modern amenities. Great for families seeking comfort and tranquility.',
      date: '2024-01-08',
      seller: {
        id: 4,
        name: 'Fatma Ahmed',
        company: 'Family Homes',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        rating: 4.7
      },
      gallery: [],
      attributes: {}
    },
    {
      id: 5,
      title: 'Luxury Penthouse with Terrace',
      price: 1200000,
      location: 'Sheikh Zayed, Giza',
      city: 'Giza',
      type: 'Penthouse',
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      description: 'Exclusive penthouse with panoramic city views and private terrace. Features premium finishes, smart home technology, and luxury amenities.',
      date: '2024-01-05',
      seller: {
        id: 5,
        name: 'Omar Mahmoud',
        company: 'Luxury Living',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        rating: 4.9
      },
      gallery: [],
      attributes: {}
    },
    {
      id: 6,
      title: 'Cozy Duplex in Heliopolis',
      price: 380000,
      location: 'Heliopolis, Cairo',
      city: 'Cairo',
      type: 'Duplex',
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
      description: 'Charming duplex in historic Heliopolis with classic architecture and modern updates. Perfect blend of traditional and contemporary living.',
      date: '2024-01-03',
      seller: {
        id: 6,
        name: 'Nour Hassan',
        company: 'Heritage Properties',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Dubai_Future_Forum_2024_-_Sara_Sabry.jpg',
        rating: 4.5
      },
      gallery: [],
      attributes: {}
    }
  ];
}