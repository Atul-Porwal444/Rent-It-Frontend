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

  filters = {
    searchQuery: '',
    bhkType: '', // For Rooms
    lookingForGender: '', // For Roommates
    dietaryPreference: '', // For Roommates
    religionPreference: '', // For Roommates
    minRent: null,
    maxRent: null,
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
  }

  // 3. Clear all filters
  resetFilters() {
    this.filters = {
      searchQuery: '', bhkType: '', lookingForGender: '', dietaryPreference: '', religionPreference: '', 
      minRent: null, maxRent: null, isFurnished: false, hasParking: false, 
      waterSupply24x7: false, electricityBackup: false, // NEW
      sortBy: 'postedOn'
    };
    this.applyFilters();
  }

  preventNegative(event: any) {
    if (event.key === '-' || event.key === 'e' || event.key === '+') {
      event.preventDefault();
    }
  }


  loadRoommates() {
    // this.isLoading = true;
    // this.listingService.getRoommates(this.currentPage, this.pageSize, this.sortBy, 'desc').subscribe({
    //   next: (res) => {
    //     this.roommates = res.content;
    //     this.totalPages = res.totalPages;
    //     this.totalElements = res.totalElements;
    //     this.isLoading = false;
    //     window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    //   },
    //   error: (err) => {
    //     console.error('Failed to load rooms', err);
    //     this.isLoading = false;
    //   }
    // });
    const res = {
      "content" : [
        {
          "bhkType" : "1BHK",
          "city" : "Rau",
          "currentRoommates" : 1,
          "description" : "A person who keeps the things clean.",
          "dietaryPreference" : "Vegetarian",
          "electricityBackup" : false,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 2,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/dacc877c-961e-406f-b421-99e0c669c901_IMG-20251003-WA0012.jpg"
          ],
          "location" : "18/B, Swastik Vihar Colony, Rau",
          "lookingForGender" : "Male",
          "neededRoommates" : 1,
          "pincode" : "453331",
          "postedOn" : "2026-02-19",
          "religionPreference" : "Hindu",
          "rentAmount" : 5500.0,
          "state" : "Madhya Pradesh",
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "bhkType" : "1BHK",
          "city" : "Indore",
          "currentRoommates" : 1,
          "description" : "1313",
          "dietaryPreference" : "No Preference",
          "electricityBackup" : true,
          "floorNumber" : 100000,
          "furnished" : true,
          "hasParking" : true,
          "id" : 1,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/beece8d3-7f0f-4aaa-81a8-8f229051ab71_Zephyrus G14_1920x1080.jpg"
          ],
          "location" : "18/B, Swastik Vihar Colony, Rau",
          "lookingForGender" : "Male",
          "neededRoommates" : 1,
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "religionPreference" : "No Preference",
          "rentAmount" : 1000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        }
      ],
      "pageNumber" : 0,
      "pageSize" : 12,
      "totalElements" : 2,
      "totalPages" : 1,
      "last" : true
    }

    this.roommates = res.content;
    this.totalPages = res.totalPages;
    this.totalElements = res.totalElements;
    this.isLoading = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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