import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListingCardComponent } from '../../shared/listing-card/listing-card.component';
import { ListingService } from '../../_services/listing.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, ListingCardComponent],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];
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
    bhkType: '',
    minRent: null,
    maxRent: null,
    isFurnished: false,
    hasParking: false,
    waterSupply24x7: false,
    electricityBackup: false,
    sortBy: 'postedOn'
  }

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  applyFilters() {
    this.currentPage = 0; // Always reset to page 1 when filtering
  }

  resetFilters() {
    this.filters = {
      searchQuery: '', bhkType: '', minRent: null, maxRent: null,
      isFurnished: false, hasParking: false, waterSupply24x7: false, electricityBackup: false, sortBy: 'postedOn'
    };
    this.applyFilters();
  }

  preventNegative(event: any) {
    if (event.key === '-' || event.key === 'e' || event.key === '+') {
      event.preventDefault();
    }
  }

  loadRooms() {
    console.log("Loaded")
    this.isLoading = true;
    // this.listingService.getRooms(this.currentPage, this.pageSize, this.sortBy, 'desc').subscribe({
    //   next: (res) => {
    //     this.rooms = res.content;
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
          "availabilityStatus" : "Available",
          "bhkType" : "1RK",
          "city" : "Indore",
          "description" : "",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : true,
          "hasParking" : true,
          "id" : 8,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/e168eed3-1fbc-4082-b0d1-7a95d8a008fe_preorder-tshirt_1713852170.png",
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/9eaeaf72-2172-4673-881a-69dd4a36096c_IMG_20230716_184359.jpg",
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/b90d00ac-71a1-4ebf-9284-d7a6e3ac6a11_Atul.png"
          ],
          "location" : "18/B, Swastik Vihar",
          "pincode" : "453331",
          "postedOn" : "2026-02-22",
          "rentAmount" : 1200.0,
          "securityDeposit" : 1200.0,
          "state" : "Madhya Pradesh",
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Abhayapuri",
          "description" : "",
          "electricityBackup" : false,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 9,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/67a21782-9bdb-479f-af91-29e933636181_entityManagerFactory(EntityManagerFactoryBuilder, PersistenceManagedTypes).png",
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/a39bcd8f-8395-40bf-a62d-572018d339fd_WhatsApp Image 2026-02-19 at 12.58.10 AM.jpeg",
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/e5fe2eda-06cd-4406-938f-094f7f20828f_Pi7_Passport_Photo-min.jpeg",
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/266559d0-a941-4680-95d8-1b9495a03d77_Pi7_Passport_Photo.jpeg",
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/d16707d3-3c34-42ee-97ac-380e8d8064c9_Atul.png"
          ],
          "location" : "Indore",
          "pincode" : "546465",
          "postedOn" : "2026-02-22",
          "rentAmount" : 13333.0,
          "securityDeposit" : 121212.0,
          "state" : "Delhi",
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : false
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Rau",
          "description" : "We need only family no under gradutate.",
          "electricityBackup" : false,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 7,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/94408176-6a5d-40c5-9692-41a76139014f_WhatsApp Image 2026-02-19 at 12.58.10 AM.jpeg"
          ],
          "location" : "18/B, Swastik Vihar Colony, Rau",
          "pincode" : "453331",
          "postedOn" : "2026-02-19",
          "rentAmount" : 5500.0,
          "securityDeposit" : 5500.0,
          "state" : "Madhya Pradesh",
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 4,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/2643bbb0-e347-4d86-9d36-40bf495c8d9d_321_ROG Flow X13 (2023) .jpg"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "101010101010",
          "electricityBackup" : false,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : false,
          "id" : 1,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/4d14b53a-0d6f-4042-93fc-4cd0ca15ec22_preorder-tshirt_1713852170.png"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : false
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "qeqeqe",
          "electricityBackup" : false,
          "floorNumber" : 1,
          "furnished" : true,
          "hasParking" : false,
          "id" : 6,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/4db17074-4f60-4472-aee9-84285d264bcf_IMG_20230716_184359.jpg"
          ],
          "location" : "apapapapapap",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 0.0,
          "securityDeposit" : 0.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : false
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : true,
          "hasParking" : true,
          "id" : 5,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/b5a7fcd9-7cc0-4766-85c5-d2a8ce949914_preorder-tshirt_1713852170.png"
          ],
          "location" : "0010010101",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 0.0,
          "securityDeposit" : 0.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Bhopal",
          "description" : "This is for the demo",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 2,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/63a08ee1-f875-4d21-91db-c1f617decb2a_preorder-tshirt_1713852170.png"
          ],
          "location" : "18/B, Swastik Vihar Colony, Rau",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 3,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/2a490a7a-f756-4cf3-a76b-a1e1a83539c5_321_ROG Flow X13 (2023) .jpg"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 3,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/2a490a7a-f756-4cf3-a76b-a1e1a83539c5_321_ROG Flow X13 (2023) .jpg"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 3,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/2a490a7a-f756-4cf3-a76b-a1e1a83539c5_321_ROG Flow X13 (2023) .jpg"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 3,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/2a490a7a-f756-4cf3-a76b-a1e1a83539c5_321_ROG Flow X13 (2023) .jpg"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        },
        {
          "availabilityStatus" : "Available",
          "bhkType" : "1BHK",
          "city" : "Indore",
          "description" : "131313",
          "electricityBackup" : true,
          "floorNumber" : 1,
          "furnished" : false,
          "hasParking" : true,
          "id" : 3,
          "imageUrls" : [
            "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/2a490a7a-f756-4cf3-a76b-a1e1a83539c5_321_ROG Flow X13 (2023) .jpg"
          ],
          "location" : "100",
          "pincode" : null,
          "postedOn" : "2026-02-17",
          "rentAmount" : 10000.0,
          "securityDeposit" : 10000.0,
          "state" : null,
          "userId" : 13,
          "userName" : "Atul Porwal",
          "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
          "waterSupply24x7" : true
        }
      ],
      "pageNumber" : 0,
      "pageSize" : 12,
      "totalElements" : 13,
      "totalPages" : 1,
      "last" : true
    }
    this.rooms = res.content;
    this.totalPages = res.totalPages;
    this.totalElements = res.totalElements;
    this.isLoading = false;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  }

  // Pagination Methods
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadRooms();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadRooms();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadRooms();
  }

  // Create an array for the pagination numbers: [0, 1, 2, ...]
  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i);
  }
}