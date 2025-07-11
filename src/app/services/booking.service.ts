import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private apiUrl = 'http://127.0.0.1:8000/api/bookings';

  constructor(private http: HttpClient) { }

  // Get all bookings for current user
  getBookings(): Observable<Booking[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.bookings || response)
    );
  }

  // Create a new booking
  createBooking(bookingData: BookingRequest): Observable<Booking> {
    return this.http.post<any>(this.apiUrl, bookingData).pipe(
      map(response => response.booking || response)
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
} 