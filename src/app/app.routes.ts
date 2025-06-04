import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'properties', component: PropertiesComponent, title: 'Properties' },
    { path: 'property-details', component: PropertyDetailsComponent, title: 'property-details' },

];


