import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistersellerComponent } from './registerseller.component';

describe('RegistersellerComponent', () => {
  let component: RegistersellerComponent;
  let fixture: ComponentFixture<RegistersellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistersellerComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistersellerComponent);
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
    expect(component.registerForm.contains('company_name')).toBeTruthy();
    expect(component.registerForm.contains('service_areas')).toBeTruthy();
    expect(component.registerForm.contains('about')).toBeTruthy();
    expect(component.registerForm.contains('logo')).toBeTruthy();
    expect(component.registerForm.contains('photo')).toBeTruthy();
    expect(component.registerForm.contains('personal_id_image')).toBeTruthy();
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