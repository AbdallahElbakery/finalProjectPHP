import { Property, PropertyRoot } from './../../../types/property';
import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-properties-list,date-pipe',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.css'
})
export class PropertiesListComponent {
  allProperties: Property[] = [];
  constructor(
    private adminSevice: AdminServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminSevice.getProperties().subscribe((data) => {
      console.log(data);
      this.allProperties = data.properties;
    });
  
  }
  gotpropertyDetails(id: number) {
    console.log(id);
    return this.router.navigate(['admin/details/properties', id]);
  }
  onImageEror(event: any) {
    const srcElement = event.target as HTMLImageElement
    srcElement.src = 'https://ui-avatars.com/api/?name=Property&background=1e40af&color=fff&rounded=false&size=80'
  }

  deleteProperty(id: number,i:number) {
    return this.adminSevice.deleteProperty(id).subscribe(()=>{
      this.allProperties.splice(i, 1);
      alert('deleted successfully');
    })
  }
  goAddProperty() {
    return this.router.navigate(['admin/add/properties']);
  }
  goEditProperty(id:number) {
    return this.router.navigate(['/admin/edit/properties', id]);
  }
}
