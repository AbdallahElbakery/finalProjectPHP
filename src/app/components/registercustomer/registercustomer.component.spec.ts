import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistercustomerComponent } from './registercustomer.component';

describe('RegistercustomerComponent', () => {
  let component: RegistercustomerComponent;
  let fixture: ComponentFixture<RegistercustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistercustomerComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistercustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required fields', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.contains('name')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('phone')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('address')).toBeTruthy();
    expect(component.registerForm.contains('terms')).toBeTruthy();
  });

  it('should validate name field', () => {
    const nameControl = component.registerForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    nameControl?.setValue('John');
    expect(nameControl?.valid).toBeFalsy();
    nameControl?.setValue('John Doe');
    expect(nameControl?.valid).toBeTruthy();
  });

  // Add more tests for other fields...
});