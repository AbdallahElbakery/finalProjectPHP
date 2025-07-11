import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyInfoFormComponent } from "../company-info-form/company-info-form.component";
import { AccountInfoFormComponent } from "../account-info-form/account-info-form.component";
import { ChangePasswordFormComponent } from "../change-password-form/change-password-form.component";
import { PropertyServiceService } from '../../services/property-service.service';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, CommonModule, CompanyInfoFormComponent, AccountInfoFormComponent, ChangePasswordFormComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})

export class EditProfileComponent implements OnInit {
  activeTab: 'company' | 'account' | 'password' = 'company';
  getId: any;
  updateProfile!: FormGroup;
  constructor(
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab === 'account' || tab === 'password' || tab === 'company') {
      this.activeTab = tab;
    }
  }

  setTab(tab: 'company' | 'account' | 'password') {
    this.activeTab = tab;
  }


}