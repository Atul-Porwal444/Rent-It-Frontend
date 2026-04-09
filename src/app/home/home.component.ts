import { Component, OnInit } from '@angular/core';
import { ListingService } from '../_services/listing.service';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor, NgIf } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
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

  constructor(private listingService: ListingService, public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        // The moment the user data arrives from the backend, redirect them!
        if (user) {
          this.router.navigate(['/dashboard']);
        }
      }
    });
    this.loadFeaturedRooms();
  }

  loadFeaturedRooms() {

    this.listingService.getPostCards('', 'room').subscribe({
      next: (res) => {
        this.featuredRooms = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
