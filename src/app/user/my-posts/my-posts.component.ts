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
  isLoading = true;
  isDeleting = false;

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.isLoading = true;
    // let completed = 0;

    // const checkDone = () => {
    //   completed++;
    //   if(completed >= 2) this.isLoading = false;
    // };

    // this.listingService.getMyRooms().subscribe({
    //   next: (res) => { this.myRooms = res, checkDone() },
    //   error: (err) => { checkDone() }
    // });

    // this.listingService.getMyRoommates().subscribe({
    //   next: (res) => { this.myRoommates = res, checkDone() },
    //   error: (err) => { checkDone() }
    // });

    this.myRooms = [{
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
    }];
    this.checkIfDone();

    this.myRoommates = [{
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
    }];
    this.checkIfDone();
  }

  private requestCompleted = 0;
  checkIfDone() {
    this.requestCompleted++;
    if(this.requestCompleted >= 2) {
      this.isLoading = false;
      this.requestCompleted = 0;
    }
  }

  setTab(tab: 'rooms' | 'roommates') {
    this.activeTab = tab;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  editPost(type: 'room' | 'roommate', id: number, event: Event) {
    this.stopPropagation(event);
    // will the functionality to edit the post
    alert("This functionality will be added soon....");
  } 

  deletePost(type: 'room' | 'roommate', id: number, event: Event) {
    this.stopPropagation(event);

    if(!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    this.isDeleting = true;

    if(type === 'room') {
      this.listingService.deleteRoom(id).subscribe({
        next: () => {
          this.myRooms = this.myRooms.filter(r => r.id !== id);
          this.isDeleting = false;
        },
        error: (err) => { alert("Failed to delete the room post"); this.isDeleting = false }
      });
    } else {
      this.listingService.deleteRoommate(id).subscribe({
        next: () => {
          this.myRoommates = this.myRoommates.filter(r => r.id !== id);
          this.isDeleting = false;
        },
        error: (err) => { alert("Failed to delete the roommate post"); this.isDeleting = false }
      });
    }
  }

}
