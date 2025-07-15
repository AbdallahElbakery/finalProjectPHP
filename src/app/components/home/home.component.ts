import { Component, Input } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { Property } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';
import { Address } from '../../types/address';
import { PropertyCardComponent } from '../property-card/property-card.component';


@Component({
  selector: 'app-home',
  imports: [PropertyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 

  addresses: Address[] = [];
  addresses2: Address[] = [];

  constructor(private propertyService: PropertyServiceService) { }

  ngOnInit() {

    this.propertyService.getAddresses().subscribe((add: any) => {
      this.addresses = add.slice(0, 3);
      this.addresses2 = add.slice(4, 7);
    });
  }

}
