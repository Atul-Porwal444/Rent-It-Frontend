import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../_services/listing.service';
import e from 'express';
import { CommonModule } from '@angular/common';
import { ListingCardComponent } from '../../shared/listing-card/listing-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-posts',
  imports: [CommonModule, ListingCardComponent],
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

    // Simulating API delay for shimmer effect
    setTimeout(() => {
     
      this.listingService.getMyRooms().subscribe({
        next: (res) => {
          this.myRooms = res;
        },
        error: (err) => {
        }
      });

      this.listingService.getMyRoommates().subscribe({
        next: (res) => {
          this.myRoommates = res;
        },
        error: (err) => {

        }
      });
      this.isLoading = false;
    }, 800);
  }


  setTab(tab: 'rooms' | 'roommates') {
    this.activeTab = tab;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  deletePost(type: 'room' | 'roommate', id: number, event: Event) {
    this.stopPropagation(event);

    if(!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

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
