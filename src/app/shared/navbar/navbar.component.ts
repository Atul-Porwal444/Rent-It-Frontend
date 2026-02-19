import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PostAdComponent } from '../../_post-ad/post-ad/post-ad.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, PostAdComponent, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userName: String = '';
  userImage: String = '';

  // Controls modal visibility
  showPostModal = false;
  currentAdType: 'room' | 'roommate' = 'room';

  constructor(public authService : AuthService, private router: Router) {}

  ngOnInit(): void {
      this.loadUser();
  }

  loadUser() : void {
    const userStr = localStorage.getItem('user');
    if(userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.name;

      this.userImage = user.profileUrl || "public/default-avatar.ico";
    }
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  // Function to open modal
  openPostModal(type: 'room' | 'roommate') {
    // if(localStorage.getItem('token') === null) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.currentAdType = type;
    this.showPostModal = true;
  }

}
