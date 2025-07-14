import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Booking {
  id?: number;
  user_id: number;
  property_id: number;
  suggested_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  property?: any;
  user?: any;
}

export interface BookingRequest {
  property_id: number;
  suggested_price: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/bookings';

  constructor(private http: HttpClient) { }

  // Get all bookings for current user
  getBookings(): Observable<Booking[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.bookings || response)
    );
  }

  // Create a new booking
  createBooking(bookingData: BookingRequest): Observable<any> {
    console.log('Sending booking request:', bookingData);
    
    return this.http.post<any>(this.apiUrl, bookingData).pipe(
      map(response => {
        console.log('Booking response:', response);
        return response;
      }),
      catchError((error: any) => {
        console.error('Booking API error:', error);
        
        if (error.status === 401) {
          return throwError(() => new Error('Please login to make an offer'));
        }
        if (error.status === 400 && error.error?.message) {
          return throwError(() => new Error(error.error.message));
        }
        if (error.status === 422 && error.error?.errors) {
          return throwError(() => new Error('Please check your input and try again'));
        }
        if (error.status === 500) {
          return throwError(() => new Error('Server error occurred'));
        }
        
        return throwError(() => new Error(error.error?.message || 'An error occurred while creating the booking'));
      })
    );
  }

  // Get a specific booking
  getBooking(id: number): Observable<Booking> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.booking || response)
    );
  }

  // Update booking (e.g., change suggested price)
  updateBooking(id: number, bookingData: Partial<Booking>): Observable<Booking> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, bookingData).pipe(
      map(response => response.booking || response)
    );
  }

  // Delete booking
  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMyBookings() {
    return this.http.get<any>('http://127.0.0.1:8000/api/user/bookings').pipe(
      map(response => response.bookings || response)
    );
  }

  // Get seller bookings (for property owners)
  getSellerBookings() {
    return this.http.get<any>('http://127.0.0.1:8000/api/seller/bookings').pipe(
      map(response => response.data || response.bookings || response),
      catchError((error: any) => {
        if (error.status === 401) {
          return throwError(() => new Error('Unauthorized access'));
        }
        if (error.status === 404) {
          return throwError(() => new Error('No properties found for this seller'));
        }
        return throwError(() => new Error('An error occurred while fetching bookings'));
      })
    );
  }

  // Confirm booking (seller only)
  confirmBooking(bookingId: number) {
    return this.http.post<any>(`http://127.0.0.1:8000/api/seller/bookings/${bookingId}/confirm`, {}).pipe(
      map(response => response),
      catchError((error: any) => {
        if (error.status === 403) {
          return throwError(() => new Error('Unauthorized to confirm this booking'));
        }
        return throwError(() => new Error('An error occurred while confirming the booking'));
      })
    );
  }

  // Cancel booking (seller only)
  cancelBooking(bookingId: number) {
    return this.http.post<any>(`http://127.0.0.1:8000/api/seller/bookings/${bookingId}/cancel`, {}).pipe(
      map(response => response),
      catchError((error: any) => {
        if (error.status === 403) {
          return throwError(() => new Error('Unauthorized to cancel this booking'));
        }
        return throwError(() => new Error('An error occurred while cancelling the booking'));
      })
    );
  }
} 