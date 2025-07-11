import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ReviewListComponent implements OnInit {
  reviews: any[] = [];
  sellerId: number | null = null;
  isSellerSpecific: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // التحقق من وجود معرف البائع في query parameters
    this.route.queryParams.subscribe(params => {
      this.sellerId = params['sellerId'] ? parseInt(params['sellerId']) : null;
      this.isSellerSpecific = !!this.sellerId;
      
      if (this.sellerId) {
        this.loadSellerReviews(this.sellerId);
      } else {
        this.loadAllReviews();
      }
    });
  }

  loadAllReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        console.log('All reviews data:', data);
        this.reviews = data;
      },
      error: (error) => {
        console.error('Error loading all reviews:', error);
        // استخدام بيانات تجريبية في حالة الخطأ
        this.reviews = [
          {
            user: { name: 'Mohamed Ahmed' },
            rating: 4,
            comment: 'Excellent service and the property description was accurate.',
            created_at: '2025-05-15'
          },
          {
            user: { name: 'Sara Ali' },
            rating: 5,
            comment: 'The best real estate broker I have ever dealt with.',
            created_at: '2025-06-01'
          },
          {
            user: { name: 'Ahmed Hassan' },
            rating: 3,
            comment: 'Good experience but there is some delay',
            created_at: '2025-06-10'
          }
        ];
      }
    });
  }

  loadSellerReviews(sellerId: number) {
    this.reviewService.getReviewsBySellerId(sellerId).subscribe({
      next: (data) => {
        console.log('Seller reviews data:', data);
        this.reviews = data;
      },
      error: (error) => {
        console.error('Error loading seller reviews:', error);
        // استخدام بيانات تجريبية في حالة الخطأ
        this.reviews = [
          {
            user: { name: 'Mohamed Ahmed' },
            rating: 4,
            comment: 'Excellent service and the property description was accurate.',
            created_at: '2025-05-15'
          },
          {
            user: { name: 'Sara Ali' },
            rating: 5,
            comment: 'The best real estate broker I have ever dealt with.',
            created_at: '2025-06-01'
          },
          {
            user: { name: 'Ahmed Hassan' },
            rating: 3,
            comment: 'Good experience but there is some delay',
            created_at: '2025-06-10'
          }
        ];
      }
    });
  }

  // Get unique users count
  getUniqueUsers(): number {
    const uniqueUsers = new Set(this.reviews.map(review => review.user?.name));
    return uniqueUsers.size;
  }

  // Calculate average rating
  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    
    const totalRating = this.reviews.reduce((sum, review) => {
      return sum + (review.rating || 0);
    }, 0);
    
    return Math.round((totalRating / this.reviews.length) * 10) / 10;
  }
}
