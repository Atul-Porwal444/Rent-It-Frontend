import { Component } from '@angular/core';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ListingCardComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // Fake data to test the UI (Before we connect backend)
  featuredRooms = [
    { id: 1, rentAmount: 12000, location: 'Vijay Nagar', description: 'Nice 2BHK near metro', bhkType: '2BHK', furnished: true },
    { id: 2, rentAmount: 8000, location: 'Bhawarkua', description: 'Student friendly room', bhkType: '1RK', furnished: false },
    { id: 3, rentAmount: 15000, location: 'Palasia', description: 'Luxury apartment', bhkType: '3BHK', furnished: true },
    { id: 4, rentAmount: 5000, location: 'Rau', description: 'Budget stay', bhkType: '1BHK', furnished: false },
  ];

  featuredRoommates = [
    { id: 101, rentAmount: 4000, location: 'Vijay Nagar', description: 'Need a roommate for 2BHK', lookingForGender: 'Male' },
    { id: 102, rentAmount: 3500, location: 'Bhawarkua', description: 'Shared room available', lookingForGender: 'Female' },
    { id: 103, rentAmount: 6000, location: 'LIG Colony', description: 'Chill flatmate needed', lookingForGender: 'Any' },
    { id: 104, rentAmount: 2500, location: 'Indore', description: 'Urgent requirement', lookingForGender: 'Male' },
  ];
}
