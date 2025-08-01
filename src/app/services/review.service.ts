import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:8000/api/reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getReviewsBySellerId(sellerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  addReview(reviewData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reviewData);
  }

  updateReview(reviewId: number, reviewData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reviewId}`, reviewData);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${reviewId}`);
  }
}
