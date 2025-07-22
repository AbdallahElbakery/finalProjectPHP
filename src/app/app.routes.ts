import { RouterModule, Routes } from '@angular/router';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserSellerProfileComponent } from './components/user-seller-profile/user-seller-profile.component';
import { LoginComponent } from './components/login/login.component';
import { LoginComponent as LoginAdminComponent } from './components/admin/login/login.component';
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
import { AuthGuard } from './guards/auth.guard';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { GuestGuard } from './guards/guest.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { userRoleGuard} from './guards/user-role.guard';
import { sellerRoleGuard } from './guards/seller-role.guard';
import { adminRoleGuard } from './guards/admin-role.guard';
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
import { EditAdminProfileComponent } from './components/admin/edit-admin-profile/edit-admin-profile.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';

export const routes: Routes = [

    //public routes
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [GuestGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'home', component: HomeComponent, title: 'Home', },
    { path: 'properties', component: PropertiesComponent, title: 'Properties' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },

    //User & Seller
    { path: 'property-details', component: PropertyDetailsComponent, title: 'property-details', canActivate: [AuthGuard] },
    { path: 'property/:id', component: PropertyDetailsComponent, title: 'Property Details', canActivate: [AuthGuard] },
    { path: 'seller-profile', component: SellerProfileComponent, canActivate: [sellerRoleGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [sellerRoleGuard] },
    { path: 'user-seller-profile', component: UserSellerProfileComponent, canActivate: [userRoleGuard] },
    { path: 'create-property', component: CreatePropertyComponent, canActivate: [sellerRoleGuard] },
    { path: 'edit-property', component: EditPropertyComponent, canActivate: [sellerRoleGuard] },
    { path: 'my-properties', component: MyPropertiesComponent, canActivate: [sellerRoleGuard] },
    { path: 'seller-bookings', component: SellerBookingsComponent, canActivate: [sellerRoleGuard] },
    { path: 'property', component: PropertyComponent, canActivate: [userRoleGuard] },
    { path: 'user-bookings', component: UserBookingsComponent, title: 'Bookings', canActivate: [userRoleGuard] },
    { path: 'schedule-visit', component: SchedulePropVisitComponent, canActivate: [userRoleGuard] },
    { path: 'user-profile', component: UserProfileComponent, canActivate: [userRoleGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [userRoleGuard] },
    { path: 'message', component: MessageComponent, canActivate: [userRoleGuard] },
    { path: 'message/:id', component: MessageComponent, canActivate: [userRoleGuard] },
    { path: 'reviews', component: ReviewListComponent, canActivate: [userRoleGuard] },
    { path: 'ai-chat', component: AiChatComponent, title: 'AI Chat' },
    //admin panel routes
    {
      path: 'admin', component: AdminLayoutComponent, title: 'Admin', children:
      [
        { path: '', component: DashboardComponent, title: 'Admin', canActivate: [adminRoleGuard] },
        { path: 'login', component: LoginAdminComponent, title: 'Admin login' , canActivate: [GuestGuard]},
        { path: 'home', component: HomeAdminComponent, title: 'login admin', canActivate: [adminRoleGuard] },
        { path: 'users', component: UsersListComponent, title: 'Admin users', canActivate: [adminRoleGuard] },
        { path: 'user', component: UserDetailsComponent, title: 'User', canActivate: [adminRoleGuard] },
        { path: 'add/users', component: UserAddComponent, title: 'Admin add users', canActivate: [adminRoleGuard] },
        { path: 'edit/users/:id', component: UserEditComponent, title: 'Admin edit users', canActivate: [adminRoleGuard] },
        { path: 'details/users/:id', component: UserDetailsComponent, title: 'Admin details users', canActivate: [adminRoleGuard] },
        { path: 'properties', component: PropertiesListComponent, title: 'Admin properties', canActivate: [adminRoleGuard] },
        { path: 'add/properties', component: PropertyAddComponent, title: 'Admin properties', canActivate: [adminRoleGuard] },
        { path: 'edit/properties/:id', component: PropertyEditComponent, title: 'Admin edit properties', canActivate: [adminRoleGuard] },
        { path: 'details/properties', component: PropertyAddComponent, title: 'Admin details properties', canActivate: [adminRoleGuard] },
        { path: 'details/properties/:id', component: PropertyAdminDetails, title: 'Admin details properties', canActivate: [adminRoleGuard] },
        { path: 'reviews', component: ReviewsListComponent, title: 'Admin reviews', canActivate: [adminRoleGuard] },
        { path: 'details/reviews/:id', component: ReviewDetailsComponent, title: 'Admin review details', canActivate: [adminRoleGuard] },
        { path: 'delete/reviews', component: ReviewDeleteComponent, title: 'Admin review delete', canActivate: [adminRoleGuard] },
        { path: 'bookings', component: BookingsListComponent, title: 'Admin bookings', canActivate: [adminRoleGuard] },
        { path: 'details/bookings/:id', component: BookingDetailsComponent, title: 'Admin booking details', canActivate: [adminRoleGuard] },
        { path: 'edit/bookings/:id', component: BookingEditComponent, title: 'Admin booking edit status', canActivate: [adminRoleGuard] },
        { path: 'delete/bookings', component: BookingDeleteComponent, title: 'Admin booking delete', canActivate: [adminRoleGuard] },
        { path: 'payments', component: PaymentsListComponent, title: 'Admin payments', canActivate: [adminRoleGuard] },
        { path: 'details/payments/:id', component: PaymentDetailsComponent, title: 'Admin payment details', canActivate: [adminRoleGuard] },
        { path: 'categories', component: CategoriesListComponent, title: 'Admin categories', canActivate: [adminRoleGuard] },
        { path: 'details/categories/:id', component: CategoryDetailsComponent, title: 'Admin category details', canActivate: [adminRoleGuard] },
        { path: 'add/categories', component: CategoryAddComponent, title: 'Admin add category', canActivate: [adminRoleGuard] },
        { path: 'edit/categories/:id', component: CategoryEditComponent, title: 'Admin edit category', canActivate: [adminRoleGuard] },
        { path: 'delete/categories', component: CategoryDeleteComponent, title: 'Admin delete category', canActivate: [adminRoleGuard] },
        { path: 'edit-profile', component: EditAdminProfileComponent, title: 'Admin delete category', canActivate: [adminRoleGuard]},
        { path: 'ai-chat', component: AiChatComponent, title: 'AI Chat' },
        
      ]
    },
];
