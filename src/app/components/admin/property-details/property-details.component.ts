import { Property } from './../../../types/property';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';
import { PropertyRoot } from '../../../types/property';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-details,date-pipe',
  imports: [CommonModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent {
  getId: any;
  Property: Property | any = {};
  constructor(
    private adminService: AdminServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getId = this.activateRoute.snapshot.paramMap.get('id');
    this.adminService.getSingleProperty(this.getId).subscribe((res) => {
      console.log(res);
      this.Property = res.Property;
    })
  }
  onImageEror(event:any){
    const srcElement=event.target as HTMLImageElement
    srcElement.src='https://ui-avatars.com/api/?name=Property&background=1e40af&color=fff&rounded=false&size=80'
  }
}
