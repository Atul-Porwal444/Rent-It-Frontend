import { Component, OnInit } from '@angular/core';
import { ListingService } from '../_services/listing.service';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  imports: [ListingCardComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredRooms: any[]= [];
  isLoading = true;

  constructor(private listingService: ListingService, public authService: AuthService) {}

  ngOnInit(): void {
    this.loadFeaturedRooms();
  }

  loadFeaturedRooms() {
    const storedUser = localStorage.getItem("user");
    let user = {
      searchQuery: ''
    };
    if(storedUser) {
      user.searchQuery = JSON.parse(storedUser).targetCity;
    }

    this.listingService.getRooms(user, 0, 4, 'postedOn', 'desc').subscribe({
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
