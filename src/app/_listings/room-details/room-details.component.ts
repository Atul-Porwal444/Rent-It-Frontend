import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../_services/listing.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,
    private listingServie: ListingService,
    private router: Router
  ) {}

  ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if(idParam) {
        this.loadRoomDetails(Number(idParam));
      } else {
        this.router.navigate(['/rooms']);
      }
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
      "userProfileImageUrl" : "https://ui-avatars.com/api/?background=random&name=Atul Porwal",
      "waterSupply24x7" : false
    }
    this.isLoading = false;
    window.scrollTo(0, 0);
  }

  setMainImage(index: number) {
    this.currentImageIndex = index;
  }

}
