import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-review-details',
  imports: [RouterLink,NgClass,DatePipe],
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.css'
})
export class ReviewDetailsComponent {

review:any
getId:any;
  constructor(
  private adminService :AdminServiceService,
  private activatedRoute:ActivatedRoute
){}

ngOnInit(){
  this.getId=this.activatedRoute.snapshot.paramMap.get('id')
  this.adminService.getReview(this.getId).subscribe((res)=>{
    this.review=res.review
  })
}
}
