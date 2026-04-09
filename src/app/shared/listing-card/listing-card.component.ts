import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit(): void {}

  get currentImage(): string {
    if (this.data?.imageUrls) {
      return this.data.imageUrls; // Only fetch the first image
    }
    return 'https://placehold.co/600x400/1e1e1e/888888?text=No+Image';
  }

  handleClick() {

    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.type === 'ROOM') {
      this.router.navigate(['/rooms', this.data.id]);
    } else {
      this.router.navigate(['/roommates', this.data.id]);
    }
  }

}
