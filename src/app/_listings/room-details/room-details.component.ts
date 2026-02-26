import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../_services/listing.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-room-details',
  imports: [CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit {

  room: any = null;
  isLoading = true;
  currentImageIndex = 0;
  showContact: boolean = false;

  // NEW: Tracking save state
  isSaved: boolean = false; 
  isSaving: boolean = false; // Prevents spam clicking

  constructor(
    private route: ActivatedRoute,
    private listingServie: ListingService,
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

  checkIfSaved(id: number) {
    // if (this.authService.isLoggedIn()) {
    //   this.listingService.checkSaveStatus('room', id).subscribe({
    //     next: (status) => this.isSaved = status
    //   });
    // }
    this.isSaved = true;
  }

  toggleSave() {
    // 1. Redirect if not logged in
    // if (!this.authService.isLoggedIn()) {
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // 2. Prevent spam clicks
    // if (this.isSaving) return; 

    this.isSaving = true;
    
    // 3. Optimistic UI update (feels instant to the user)
    this.isSaved = !this.isSaved;

    // 4. API Call
    // this.listingService.toggleSave('room', this.room.id).subscribe({
    //   next: () => {
    //     this.isSaving = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     // Revert if API fails
    //     this.isSaved = !this.isSaved;
    //     this.isSaving = false;
    //     alert("Failed to save post");
    //   }
    // });
    this.isSaving = false;
  }

  loadRoomDetails(id: number) {
    this.room = {
      "availabilityStatus" : "Available",
      "bhkType" : "1BHK",
      "city" : "Abhayapuri",
      "description" : "This is the demo des",
      "electricityBackup" : true,
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
      "userProfileImageUrl" : "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/266559d0-a941-4680-95d8-1b9495a03d77_Pi7_Passport_Photo.jpeg",
      "userEmail" : "aatulporwal999@gmail.com",
      "userPhone": "+91 8823858776",
      "waterSupply24x7" : false
    }
    this.isLoading = false;
    this.checkIfSaved(id); // Check status after loading details
    window.scrollTo(0, 0);
  }

  setMainImage(index: number) {
    this.currentImageIndex = index;
  }

  revealContact() {
    this.showContact = true;
  }

}
