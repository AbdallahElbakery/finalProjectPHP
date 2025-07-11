// seller-profile.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyCardComponent } from "../property-card/property-card.component";

@Component({
  selector: 'app-seller-profile',
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {
property: any;
viewPropertyDetails(arg0: any) {
throw new Error('Method not implemented.');
}
  constructor(private router: Router) {}

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

    listBookings() {
    this.router.navigate(['/seller-bookings']);
  }
    listProperty() {
    this.router.navigate(['/my-properties']);
  }
    addProperty() {
    this.router.navigate(['/create-property']);
  }

openAddReviewModal() {
throw new Error('Method not implemented.');
}

toggleFavorite(_t33: { title: string; city: string; price: number; image: string; bedrooms: number; bathrooms: number; area: number; isFavorite: boolean; }) {
throw new Error('Method not implemented.');
}
viewDetails(_t33: { title: string; city: string; price: number; image: string; bedrooms: number; bathrooms: number; area: number; isFavorite: boolean; }) {
throw new Error('Method not implemented.');
}

  goToMyReviews() {
    // غير المسار حسب اسم صفحة الريفيوهات عندك
    this.router.navigate(['/reviews']);
  }

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
  ];

  reviews = [
  {
    username: 'Mohamed Ahmed',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-298Da-Ky_ssBh7kph8vGdKxamW5Bsfakxw&s',
    rating: 4,
    date: new Date('2025-05-15'),
    comment: 'Excellent service and the property description was accurate.'
  },
  {
    username: 'Sara Ali',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs8LkRSWmwwNSPhihu9mU8yNRBlptghMu_gw&s',
    rating: 5,
    date: new Date('2025-06-01'),
    comment: 'The best real estate broker I have ever dealt with.'
  },
  {
    username: 'Ahmed Hassan',
    userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9XWVeFGveLD_O9SToBut3McpGBG6q1To9g&s',
    rating: 3,
    date: new Date('2025-06-10'),
    comment: 'Good experience but there is some delay'
  }
  // يمكن إضافة المزيد
];

// دالة للحصول على النجوم المملوءة
getStars(rating: number): any[] {
  return Array(Math.floor(rating)).fill(0);
}

// دالة للحصول على النجوم الفارغة
getEmptyStars(rating: number): any[] {
  return Array(5 - Math.floor(rating)).fill(0);
}


  ngOnInit(): void {}
}
