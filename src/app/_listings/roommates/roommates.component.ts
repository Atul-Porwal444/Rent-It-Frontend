import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingCardComponent } from '../../shared/listing-card/listing-card.component';
import { ListingService } from '../../_services/listing.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, ListingCardComponent],
  templateUrl: './roommates.component.html',
  styleUrls: ['./roommates.component.css']
})
export class RoommatesComponent implements OnInit {

  roommates: any[] = [];
  isLoading = true;

  // Pagination Variables
  currentPage = 0;
  pageSize = 12; // 12 is great for a 4-column or 3-column grid
  totalPages = 0;
  totalElements = 0;

  // Filter Variables (For UI - you can connect these to backend later)
  searchCity = '';
  sortBy = 'postedOn';

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadRoommates();
  }

  loadRoommates() {
    this.isLoading = true;
    this.listingService.getRoommates(this.currentPage, this.pageSize, this.sortBy, 'desc').subscribe({
      next: (res) => {
        this.roommates = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.isLoading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
      },
      error: (err) => {
        console.error('Failed to load rooms', err);
        this.isLoading = false;
      }
    });
  }

  // Pagination Methods
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadRoommates();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadRoommates();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadRoommates();
  }

  // Create an array for the pagination numbers: [0, 1, 2, ...]
  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i);
  }
}