import { RouterModule, Routes } from '@angular/router';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserSellerProfileComponent } from './components/user-seller-profile/user-seller-profile.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreatePropertyComponent } from './components/create-property/create-property.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { SellerBookingsComponent } from './components/seller-bookings/seller-bookings.component';
import { PropertyComponent } from './components/property/property.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { SchedulePropVisitComponent } from './components/schedule-prop-visit/schedule-prop-visit.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { AuthGuard } from './auth.guard';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { GuestGuard } from './guest.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { HomeAdminComponent } from './components/admin/home/home.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { PropertiesListComponent } from './components/admin/properties-list/properties-list.component';
import { PropertyAddComponent } from './components/admin/property-add/property-add.component';
import { PropertyEditComponent } from './components/admin/property-edit/property-edit.component';
import { UserAddComponent } from './components/admin/user-add/user-add.component';
import { UserDetailsComponent } from './components/admin/user-details/user-details.component';
import { UserEditComponent } from './components/admin/user-edit/user-edit.component';
import { PropertyDetailsComponent as PropertyAdminDetails } from './components/admin/property-details/property-details.component';
import { ReviewsListComponent } from './components/admin/reviews-list/reviews-list.component';
import { ReviewDetailsComponent } from './components/admin/review-details/review-details.component';
import { ReviewDeleteComponent } from './components/admin/review-delete/review-delete.component';
import { BookingsListComponent } from './components/admin/bookings-list/bookings-list.component';
import { BookingDetailsComponent } from './components/admin/booking-details/booking-details.component';
import { BookingEditComponent } from './components/admin/booking-edit/booking-edit.component';
import { BookingDeleteComponent } from './components/admin/booking-delete/booking-delete.component';
import { PaymentsListComponent } from './components/admin/payments-list/payments-list.component';
import { PaymentDetailsComponent } from './components/admin/payment-details/payment-details.component';
import { CategoriesListComponent } from './components/admin/categories-list/categories-list.component';
import { CategoryDetailsComponent } from './components/admin/category-details/category-details.component';
import { CategoryAddComponent } from './components/admin/category-add/category-add.component';
import { CategoryEditComponent } from './components/admin/category-edit/category-edit.component';
import { CategoryDeleteComponent } from './components/admin/category-delete/category-delete.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [GuestGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'home', component: HomeComponent, title: 'Home', canActivate: [AuthGuard] },
    { path: 'properties', component: PropertiesComponent, title: 'Properties' },
    { path: 'property-details', component: PropertyDetailsComponent, title: 'property-details', canActivate: [AuthGuard] },
    { path: 'seller-profile', component: SellerProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'user-seller-profile', component: UserSellerProfileComponent, canActivate: [AuthGuard] },
    { path: 'create-property', component: CreatePropertyComponent, canActivate: [AuthGuard] },
    { path: 'edit-property', component: EditPropertyComponent, canActivate: [AuthGuard] },
    { path: 'my-properties', component: MyPropertiesComponent, canActivate: [AuthGuard] },
    { path: 'seller-bookings', component: SellerBookingsComponent, canActivate: [AuthGuard] },
    { path: 'property', component: PropertyComponent, canActivate: [AuthGuard] },
    { path: 'user-bookings', component: UserBookingsComponent, title: 'Bookings', canActivate: [AuthGuard] },
    { path: "sechedule-visit", component: SchedulePropVisitComponent, canActivate: [AuthGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'message', component: MessageComponent, canActivate: [AuthGuard] },
    { path: 'message/:id', component: MessageComponent, canActivate: [AuthGuard] },
    { path: 'reviews', component: ReviewListComponent, canActivate: [AuthGuard] },
    { path: 'property/:id', component: PropertyDetailsComponent, title: 'Property Details', canActivate: [AuthGuard] },

    //admin pannel routes


    {
        path: 'admin', component: AdminLayoutComponent, title: 'Admin', children:
            [
                { path: '', component: DashboardComponent, title: 'Admin' },
                { path: 'login', component: LoginComponent, title: 'Admin login' },
                { path: 'home', component: HomeAdminComponent, title: 'login admin' },
                { path: 'users', component: UsersListComponent, title: 'Admin users' },
                { path: 'user', component: UserDetailsComponent, title: 'User' },
                { path: 'add/users', component: UserAddComponent, title: 'Admin add users' },
                { path: 'edit/users/:id', component: UserEditComponent, title: 'Admin edit users' },
                { path: 'details/users/:id', component: UserDetailsComponent, title: 'Admin details users' },
                { path: 'properties', component: PropertiesListComponent, title: 'Admin properties' },
                { path: 'add/properties', component: PropertyAddComponent, title: 'Admin properties' },
                { path: 'edit/properties/:id', component: PropertyEditComponent, title: 'Admin edit properties' },
                { path: 'details/properties', component: PropertyAddComponent, title: 'Admin details properties' },
                { path: 'details/properties/:id', component: PropertyAdminDetails, title: 'Admin details properties' },
                { path: 'reviews', component: ReviewsListComponent, title: 'Admin reviews' },
                { path: 'details/reviews/:id', component: ReviewDetailsComponent, title: 'Admin review details' },
                { path: 'delete/reviews', component: ReviewDeleteComponent, title: 'Admin review delete' },
                { path: 'bookings', component: BookingsListComponent, title: 'Admin bookings' },
                { path: 'details/bookings', component: BookingDetailsComponent, title: 'Admin booking details' },
                { path: 'edit/bookings', component: BookingEditComponent, title: 'Admin booking edit status' },
                { path: 'delete/bookings', component: BookingDeleteComponent, title: 'Admin booking delete' },
                { path: 'payments', component: PaymentsListComponent, title: 'Admin payments' },
                { path: 'details/payments/:id', component: PaymentDetailsComponent, title: 'Admin payment details' },
                { path: 'categories', component: CategoriesListComponent, title: 'Admin categories' },
                { path: 'details/categories/:id', component: CategoryDetailsComponent, title: 'Admin category details' },
                { path: 'add/categories', component: CategoryAddComponent, title: 'Admin add category' },
                { path: 'edit/categories/:id', component: CategoryEditComponent, title: 'Admin edit category' },
                { path: 'delete/categories', component: CategoryDeleteComponent, title: 'Admin delete category' },

            ]
    },


];
