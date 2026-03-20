import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horizontal-listing-card',
  imports: [NgIf, NgFor, NgClass, DatePipe, DecimalPipe],
  templateUrl: './horizontal-listing-card.component.html',
  styleUrl: './horizontal-listing-card.component.css'
})
export class HorizontalListingCardComponent {

  @Input() data: any;
  @Input() type: 'ROOM' | 'ROOMMATE' = 'ROOM';

  currentImageIndex = 0;

  constructor(private router: Router) {}

  getCurrentImage(): String {
    if(this.data?.imageUrls && this.data.imageUrls.length > 0) {
      return this.data.imageUrls[this.currentImageIndex];
    }
    return 'https://placehold.co/600x400/1e1e1e/888888?text=No+Image';
  }

  // Add this inside your component class
  get currentImage(): string {
    // Check if data exists and has at least one image
    if (this.data?.imageUrls && this.data.imageUrls.length > 0) {
      
      // If this is the SMALL card (listing-card), just return the first image:
      // return this.data.imageUrls[0]; 
      
      // OR, if this is the HORIZONTAL card with the slider, use the index:
      return this.data.imageUrls[this.currentImageIndex || 0]; 
    }
    
    // Fallback placeholder if the user didn't upload any images
    return 'https://placehold.co/600x400/1e1e1e/888888?text=No+Image';
  }

  nextImage(event : Event) {
    event.stopPropagation();
    if (this.data?.imageUrls && this.currentImageIndex < this.data.imageUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage(event : Event) {
    event.stopPropagation();
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  handleClick() {
    if (this.type === 'ROOM') {
      this.router.navigate(['/rooms', this.data.id]);
    } else {
      this.router.navigate(['/roommates', this.data.id]);
    }
  }

}
