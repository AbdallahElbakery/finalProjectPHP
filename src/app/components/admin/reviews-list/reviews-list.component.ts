import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { DatePipe, NgFor, SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews-list',
  imports: [NgFor, DatePipe, SlicePipe],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
  reviews: any
  review: any;
  constructor(
    private adminService: AdminServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminService.getReviews().subscribe((res) => {
      this.reviews = res.allReviews
    })


  }

  deleteReview(id: number, i: number) {
    if (confirm('are u sure u wanna delete this review !')) { }
    alert('deleted review successfuly !')
    this.reviews.splice(i, 1)
  }

  goViewDetails(id: number) {
    console.log(id) 
    return this.router.navigate(['/admin/details/reviews', id])
  }


}
