import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingCardComponent } from '../../shared/listing-card/listing-card.component';
import { ListingService } from '../../_services/listing.service';
import { filter } from 'rxjs';

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


  filters = {
    searchQuery: '',
    bhkType: '', // For both
    lookingForGender: '', // For Roommates
    dietaryPreference: '', // For Roommates
    religionPreference: '', // For Roommates
    maxRent: 50000,
    isFurnished: false,
    hasParking: false,
    waterSupply24x7: false,   // NEW
    electricityBackup: false, // NEW
    sortBy: 'postedOn'
  };

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadRoommates();
  }

  applyFilters() {
    this.currentPage = 0; // Always reset to page 1 when filtering
    this.loadRoommates();
  }

  // 3. Clear all filters
  resetFilters() {
    this.filters = {
      searchQuery: '', bhkType: '', lookingForGender: '', dietaryPreference: '', religionPreference: '', 
      maxRent: 50000, isFurnished: false, hasParking: false, 
      waterSupply24x7: false, electricityBackup: false,
      sortBy: 'postedOn'
    };
    this.applyFilters();
  }


  loadRoommates() {
    this.isLoading = true;

    setTimeout(() => {
        this.listingService.getRoommates(this.filters, this.currentPage, this.pageSize, this.filters.sortBy, 'desc').subscribe({
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
    }, 800);
  }

  // Frontend sorting logic
  sortDataFrontend() {
    if (!this.roommates || this.roommates.length === 0) return;

    if (this.filters.sortBy === 'rentAmountAsc') {
      this.roommates.sort((a, b) => a.rentAmount - b.rentAmount);
    } 
    else if (this.filters.sortBy === 'rentAmountDesc') {
      this.roommates.sort((a, b) => b.rentAmount - a.rentAmount);
    } 
    else if (this.filters.sortBy === 'postedOn') {
      this.roommates.sort((a, b) => new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime());
    }
  }

  get visiblePageNumbers(): (number | string)[] {
    const current = this.currentPage;
    const total = this.totalPages;
    
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    
    if (current <= 2) return [0, 1, 2, 3, '...', total - 1];
    if (current >= total - 3) return [0, '...', total - 4, total - 3, total - 2, total - 1];
    
    return [0, '...', current - 1, current, current + 1, '...', total - 1];
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

  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.loadRoommates();
    }
  }

}