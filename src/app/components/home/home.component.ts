import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PropertyComponent } from '../property/property.component';
<<<<<<< Updated upstream
=======
import { Property } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';
import { Address } from '../../types/address';
>>>>>>> Stashed changes

@Component({
  selector: 'app-home',
  imports: [RouterLink,RouterOutlet,PropertyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
<<<<<<< Updated upstream

=======
  // properties: Property[] = [];


  // ngOnInit(): void {
  //   this.propertyService.getProperties().subscribe((data) => {
  //     this.properties = data;
  //   })
  // }

  addresses: Address[] = [];
  addresses2: Address[] = [];

  constructor(private propertyService: PropertyServiceService) { }

  ngOnInit() {

    this.propertyService.getAddresses().subscribe((add) => {
      this.addresses = add.slice(0, 3);
      this.addresses2 = add.slice(4, 7);
    });
  }

>>>>>>> Stashed changes
}
