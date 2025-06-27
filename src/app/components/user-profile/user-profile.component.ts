import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserBookingsComponent } from "../user-bookings/user-bookings.component";
import { AccountInfoFormComponent } from "../account-info-form/account-info-form.component";
import { ChangePasswordFormComponent } from "../change-password-form/change-password-form.component";

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, UserBookingsComponent, AccountInfoFormComponent, ChangePasswordFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
   user = {
    name: 'Mazen Ahmed',
    email: 'mazen132@gmail.com',
    phone: '01117292923',
    address: 'Aswan, Egypt',
    image: 'https://img.freepik.com/free-photo/headshot-serious-bearded-man-with-mustache-beard-wears-round-spectacles_273609-8955.jpg?semt=ais_hybrid&w=740'
  };

     activeTab: 'bookings' | 'settings'| 'password' = 'bookings';

  setTab(tab: 'bookings' | 'settings' | 'password') {
    this.activeTab = tab;
  }
}

