import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../_services/listing.service';
import { CommonModule } from '@angular/common';
import { ListingCardComponent } from '../../shared/listing-card/listing-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-posts',
  imports: [CommonModule, ListingCardComponent, RouterLink],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css'
})
export class SavedPostsComponent implements OnInit {
  
  activeTab: 'rooms' | 'roommates' = 'rooms';

  savedRooms: any[] = [];
  savedRoommates: any[] = [];

  // UI States
  isLoading = true;
  isProcessingGlobally = false;
  apiError = '';

  // Toast Variables
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  // Frontend Pagination Variables
  pageSize = 8;
  currentRoomPage = 0;
  currentRoommatePage = 0;
  

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // --- Pagination Getters ---
  get paginatedRooms() {
    const start = this.currentRoomPage * this.pageSize;
    return this.savedRooms.slice(start, start + this.pageSize);
  }

  get totalRoomPages() {
    return Math.ceil(this.savedRooms.length / this.pageSize);
  }

  get paginatedRoommates() {
    const start = this.currentRoommatePage * this.pageSize;
    return this.savedRoommates.slice(start, start + this.pageSize);
  }

  get totalRoommatePages() {
    return Math.ceil(this.savedRoommates.length / this.pageSize);
  }

  // Pagination Controls
  changeRoomPage(page: number) {
    this.currentRoomPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeRoommatePage(page: number) {
    this.currentRoommatePage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Toast Notification ---
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3500);
  }

  loadData() {
    this.isLoading = true;
    this.apiError = '';

    let completedRequests = 0;

    const checkCompletion = () => {
      completedRequests++;
      if (completedRequests >= 2) {
        this.isLoading = false;
      }
    };

    this.listingService.getMySavedRooms().subscribe({
      next: (res) => {
        this.savedRooms = res;
        checkCompletion();
      },
      error: (err) => {
        console.error(err);
        this.apiError = "Failed to load your saved posts. Please try again later.";
        checkCompletion();
      }
    });

    this.listingService.getMySavedRoommates().subscribe({
      next: (res) => {
        this.savedRoommates = res;
        checkCompletion();
      },
      error: (err) => {
        console.error(err);
        this.apiError = "Failed to load your saved posts. Please try again later.";
        checkCompletion();
      }
    });
  }

  setTab(tab: 'rooms' | 'roommates') {
    this.activeTab = tab;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  unsavePost(type: 'room' | 'roommate', id: number, event: Event) {
    this.stopPropagation(event);
    this.isProcessingGlobally = true; // Block UI and show loader

    if (type === 'room') {
      
      this.listingService.toggleSavedRoom(id).subscribe({
        next: (res) => {
          // Removing the post from the frontend array
          this.savedRooms = this.savedRooms.filter(r => r.id !== id);
          
          // Adjusting pagination if we deleted the last item on the current page
          if (this.currentRoomPage >= this.totalRoomPages && this.currentRoomPage > 0) {
            this.currentRoomPage--;
          }
          
          this.showToast("Room removed from saved list.", 'success');
          this.isProcessingGlobally = false;
        },
        error: (err) => {
          console.error(err);
          this.showToast(err.error?.message || "Failed to unsave room. Please try again.", 'error');
          this.isProcessingGlobally = false;
        }
      });

    } else {

      this.listingService.toggleSavedRoommate(id).subscribe({
        next: (res) => {
          // Remove the post from the frontend array
          this.savedRoommates = this.savedRoommates.filter(r => r.id !== id);
          
          // Adjust pagination if we deleted the last item on the current page
          if (this.currentRoommatePage >= this.totalRoommatePages && this.currentRoommatePage > 0) {
            this.currentRoommatePage--;
          }
          
          this.showToast("Roommate removed from saved list.", 'success');
          this.isProcessingGlobally = false;
        },
        error: (err) => {
          console.error(err);
          this.showToast(err.error?.message || "Failed to unsave roommate. Please try again.", 'error');
          this.isProcessingGlobally = false;
        }
      });
    }
  }
}
