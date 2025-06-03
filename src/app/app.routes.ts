import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.componente.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent, title: 'home' },
];


