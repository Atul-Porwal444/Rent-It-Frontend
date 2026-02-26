import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../_services/listing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roommate-details',
  imports: [CommonModule],
  templateUrl: './roommate-details.component.html',
  styleUrl: './roommate-details.component.css'
})
export class RoommateDetailsComponent implements OnInit {

  roommate: any = null;
  isLoading = true;
  currentImageIndex = 0;
  showContact: boolean = false;

  isSaved: boolean = false;
  isSaving: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private listingService: ListingService,
      private router: Router
  ) {}

  ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if(idParam) {
        this.loadRoommateDetails(Number(idParam))
      } else {
        this.router.navigate(['/roommates']);
      }
  }
  checkIfSaved(id: number) {
    // if (this.authService.isLoggedIn()) {
    //   this.listingService.checkSaveStatus('roommate', id).subscribe({
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
    // this.listingService.toggleSave('room', this.roommate.id).subscribe({
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

  loadRoommateDetails(id: number) {
    this.roommate = {
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
        "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/dacc877c-961e-406f-b421-99e0c669c901_IMG-20251003-WA0012.jpg",
        "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/a39bcd8f-8395-40bf-a62d-572018d339fd_WhatsApp Image 2026-02-19 at 12.58.10 AM.jpeg",
        "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/e5fe2eda-06cd-4406-938f-094f7f20828f_Pi7_Passport_Photo-min.jpeg",
        "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/266559d0-a941-4680-95d8-1b9495a03d77_Pi7_Passport_Photo.jpeg",
        "https://fizubunuyqbpsybvudgc.supabase.co/storage/v1/object/public/images/d16707d3-3c34-42ee-97ac-380e8d8064c9_Atul.png"
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
      "userEmail" : "aatulporwal999@gmail.com",
      "userPhone": "+91 8823858776",
      "waterSupply24x7" : true
    }
    this.isLoading = false;
    this.checkIfSaved(id);
    window.scrollTo(0, 0);
  }

  setMainImage(index: number) {
    this.currentImageIndex = index;
  }

  revealContact() {
    this.showContact = true;
  }


}
