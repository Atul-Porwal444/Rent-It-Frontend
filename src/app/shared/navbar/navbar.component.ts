import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PostAdComponent } from '../../_post-ad/post-ad/post-ad.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, PostAdComponent, RouterLinkActive, NgClass, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userName: String = '';
  userImage: String = '';

  isNotificationOpen = false;
  hasUnreadNotifications = true;

  notifications = [
    { id: 1, type: 'save', message: 'Rahul saved your room in Vijay Nagar.', time: '28 minutes ago', isRead: false, icon: 'bi-heart-fill', color: 'text-danger', bg: 'bg-danger-subtle' },
    { id: 2, type: 'message', message: 'Priya is interested in your Roommate request.', time: 'a day ago', isRead: false, icon: 'bi-chat-dots-fill', color: 'text-primary', bg: 'bg-primary-subtle' },
    { id: 3, type: 'alert', message: 'Your post for 2BHK in Palasia is now live.', time: '2 days ago', isRead: true, icon: 'bi-check-circle-fill', color: 'text-success', bg: 'bg-success-subtle' },
    { id: 4, type: 'system', message: 'Welcome to RentIt! Complete your profile.', time: '3 days ago', isRead: true, icon: 'bi-person-fill', color: 'text-warning', bg: 'bg-warning-subtle' },
    { id: 5, type: 'save', message: 'Someone saved your room post.', time: '4 days ago', isRead: true, icon: 'bi-heart-fill', color: 'text-danger', bg: 'bg-danger-subtle' },
    { id: 6, type: 'system', message: 'Email verification successful.', time: '4 days ago', isRead: true, icon: 'bi-shield-lock-fill', color: 'text-info', bg: 'bg-info-subtle' },
    { id: 7, type: 'match', message: 'New 1BHK added in your preferred area.', time: '5 days ago', isRead: true, icon: 'bi-house-door-fill', color: 'text-purple', bg: 'bg-purple-subtle' },
    { id: 8, type: 'match', message: 'New roommate looking in Vijay Nagar.', time: '6 days ago', isRead: true, icon: 'bi-people-fill', color: 'text-purple', bg: 'bg-purple-subtle' },
    { id: 9, type: 'alert', message: 'Security tip: Never share your OTP.', time: '1 week ago', isRead: true, icon: 'bi-info-circle-fill', color: 'text-secondary', bg: 'bg-dark' },
    { id: 10, type: 'system', message: 'Account created successfully.', time: '1 week ago', isRead: true, icon: 'bi-stars', color: 'text-warning', bg: 'bg-warning-subtle' },
  ];

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.isNotificationOpen = !this.isNotificationOpen;

    if(this.isNotificationOpen) {
      this.hasUnreadNotifications = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isNotificationOpen = false;
  }

  onDropdownClick(event: Event) {
    event.stopPropagation();
  }

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
