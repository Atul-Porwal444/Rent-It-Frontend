import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor } from '@angular/common';
import { ListingService } from '../_services/listing.service';

@Component({
  selector: 'app-dashboard',
  imports: [ListingCardComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  featuredRooms : any[] = [];
  featuredRoommates : any[] = [];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    // Fetch page 0, size 10 
    this.listingService.getRooms(0, 10, 'postedOn', 'desc').subscribe(res => {
      this.featuredRooms = res.content;
    });

    this.listingService.getRoommates(0, 10, 'postedOn', 'desc').subscribe(res => {
      this.featuredRoommates = res.content;
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
