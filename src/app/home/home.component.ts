import { Component, OnInit } from '@angular/core';
import { ListingService } from '../_services/listing.service';
import { ListingCardComponent } from '../shared/listing-card/listing-card.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ListingCardComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredRooms: any[]= [];
  isLoading = true;

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadFeaturedRooms();
  }

  loadFeaturedRooms() {
    // this.listingService.getRooms({}, 0, 4, 'postedOn', 'desc').subscribe({
    //   next: (res) => {
    //     this.featuredRooms = res.content || [];
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.isLoading = false;
    //   }
    // });
    setTimeout(() => {
      this.featuredRooms = [{
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
      }];
      this.isLoading = false;
    }, 1000);
  }

}
