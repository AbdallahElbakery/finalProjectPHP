import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { PaymentRoot } from '../../../types/payment';
import { DatePipe, NgFor, SlicePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments-list,date-pipe',
  imports: [NgFor,DatePipe,SlicePipe],
  templateUrl: './payments-list.component.html',
  styleUrl: './payments-list.component.css'
})
export class PaymentsListComponent {
  payments:any;
  constructor(
    private adminService :AdminServiceService,
    private router:Router,
  ) { }


ngOnInit(){
  this.adminService.getPayments().subscribe((res)=>{
    this.payments=res.payments
  })
}

goViewPayment(id:number){
  return this.router.navigate(['/admin/details/payments',id]);
}


}
