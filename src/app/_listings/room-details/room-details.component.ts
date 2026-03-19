import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListingService } from '../../_services/listing.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-room-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit {

  room: any = null;
  currentImageIndex = 0;
  showContact: boolean = false;

  // UI States
  isLoading = true;
  apiError = '';
  isSaving: boolean = false; 
  isProcessingGlobally = false;

  // Toast Variables
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if(idParam) {
        this.loadRoomDetails(Number(idParam));
      } else {
        this.router.navigate(['/rooms']);
      }
  }

  // --- Toast Notification ---
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3500);
  }

  loadRoomDetails(id: number) {
    this.isLoading = true;
    this.apiError = '';

    // Fetching Room Details
    this.listingService.getRoomById(id).subscribe({
      next: (res) => {
        this.room = res;
        this.finalizeLoading();
      },
      error: (err) => {
        console.error("Failed to load room details", err);
        this.apiError = "Unable to fetch the room details. The post may have been removed.";
        this.isLoading = false;
      }
    });
  }

  private finalizeLoading() {
    this.isLoading = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setMainImage(index: number) {
    this.currentImageIndex = index;
  }

  revealContact() {
    if (!this.authService.isLoggedIn()) {
      this.showToast("Please login to view contact details.", 'error');
      this.router.navigate(['/login']);
      return;
    }
    this.showContact = true;
  }

  toggleSave() {
    if (!this.authService.isLoggedIn()) {
      this.showToast("Please login to save posts.", 'error');
      this.router.navigate(['/login']);
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    // Call Backend API to toggle save status
    this.listingService.toggleSave('room', this.room.id).subscribe({
      next: (res) => {
        // Toggle the UI state instantly
        this.room.savedByUser = !this.room.savedByUser;
        
        const msg = this.room.savedByUser ? "Post saved successfully!" : "Post removed from favorites.";
        this.showToast(msg, 'success');
        this.isSaving = false;
      },
      error: (err) => {
        console.error("Failed to toggle save status", err);
        this.showToast("Unable to update saved status. Please try again.", 'error');
        this.isSaving = false;
      }
    });
  }
}
