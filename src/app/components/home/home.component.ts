import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PropertyComponent } from '../property/property.component';
import { Property } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet, PropertyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // properties: Property[] = [];
  // constructor(private propertyService: PropertyServiceService) { }


  // ngOnInit(): void {
  //   this.propertyService.getProperties().subscribe((data) => {
  //     this.properties = data;
  //   })
  // }
  
}
