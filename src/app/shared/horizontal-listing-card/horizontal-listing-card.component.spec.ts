import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalListingCardComponent } from './horizontal-listing-card.component';

describe('HorizontalListingCardComponent', () => {
  let component: HorizontalListingCardComponent;
  let fixture: ComponentFixture<HorizontalListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalListingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
