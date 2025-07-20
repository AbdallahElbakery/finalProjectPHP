import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent {
  category: any;
  getId: any;
  constructor(
    private adminService: AdminServiceService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getSingleCategory(this.getId).subscribe((res) => {
      this.category = res.category;
    })
  }
}
