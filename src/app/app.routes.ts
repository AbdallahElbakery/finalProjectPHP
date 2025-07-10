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
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, title: 'Home', canActivate: [AuthGuard] },
    { path: 'properties', component: PropertiesComponent, title: 'Properties', canActivate: [AuthGuard] },
    { path: 'property-details', component: PropertyDetailsComponent, title: 'property-details', canActivate: [AuthGuard] },
    { path: 'seller-profile' , component: SellerProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile' , component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'user-seller-profile' , component: UserSellerProfileComponent, canActivate: [AuthGuard] },
    { path: 'create-property',component: CreatePropertyComponent, canActivate: [AuthGuard] },
    { path: 'my-properties' , component: MyPropertiesComponent, canActivate: [AuthGuard] },
    { path: 'seller-bookings', component: SellerBookingsComponent, canActivate: [AuthGuard] },
    { path: 'property', component: PropertyComponent, canActivate: [AuthGuard] },
    { path: 'user-bookings', component: UserBookingsComponent, title: 'Bookings', canActivate: [AuthGuard] },
    { path: "sechedule-visit",component:SchedulePropVisitComponent, canActivate: [AuthGuard] },
    { path: 'user-profile' , component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'chat' , component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'message' , component: MessageComponent, canActivate: [AuthGuard] },
    { path: 'message/:id' , component: MessageComponent, canActivate: [AuthGuard] }
];
