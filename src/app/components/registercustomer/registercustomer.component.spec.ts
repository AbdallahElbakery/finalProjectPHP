import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercustomerComponent } from './registercustomer.component';

describe('RegistercustomerComponent', () => {
  let component: RegistercustomerComponent;
  let fixture: ComponentFixture<RegistercustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistercustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistercustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
