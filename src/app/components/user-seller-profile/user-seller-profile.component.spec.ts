import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSellerProfileComponent } from './user-seller-profile.component';

describe('UserSellerProfileComponent', () => {
  let component: UserSellerProfileComponent;
  let fixture: ComponentFixture<UserSellerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSellerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSellerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
