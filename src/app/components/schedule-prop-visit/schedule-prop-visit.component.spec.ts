import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePropVisitComponent } from './schedule-prop-visit.component';

describe('SchedulePropVisitComponent', () => {
  let component: SchedulePropVisitComponent;
  let fixture: ComponentFixture<SchedulePropVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePropVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulePropVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
