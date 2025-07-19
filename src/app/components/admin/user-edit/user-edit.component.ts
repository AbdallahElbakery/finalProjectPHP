import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AdminServiceService } from '../../../services/admin-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyServiceService } from '../../../services/property-service.service';
import { Address } from '../../../types/address';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  getId: any;
  editForm!: FormGroup
  addresses: Address[] = []

  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)

  constructor(
    private propertyService: PropertyServiceService,
    private adminService: AdminServiceService,
    private ActivatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getId = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.propertyService.getAddresses().subscribe((cities) => {
      return this.addresses = cities;
    })

    this.adminService.getSingleUser(this.getId).subscribe((res) => {
      console.log("res", res)
      this.editForm.patchValue({
        name: res.user.name,
        email: res.user['email'],
        phone: res.user.phone,
        role: res.user.role,
        address: res.user.address,
      })
    })
  }


  onSubmit() {

    const data={...this.editForm.value}
    // const formData=new FormData();

    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });
    // formData.append('_method','PUT')
    this.adminService.editUser(data, this.getId).subscribe((res) => {
      console.log("res", res);
      alert('User updated successfully');
    })
   }
}
