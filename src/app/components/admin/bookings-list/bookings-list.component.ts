import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-bookings-list',
  imports: [NgFor, DatePipe, NgClass],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.css'
})
export class BookingsListComponent {
  bookings: any
  constructor(
    private adminService: AdminServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminService.getBookings().subscribe((res) => {
      this.bookings = res.allBookings
    })
  }

  gotEdit(id: number) {
    return this.router.navigate(['/admin/edit/bookings', id])
  }
  goViewBooking(id: number) {
    return this.router.navigate(['/admin/details/bookings', id])
  }
  deleteBooking(id: number, i: number) {
    if (confirm('are u sure u want to delete this bookings!')) {
      this.bookings.splice(i, 1);
      alert('deleted successfully');
    }
    else { console.log('not deleted') }
  }
}
