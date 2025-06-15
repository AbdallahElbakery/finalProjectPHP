import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyCardComponent } from "../property-card/property-card.component";

@Component({
  selector: 'app-user-seller-profile',
  imports: [CommonModule, ReactiveFormsModule, PropertyCardComponent],
  templateUrl: './user-seller-profile.component.html',
  styleUrl: './user-seller-profile.component.css'
})
export class UserSellerProfileComponent {
router : any;
  reviewForm: any;
  showSuccessMessage: boolean | undefined;
  showReviewForm: boolean | undefined;
openAddReviewModal() {
throw new Error('Method not implemented.');
}


toggleFavorite(_t33: { title: string; city: string; price: number; image: string; bedrooms: number; bathrooms: number; area: number; isFavorite: boolean; }) {
throw new Error('Method not implemented.');
}
viewDetails(_t33: { title: string; city: string; price: number; image: string; bedrooms: number; bathrooms: number; area: number; isFavorite: boolean; }) {
throw new Error('Method not implemented.');
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

getStars(rating: number): any[] {
  return Array(Math.floor(rating)).fill(0);
}

// دالة للحصول على النجوم الفارغة
getEmptyStars(rating: number): any[] {
  return Array(5 - Math.floor(rating)).fill(0);
}

constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  addReview() {
    if (this.reviewForm.valid) {
      // هنا يمكنك إرسال البيانات لخادم API
      const newReview = {
        username: 'Anonymous', // يمكنك استبدالها باسم المستخدم الحقيقي إذا كان متاحًا
        userImage: 'https://via.placeholder.com/40', // يمكنك استبدالها بصورة المستخدم الحقيقية إذا كانت متاحة
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment,
        date: new Date()
      };
      
      this.reviews.push(newReview);
      this.showSuccessMessage = true;
      this.reviewForm.reset();
      this.showReviewForm = false;
      
      // إخفاء رسالة النجاح بعد 3 ثواني
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }
  }

  ngOnInit(): void {}
}


