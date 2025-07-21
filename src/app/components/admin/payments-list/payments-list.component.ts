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

exportPayments() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "ID,Payment ID,Property,Quantity,Amount,Payer Name,Payer Email,Payment Method,Date\n";

  this.payments.forEach((p: any) => {
    const row = `${p.id},${p.payment_id},${p.property},${p.quantity},${p.amount},${p.payer_name},${p.payer_email},${p.payment_method},${p.date}`;
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "payments.csv");
  document.body.appendChild(link); 
  link.click();
  link.remove();
}
}
