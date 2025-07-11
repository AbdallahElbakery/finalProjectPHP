import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ReviewListComponent implements OnInit {
  reviews: any[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviews().subscribe(data => {
      console.log('Reviews data:', data);
      this.reviews = data;
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
