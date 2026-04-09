import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor, NgIf } from '@angular/common';
import { ListingService } from '../_services/listing.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [ListingCardComponent, NgFor, NgIf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  userName: string = 'User';

  featuredRooms : any[] = [];
  featuredRoommates : any[] = [];

  isLoadingRooms: boolean = true;
  isLoadingRoommates: boolean = true;

  constructor(private listingService: ListingService, private authService: AuthService) {}

  ngOnInit(): void {
    const targetCity = this.authService.getCurrentUserValue().targetCity;

    // Fetch page 0, size 10 
    this.listingService.getPostCards(targetCity, 'room').subscribe({
      next: (res) => {
        this.featuredRooms = res || [];
        this.isLoadingRooms = false;
      },
      error: () => this.isLoadingRooms = false
    });

    this.listingService.getPostCards(targetCity, 'roommate').subscribe({
      next: (res) => {
        this.featuredRoommates = res || [];
        this.isLoadingRoommates = false;
      },
      error: () => this.isLoadingRoommates = false
    });
  }

  // Horizontal Scroll Logic
  scroll(element: HTMLElement, direction: 'left' | 'right') {
    const scrollAmount = 320; // Roughly the width of one card + gap
    
    // Remove .nativeElement since it's already a raw HTML element
    const currentScroll = element.scrollLeft; 
    
    element.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }

}
