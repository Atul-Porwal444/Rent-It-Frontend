import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommateDetailsComponent } from './roommate-details.component';

describe('RoommateDetailsComponent', () => {
  let component: RoommateDetailsComponent;
  let fixture: ComponentFixture<RoommateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoommateDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoommateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
