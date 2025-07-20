import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { Payment } from '../../../types/payment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-details,date-pipe',
  imports: [RouterLink,DatePipe],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
    getId:any;
    payment:any;
constructor(
    private adminService :AdminServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit() {
    this.getId=this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getPayment(this.getId).subscribe((res)=>{
      console.log(res);
      return this.payment=res.payment
    })
  }
}
