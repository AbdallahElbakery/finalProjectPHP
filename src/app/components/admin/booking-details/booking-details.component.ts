import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent {
  getId: any;
  booking: any;
  constructor(
    private adminService: AdminServiceService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.adminService.getBooking(this.getId).subscribe((res) => {
      console.log(res)
      return this.booking = res.booking
    })
  }

}
