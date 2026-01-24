import { Component, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listing-card',
  imports: [NgIf],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.css'
})
export class ListingCardComponent {
  // Data passed from the parent (Dashboard)
  @Input() data: any;
  @Input() type : 'ROOM' | 'ROOMMATE' = 'ROOM';

  constructor(private auth: AuthService, private router: Router) {}

  handleClick() {
    if(this.auth.isLoggedIn()) {
      // If logged in then go to details (build later)
      alert(`Navigating to ${this.type} ID: ${this.data.id}`);
    } else {
      // If NOT logged in, go to login
      const confirmLogin = confirm("You must be logged in to view details. Go to Login?");
      if(confirmLogin) this.router.navigate(['/login']);
    }
  }

}
