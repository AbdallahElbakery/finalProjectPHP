# Seller Bookings Integration

## Overview
This document describes the integration between the Angular frontend and Laravel backend for the seller bookings feature.

## Backend API (Laravel)

### Routes
```php
Route::prefix('seller/bookings')->controller(SellerBookingController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('{booking}/confirm', 'confirm');
    Route::post('{booking}/cancel', 'cancel');
});
```

### API Endpoints

#### 1. Get Seller Bookings
- **URL**: `GET /api/seller/bookings`
- **Description**: Retrieves all bookings for properties owned by the authenticated seller
- **Response**: 
  ```json
  {
    "message": "Bookings retrieved successfully",
    "data": [
      {
        "id": 1,
        "user_id": 2,
        "property_id": 1,
        "suggested_price": 850000,
        "status": "pending",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-15T10:30:00Z",
        "user": {
          "id": 2,
          "name": "John Doe",
          "email": "john@example.com"
        },
        "property": {
          "id": 1,
          "name": "Spacious Villa",
          "price": 900000,
          "location": "Sheikh Zayed, Giza"
        }
      }
    ]
  }
  ```

#### 2. Confirm Booking
- **URL**: `POST /api/seller/bookings/{booking}/confirm`
- **Description**: Confirms a booking and marks the property as sold
- **Response**:
  ```json
  {
    "message": "Booking confirmed and property marked as sold"
  }
  ```

#### 3. Cancel Booking
- **URL**: `POST /api/seller/bookings/{booking}/cancel`
- **Description**: Cancels a booking
- **Response**:
  ```json
  {
    "message": "Booking cancelled successfully",
    "data": {
      "booking_id": 1,
      "status": "cancelled"
    }
  }
  ```

## Frontend (Angular)

### Service Methods

#### BookingService
```typescript
// Get seller bookings
getSellerBookings(): Observable<Booking[]>

// Confirm booking
confirmBooking(bookingId: number): Observable<any>

// Cancel booking
cancelBooking(bookingId: number): Observable<any>
```

### Component Features

#### SellerBookingsComponent
- **Loading States**: Shows spinner while fetching data
- **Error Handling**: Displays error messages with toast notifications
- **Empty State**: Shows message when no bookings exist
- **Status Management**: Visual status badges (pending, confirmed, cancelled)
- **Action Buttons**: Accept/Reject buttons for pending bookings
- **Property Navigation**: Clickable property names to view details
- **Price Display**: Shows original property price and offered price
- **Responsive Design**: Works on all screen sizes

### UI/UX Features

#### Toast Notifications
- Success messages for confirmed/cancelled bookings
- Error messages for failed operations
- Bootstrap toast styling

#### Bootstrap Modals
- Confirmation modal for accepting bookings
- Confirmation modal for cancelling bookings
- Professional styling with icons

#### Status Badges
- **Pending**: Yellow/orange gradient
- **Confirmed**: Green gradient  
- **Cancelled**: Red gradient

### Navigation
- Added to user dropdown menu: "Property Bookings"
- Route: `/seller-bookings`
- Protected by AuthGuard

## Data Flow

1. **Authentication**: User must be logged in as a seller
2. **Data Fetching**: Component calls `getSellerBookings()` on init
3. **Display**: Bookings are displayed with property and user information
4. **Actions**: Seller can confirm or cancel pending bookings
5. **Updates**: List refreshes after successful actions
6. **Navigation**: Property names link to property details page

## Error Handling

### Backend Errors
- 401: Unauthorized access
- 403: Unauthorized to perform action
- 404: No properties found for seller
- 500: Server error

### Frontend Error Handling
- Toast notifications for user feedback
- Loading states to prevent multiple requests
- Graceful fallbacks for missing data

## Security Features

- **Authentication Required**: All endpoints require valid authentication
- **Authorization**: Sellers can only manage bookings for their own properties
- **Input Validation**: Backend validates all input data
- **CSRF Protection**: Laravel's built-in CSRF protection

## Testing

### Manual Testing Checklist
- [ ] Login as seller
- [ ] Navigate to Property Bookings
- [ ] Verify bookings load correctly
- [ ] Test confirm booking functionality
- [ ] Test cancel booking functionality
- [ ] Verify toast notifications
- [ ] Test property name navigation
- [ ] Test responsive design
- [ ] Test error scenarios

## Future Enhancements

1. **Filtering**: Add filters by status, date range, property type
2. **Search**: Search bookings by user name or property name
3. **Pagination**: Server-side pagination for large datasets
4. **Export**: Export bookings to CSV/PDF
5. **Notifications**: Real-time notifications for new bookings
6. **Chat Integration**: Direct messaging with users
7. **Analytics**: Booking statistics and trends 