import { Component } from '@angular/core';
import { RegistersellerComponent } from "../registerseller/registerseller.component";
import { RegistercustomerComponent } from "../registercustomer/registercustomer.component";


@Component({
  selector: 'app-registration',
  imports: [RegistersellerComponent, RegistercustomerComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  type: string = ''; // 'customer' أو 'seller'

  setUserType(userType: string) {
    this.type = userType;
  }
}
