import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListingService } from '../../_services/listing.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-roommate-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './roommate-details.component.html',
  styleUrl: './roommate-details.component.css'
})
export class RoommateDetailsComponent implements OnInit, OnDestroy {

  roommate: any = null;
  currentImageIndex = 0;
  showContact: boolean = false;

   //contact owner variable
   isOwner: boolean = false;
   showDMModal: boolean = false;
   isSendingDM: boolean = false;

  // UI States
  isLoading = true;
  apiError = '';
  isSaving: boolean = false;
  isProcessingGlobally = false;

  // Toast Variables
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
      private route: ActivatedRoute,
      private listingService: ListingService,
      private router: Router,
      public authService: AuthService
  ) {}

  ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if(idParam) {
        this.loadRoommateDetails(Number(idParam))
      } else {
        this.router.navigate(['/roommates']);
      }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  // --- Toast Notification ---
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3500);
  }

  loadRoommateDetails(id: number) {
    this.isLoading = true;
    this.apiError = '';

    // Fetching Roommate Details
    this.listingService.getRoommateById(id).subscribe({
      next: (res) => {
        this.roommate = res;

        const userStr = localStorage.getItem('user');
        if (userStr) {
          const currentUser = JSON.parse(userStr);
          // Assuming your backend returns userEmail or userId to compare
          this.isOwner = currentUser.id === this.roommate.userId; 
        }

        this.finalizeLoading();
      },
      error: (err) => {
        console.error("Failed to load roommate details", err);
        this.apiError = "Unable to fetch the roommate details. The post may have been removed.";
        this.isLoading = false;
      }
    });
  }

  openDMModal() {
    this.showDMModal = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeDMModal() {
    this.showDMModal = false;
    document.body.style.overflow = '';
  }

  confirmSendDM() {
    this.isSendingDM = true;
    this.listingService.contactOwner('roommate', this.roommate.id).subscribe({
      next: () => {
        this.showToast("Contact request sent! The owner will receive your email.", 'success');
        this.isSendingDM = false;
        this.closeDMModal();
      },
      error: (err) => {
        this.showToast("Failed to send message. Please try again.", 'error');
        this.isSendingDM = false;
        this.closeDMModal();
      }
    });
  }

  private finalizeLoading() {
    this.isLoading = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setMainImage(index: number) {
    this.currentImageIndex = index;
  }

  revealContact() {
    this.showContact = true;
  }

  toggleSave() {
    if (!this.authService.isLoggedIn()) {
      this.showToast("Please login to save posts.", 'error');
      this.router.navigate(['/login']);
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    // Call Backend API to toggle save status
    this.listingService.toggleSave('roommate', this.roommate.id).subscribe({
      next: (res) => {
        // Toggle the UI state instantly
        this.roommate.savedByUser = !this.roommate.savedByUser;
        
        const msg = this.roommate.savedByUser ? "Post saved successfully!" : "Post removed from favorites.";
        this.showToast(msg, 'success');
        this.isSaving = false;
      },
      error: (err) => {
        console.error("Failed to toggle save status", err);
        this.showToast("Unable to update saved status. Please try again.", 'error');
        this.isSaving = false;
      }
    });
  }

  contactOnWhatsApp() {
    if(!this.roommate?.showPhone) {
      return;
    }

    let phone = this.roommate.userPhone.replace(/\D/g, '');

    if(phone.length === 10) {
      phone = '91' + phone;
    }

    const message = `Hi ${this.roommate.userName}, I saw your ${this.roommate.bhkType} room listed in ${this.roommate.location} for ₹${this.roommate.rentAmount} on RentIt. Is it still available?`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_black');
  }

}
