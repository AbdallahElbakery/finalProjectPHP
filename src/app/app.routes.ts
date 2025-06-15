import { Routes } from '@angular/router';
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



export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'properties', component: PropertiesComponent, title: 'Properties' },
    { path: 'property-details', component: PropertyDetailsComponent, title: 'property-details' },
    { path: 'seller-profile' , component: SellerProfileComponent},
    { path: 'edit-profile' , component: EditProfileComponent},
    { path: 'user-seller-profile' , component: UserSellerProfileComponent},
    { path: 'create-property',component: CreatePropertyComponent },
    { path: 'my-properties' , component: MyPropertiesComponent},
    { path: 'seller-bookings', component: SellerBookingsComponent},
    { path: 'property', component: PropertyComponent},
    { path: 'user-bookings', component: UserBookingsComponent, title: 'Bookings'},

];

