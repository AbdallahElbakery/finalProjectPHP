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
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { userRoleGuard } from './user-role.guard';
import { sellerRoleGuard } from './seller-role.guard';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent, canActivate: [GuestGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'properties', component: PropertiesComponent, title: 'Properties' },
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
    { path: 'property/:id', component: PropertyDetailsComponent, title: 'Property Details', canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'ai-chat', component: AiChatComponent, title: 'AI Chat' },


];
