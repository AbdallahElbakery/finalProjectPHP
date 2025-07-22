import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { OwnProperty, SellerData } from '../../types/seller';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-user-seller-profile',
  imports: [CommonModule, ReactiveFormsModule, PropertyCardComponent, RouterModule],
  templateUrl: './user-seller-profile.component.html',
  styleUrl: './user-seller-profile.component.css'
})
export class UserSellerProfileComponent implements OnInit {
  router: any;
  reviewForm: any;
  showSuccessMessage: boolean = false;
  showReviewForm: boolean = false;
  reviews: any[] = [];
  sellerId: number = 20; // يمكن تغييرها حسب البائع المعروض
  sellerData: SellerData[] = [];
  sellerproperties: any;
  getId: any

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService,
    private propertyService: PropertyServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadReviews();
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')

    this.propertyService.viewSellerbyUser(this.getId).subscribe((seller) => {
      this.sellerData = seller.Seller.seller_data;
    });


    this.propertyService.getSellerProperties(this.getId).subscribe((sellerprops) => {
      console.log(sellerprops)
      this.sellerproperties = sellerprops.Property;
    })
  }

  loadReviews() {
    this.reviewService.getReviewsBySellerId(this.sellerId).subscribe({
      next: (data) => {
        this.reviews = data;
        console.log('Loaded reviews:', data);
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        // استخدام بيانات تجريبية في حالة الخطأ
        this.reviews = [
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
        ];
      }
    });
  }

  openAddReviewModal() {
    this.showReviewForm = !this.showReviewForm;
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

  getStars(rating: number): any[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): any[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  createForm() {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  addReview() {
    if (this.reviewForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      const reviewData = {
        user_id: currentUser?.id || 1,
        seller_id: this.sellerId,
        rating: this.reviewForm.value.rating,
        comment: this.reviewForm.value.comment
      };

      this.reviewService.addReview(reviewData).subscribe({
        next: (response) => {
          console.log('Review added successfully:', response);

          // إضافة المراجعة الجديدة للقائمة المحلية
          const newReview = {
            username: currentUser?.name || 'Anonymous',
            userImage: currentUser?.photo ? `http://127.0.0.1:8000/uploads/${currentUser.photo}` : 'https://via.placeholder.com/40',
            rating: this.reviewForm.value.rating,
            comment: this.reviewForm.value.comment,
            date: new Date()
          };

          this.reviews.unshift(newReview);
          this.showSuccessMessage = true;
          this.reviewForm.reset();
          this.showReviewForm = false;

          // إخفاء رسالة النجاح بعد 3 ثواني
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error adding review:', error);
          // في حالة الخطأ، نضيف المراجعة محلياً فقط
          const newReview = {
            username: currentUser?.name || 'Anonymous',
            userImage: currentUser?.photo ? `http://127.0.0.1:8000/uploads/${currentUser.photo}` : 'https://via.placeholder.com/40',
            rating: this.reviewForm.value.rating,
            comment: this.reviewForm.value.comment,
            date: new Date()
          };

          this.reviews.unshift(newReview);
          this.showSuccessMessage = true;
          this.reviewForm.reset();
          this.showReviewForm = false;

          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        }
      });
    }
  }
}


