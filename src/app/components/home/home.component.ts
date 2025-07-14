import { Component } from '@angular/core';
import { PropertyComponent } from '../property/property.component';
import { Property } from '../../types/property';
import { PropertyServiceService } from '../../services/property-service.service';
import { Address } from '../../types/address';


@Component({
  selector: 'app-home',
  imports: [PropertyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  // properties: Property[] = [];

  // properties: Property[] = [];
  // constructor(private propertyService: PropertyServiceService) { }


  // ngOnInit(): void {
  //   this.propertyService.getProperties().subscribe((data) => {
  //     this.properties = data;
  //   })
  // }

  addresses: Address[] = [];
  addresses2: Address[] = [];

  constructor(private propertyService: PropertyServiceService) { }

  ngOnInit() {

    this.propertyService.getAddresses().subscribe((add:any) => {
      this.addresses = add.slice(0, 3);
      this.addresses2 = add.slice(4, 7);
    });
  }

}
