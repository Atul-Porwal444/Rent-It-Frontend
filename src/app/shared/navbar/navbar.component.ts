import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PostAdComponent } from '../../_post-ad/post-ad/post-ad.component';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, PostAdComponent, RouterLinkActive, NgClass, NgFor, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userName: String = '';
  userImage: String = '';

  isNotificationOpen = false;
  hasUnreadNotifications = true;

  // New States for API
  isLoadingNotifications = false;
  notificationsError = false;
  notifications: any[] = [];

  // Controls modal visibility
  showPostModal = false;
  currentAdType: 'room' | 'roommate' = 'room';

  constructor(public authService: AuthService, private profileService: ProfileService ,private router: Router,) {}

  ngOnInit(): void {
    this.loadUser();

    if (this.authService.isLoggedIn()) { 
      this.fetchNotificationsSilent(); 
    }
  }

  loadUser() : void {
    const userStr = localStorage.getItem('user');
    if(userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.name;
      this.userImage = user.profileUrl || "public/default-avatar.ico";
    }
  }

  // --- Notification Logic ---

  fetchNotificationsSilent() {
    this.hasUnreadNotifications = false;
    this.profileService.checkUnreadNotifications().subscribe({
      next: (hasUnread: boolean) => {
        this.hasUnreadNotifications = hasUnread;
      },
      error: (err) => console.error("Silently failed to check unread notifications", err)
    });
  }

  toggleNotifications(event: Event) {
    event.stopPropagation();
    
    if (this.isNotificationOpen) {
      this.closeNotifications(); // Close and mark as read
    } else {
      this.isNotificationOpen = true; 
      this.fetchNotifications(); // Open and fetch
    }
  }

  closeNotifications() {
    if (this.isNotificationOpen) {
      this.isNotificationOpen = false;
      if(this.hasUnreadNotifications) this.markAllAsReadAPI();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.closeNotifications();
  }

  onDropdownClick(event: Event) {
    event.stopPropagation();
  }

  fetchNotifications() {
    this.isLoadingNotifications = true;
    this.notificationsError = false;

    this.profileService.getNotifications().subscribe({
      next: (res: any[]) => {
        // Map backend DTO to frontend UI format
        this.notifications = res.map(notif => {
          const styles = this.getNotificationStyles(notif.type);
          return {
            id: notif.id,
            message: notif.message,
            time: this.getTimeAgo(notif.createdAt),
            isRead: notif.read,  // Ensure this matches your backend DTO property 'read'
            icon: styles.icon,
            color: styles.color,
            bg: styles.bg
          };
        });

        this.notifications.sort((a, b) => {
          if (a.isRead !== b.isRead) {
            return a.isRead - b.isRead;
          }
        
          return b.time - a.time;
        });

        this.isLoadingNotifications = false;
      },
      error: (err) => {
        console.error("Error fetching notifications", err);
        this.notificationsError = true;
        this.isLoadingNotifications = false;
      }
    });
  }

  markAllAsReadAPI() {
    if (!this.hasUnreadNotifications) return; // Don't call API if there's nothing to update

    // Optimistic UI update for snappy feel
    this.hasUnreadNotifications = false;
    this.notifications.forEach(n => n.isRead = true);

    // Actual API Call
    this.profileService.markAllNotificationsAsRead().subscribe({
      next: () => console.log("All notifications marked as read."),
      error: (err) => console.error("Failed to mark notifications as read", err)
    });
  }

  private getNotificationStyles(type: string) {
    switch (type?.toLowerCase()) {
      case 'save': return { icon: 'bi-heart-fill', color: 'text-danger', bg: 'bg-danger-subtle' };
      case 'message': return { icon: 'bi-chat-dots-fill', color: 'text-primary', bg: 'bg-primary-subtle' };
      case 'match': return { icon: 'bi-house-door-fill', color: 'text-purple', bg: 'bg-purple-subtle' };
      case 'system': return { icon: 'bi-stars', color: 'text-warning', bg: 'bg-warning-subtle' };
      case 'alert': return { icon: 'bi-exclamation-circle-fill', color: 'text-warning', bg: 'bg-warning-subtle' };
      default: return { icon: 'bi-bell-fill', color: 'text-secondary', bg: 'bg-dark' };
    }
  }

  private getTimeAgo(dateInput: string): string {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    // Fallback to standard date format if older than a week
    return date.toLocaleDateString(); 
  }

  // --- User Actions ---

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], {replaceUrl: true});
  }

  openPostModal(type: 'room' | 'roommate') {
    this.currentAdType = type;
    this.showPostModal = true;
  }

}
