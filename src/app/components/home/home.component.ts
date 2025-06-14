import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PropertyComponent } from '../property/property.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink,RouterOutlet,PropertyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
