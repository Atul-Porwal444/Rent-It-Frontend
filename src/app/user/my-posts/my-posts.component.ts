import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../_services/listing.service';
import e from 'express';
import { CommonModule } from '@angular/common';
import { ListingCardComponent } from '../../shared/listing-card/listing-card.component';
import { RouterLink } from '@angular/router';
import { HorizontalListingCardComponent } from '../../shared/horizontal-listing-card/horizontal-listing-card.component';

@Component({
  selector: 'app-my-posts',
  imports: [CommonModule, HorizontalListingCardComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {

  activeTab: 'rooms' | 'roommates' = 'rooms';

  myRooms: any[] = [];
  myRoommates: any[] = [];

  // UI States
  isLoading = true;
  isDeletingGlobally = false;
  isUpdatingStatusGlobally = false;

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
    return this.myRooms.slice(start, start + this.pageSize);
  }

  get totalRoomPages() {
    return Math.ceil(this.myRooms.length / this.pageSize);
  }

  get paginatedRoommates() {
    const start = this.currentRoommatePage * this.pageSize;
    return this.myRoommates.slice(start, start + this.pageSize);
  }

  get totalRoommatePages() {
    return Math.ceil(this.myRoommates.length / this.pageSize);
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

    let completedRequests = 0;

    const checkCompletion = () => {
      completedRequests++;
      if (completedRequests >= 2) {
        this.isLoading = false;
      }
    };

    // Simulating API delay for shimmer effect
    setTimeout(() => {
     
      this.listingService.getMyRooms().subscribe({
        next: (res) => {
          this.myRooms = res;
          checkCompletion();
        },
        error: (err) => {
          this.showToast("Unable to fetch posts", 'error');
          checkCompletion();
        }
      });

      this.listingService.getMyRoommates().subscribe({
        next: (res) => {
          this.myRoommates = res;
          checkCompletion();
        },
        error: (err) => {
          this.showToast("Unable to fetch post", 'error');
          checkCompletion();
        }
      });
    }, 800);
  }


  setTab(tab: 'rooms' | 'roommates') {
    this.activeTab = tab;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleStatus(type: 'room' | 'roommate', post: any, event: Event) {
    this.stopPropagation(event);
    this.isUpdatingStatusGlobally = true; // Block UI

    if (type === 'room') {
      this.listingService.updateRoomStatus(post.id).subscribe({
        next: () => {
          // Flip the status locally so the UI updates instantly
          post.availabilityStatus = !post.availabilityStatus;
          
          const statusText = post.availabilityStatus ? 'Available' : 'Unavailable';
          this.showToast(`Room marked as ${statusText}.`, 'success');
          this.isUpdatingStatusGlobally = false;
        },
        error: (err) => {
          this.showToast("Failed to update status. Please try again.", 'error');
          this.isUpdatingStatusGlobally = false;
        }
      });
    } else {
      this.listingService.updateRoommateStatus(post.id).subscribe({
        next: () => {
          post.availabilityStatus = !post.availabilityStatus;
          
          const statusText = post.availabilityStatus ? 'Available' : 'Unavailable';
          this.showToast(`Roommate post marked as ${statusText}.`, 'success');
          this.isUpdatingStatusGlobally = false;
        },
        error: (err) => {
          this.showToast("Failed to update status. Please try again.", 'error');
          this.isUpdatingStatusGlobally = false;
        }
      });
    }
  }

  deletePost(type: 'room' | 'roommate', id: number, event: Event) {
    this.stopPropagation(event);
    
    this.isDeletingGlobally = true; // Blocks UI

    if(type === 'room') {
      this.listingService.deleteRoom(id).subscribe({
        next: () => {
          this.myRooms = this.myRooms.filter(r => r.id !== id);
          
          // Fix pagination if last item on page is deleted
          if (this.currentRoomPage >= this.totalRoomPages && this.currentRoomPage > 0) {
            this.currentRoomPage--;
          }

          this.showToast("Room post deleted successfully.", 'success');
          this.isDeletingGlobally = false;
        },
        error: (err) => { 
          this.showToast("Failed to delete the room post.", 'error');
          this.isDeletingGlobally = false; 
        }
      });
    } else {
      this.listingService.deleteRoommate(id).subscribe({
        next: () => {
          this.myRoommates = this.myRoommates.filter(r => r.id !== id);
          
          if (this.currentRoommatePage >= this.totalRoommatePages && this.currentRoommatePage > 0) {
            this.currentRoommatePage--;
          }

          this.showToast("Roommate post deleted successfully.", 'success');
          this.isDeletingGlobally = false;
        },
        error: (err) => { 
          this.showToast("Failed to delete the roommate post.", 'error');
          this.isDeletingGlobally = false; 
        }
      });
    }
  }

}
