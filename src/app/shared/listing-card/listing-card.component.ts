import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listing-card',
  imports: [NgIf, NgFor],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent implements OnInit {
  // Data passed from the parent (Dashboard)
  @Input() data: any;
  @Input() type : 'ROOM' | 'ROOMMATE' = 'ROOM';

  currentImageIndex = 0;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {}

  // Get the current image or a placeholder if none exist
  get currentImage(): string {
    if (this.data?.imageUrls && this.data.imageUrls.length > 0) {
      return this.data.imageUrls[this.currentImageIndex];
    }
    return 'https://placehold.co/600x400/1e1e1e/888888?text=No+Image';
  }

  nextImage(event: Event) {
    event.stopPropagation(); // Prevents triggering the card's handleClick
    if (this.data?.imageUrls && this.currentImageIndex < this.data.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage(event: Event) {
    event.stopPropagation(); // Prevents triggering the card's handleClick
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  handleClick() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      const route = this.type === 'ROOM' ? '/rooms' : '/roommates';
      this.router.navigate([route, this.data.id]);
    }
  }

}
