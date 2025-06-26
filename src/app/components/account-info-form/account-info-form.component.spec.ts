import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoFormComponent } from './account-info-form.component';

describe('AccountInfoFormComponent', () => {
  let component: AccountInfoFormComponent;
  let fixture: ComponentFixture<AccountInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
