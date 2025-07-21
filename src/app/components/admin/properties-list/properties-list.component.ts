import { Property, PropertyRoot } from './../../../types/property';
import { Component } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-properties-list,date-pipe',
  imports: [CurrencyPipe, CommonModule,DatePipe],
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

  deleteProperty(id: number, i: number) {
    return this.adminSevice.deleteProperty(id).subscribe(() => {
      if(confirm('are u sure u wanna delete this property!')){
        this.allProperties.splice(i, 1);
        alert('deleted successfully');
        return 
      }
      else{return false}
    })
  }
  goAddProperty() {
    return this.router.navigate(['admin/add/properties']);
  }
  goEditProperty(id: number) {
    return this.router.navigate(['/admin/edit/properties', id]);
  }


  exportProperties() {
    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += 'Name,Description,Price,Purpose,City,Payment,Status,Area,Bedrooms,Bathrooms,Created,Updated,Seller,Category,Address\n';

    this.allProperties.forEach((p: any) => {
      const row = `${p.name},${p.description},${p.price},${p.purpose},${p.city},${p.payment_method},${p.status},${p.area},${p.bedrooms},${p.bathrooms},${p.date},${p.updated},${p.seller.name},${p.category},${p.location}`
      csvContent += row + '\n'
    })

    const encodeUri = encodeURI(csvContent)
    const link = document.createElement("a");
    link.setAttribute('href', encodeUri)
    link.setAttribute('download', 'properties.csv')

    document.body.appendChild(link)

    link.click();
    link.remove();
  }
}
