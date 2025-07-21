import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserBookingsComponent } from "../user-bookings/user-bookings.component";
import { AccountInfoFormComponent } from "../account-info-form/account-info-form.component";
import { ChangePasswordFormComponent } from "../change-password-form/change-password-form.component";
import { PropertyServiceService } from '../../services/property-service.service';
import { UserProfileResponse } from '../../types/user';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, UserBookingsComponent, AccountInfoFormComponent, ChangePasswordFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
   user = {
    name: '',
    email: '',
    phone: '',
    address: '',
    image: 'assets/images/default-avatar.jpg'
  };

  loading = true;
  error = '';

  activeTab: 'bookings' | 'settings'| 'password' = 'bookings';

  constructor(private propertyService: PropertyServiceService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.propertyService.getCurrentUserProfile().subscribe({
      next: (response: UserProfileResponse) => {
        console.log('User profile response:', response);
        console.log('Address data:', response?.user?.address);
        console.log('Full address data:', response?.user?.full_address);
        console.log('Response structure:', JSON.stringify(response, null, 2));
        
        // البحث عن بيانات المستخدم في أماكن مختلفة
        const userData = this.findUserData(response);
        console.log('Found user data:', userData);
        
        if (userData) {
          const formattedAddress = this.formatAddress(userData.address);
          console.log('Formatted address:', formattedAddress);
          
          // البحث عن العنوان في أماكن مختلفة
          const finalAddress = formattedAddress || 
                              userData.full_address || 
                              userData.address || 
                              this.extractAddressFromResponse(response) || 
                              '';
          
          console.log('Final address:', finalAddress);
          
          this.user = {
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: finalAddress,
            image: userData.photo ? `http://127.0.0.1:8000/uploads/${userData.photo}` : 'assets/images/default-avatar.jpg'
          };
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.error = 'Failed to load user profile. Please try again.';
        this.loading = false;
      }
    });
  }

  private formatAddress(address: any): string {
    if (!address) return '';
    
    // إذا كان العنوان كائن، اجمع البلد والمدينة
    if (typeof address === 'object') {
      const parts = [];
      if (address.country) parts.push(address.country);
      if (address.city) parts.push(address.city);
      return parts.join(', ');
    }
    
    // إذا كان مصفوفة، اجمع العناصر
    if (Array.isArray(address)) {
      return address.filter(item => item).join(', ');
    }
    
    // إذا كان نص، ارجعه كما هو
    return address.toString();
  }

  private extractAddressFromResponse(response: any): string {
    // البحث عن العنوان في أماكن مختلفة في البيانات
    if (response?.user?.address?.country && response?.user?.address?.city) {
      return `${response.user.address.city}, ${response.user.address.country}`;
    }
    
    if (response?.address?.country && response?.address?.city) {
      return `${response.address.city}, ${response.address.country}`;
    }
    
    if (response?.user?.city && response?.user?.country) {
      return `${response.user.city}, ${response.user.country}`;
    }
    
    // البحث في أماكن أخرى محتملة
    if (response?.city && response?.country) {
      return `${response.city}, ${response.country}`;
    }
    
    // إذا كان هناك address ككائن في المستوى الأعلى
    if (response?.address && typeof response.address === 'object') {
      const parts = [];
      if (response.address.country) parts.push(response.address.country);
      if (response.address.city) parts.push(response.address.city);
      return parts.join(', ');
    }
    
    // البحث في response.data
    if (response?.data?.address?.country && response?.data?.address?.city) {
      return `${response.data.address.city}, ${response.data.address.country}`;
    }
    
    if (response?.data?.city && response?.data?.country) {
      return `${response.data.city}, ${response.data.country}`;
    }
    
    return '';
  }

  private findUserData(response: any): any {
    // البحث عن بيانات المستخدم في أماكن مختلفة
    if (response?.user) return response.user;
    if (response?.data?.user) return response.data.user;
    if (response?.data) return response.data;
    
    // البحث في أماكن أخرى محتملة
    if (response?.profile) return response.profile;
    if (response?.userData) return response.userData;
    
    return response;
  }

  setTab(tab: 'bookings' | 'settings' | 'password') {
    this.activeTab = tab;
  }
}

