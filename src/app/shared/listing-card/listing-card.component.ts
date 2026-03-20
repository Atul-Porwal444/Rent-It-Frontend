import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listing-card',
  imports: [],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent implements OnInit {
  // Data passed from the parent
  @Input() data: any;
  @Input() type : 'ROOM' | 'ROOMMATE' = 'ROOM';

  currentImageIndex = 0;

  constructor(private router: Router) {}
  
  ngOnInit(): void {}

  get currentImage(): string {
    if (this.data?.imageUrls && this.data.imageUrls.length > 0) {
      return this.data.imageUrls[0]; // Only fetch the first image
    }
    return 'https://placehold.co/600x400/1e1e1e/888888?text=No+Image';
  }

  handleClick() {
    if (this.type === 'ROOM') {
      this.router.navigate(['/room-details', this.data.id]);
    } else {
      this.router.navigate(['/roommate-details', this.data.id]);
    }
  }

}
