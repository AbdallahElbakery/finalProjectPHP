import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-categories-list,date-pipe',
  imports: [NgFor, DatePipe],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  categories: any;
  constructor(
    private adminService: AdminServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.adminService.getCategories().subscribe((res) => {
      console.log(res.categories)
      return this.categories = res.categories
    })
  }

  goAddCategory(){
    return this.router.navigate(['/admin/add/categories'])
  }
  
  deleteCategory(id:number,i:number){
    return this.adminService.deleteCategory(id).subscribe(()=>{
      this.categories.splice(i, 1);
      alert('deleted successfully');
    })
  }

  goEditCategory(id: number) {
    return this.router.navigate(['/admin/edit/categories', id]);
  }

  goViewDetails(id: number){
  return this.router.navigate(['/admin/details/categories', id])
}
}
