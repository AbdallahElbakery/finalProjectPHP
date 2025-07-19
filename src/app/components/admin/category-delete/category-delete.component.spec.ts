import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDeleteComponent } from './category-delete.component';

describe('CategoryDeleteComponent', () => {
  let component: CategoryDeleteComponent;
  let fixture: ComponentFixture<CategoryDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
