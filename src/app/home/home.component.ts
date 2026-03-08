import { Component, OnInit } from '@angular/core';
import { ListingService } from '../_services/listing.service';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ListingCardComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredRooms: any[]= [];
  isLoading = true;

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadFeaturedRooms();
  }

  loadFeaturedRooms() {
    this.listingService.getRooms({}, 0, 4, 'postedOn', 'desc').subscribe({
      next: (res) => {
        this.featuredRooms = res.content || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
