import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../_services/profile.service';
import { UserProfile } from '../../_models/user-profile';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [NgIf, FormsModule, NgFor, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  activeTab: string = 'basic'; // Controls which sidebar item is active
  editingField: keyof UserProfile | null = null;
  tempValue: string = '';

  // UI States
  isPageLoading: boolean = true;
  isUpdatingGlobally: boolean = false; 
  
  // Custom Toast Message State
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';


  user: UserProfile = {
    name: '', gender: "", email: '', location: '', bio: '', dob: '', phone: "", occupation: "",
    profileUrl: 'https://ui-avatars.com/api/?background=random&name=User'
  };

  showPasswordModal : boolean = false;
  showDeleteModal : boolean = false;

  passwordData = {
    oldPassword: '',
    newPassword: ''
  }

  showPassword = false;

  constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isPageLoading = true;

    this.profileService.getProfile().subscribe({
      next: (data : any) => {
        this.user = { ...this.user, ...data };
        this.isPageLoading = false;
      },
      error: (err) => {
        this.showToast('Failed to load profile data. Please refresh.', 'error');
        this.isPageLoading = false;
      }
    })

  }

  // Toast Notification Helper
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3500); // Auto-hide after 3.5s
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.cancelEdit();
  }

  startEdit(field: keyof UserProfile) {
    this.editingField = field;
    let val = this.user[field] || '';
    
    // If editing phone, strip the '+91 ' so the user only edits the 10 digits
    if (field === 'phone' && val.startsWith('+91')) {
      val = val.replace('+91', '').trim();
    }
    
    this.tempValue = val;
  }

  // Prevents user from typing letters in the phone input
  restrictToNumbers(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  cancelEdit() {
    this.editingField = null;
    this.tempValue = '';
  }

  saveEdit(field: keyof UserProfile) {
    let finalValue = this.tempValue;

    // Strict Phone Validation before saving
    if (field === 'phone') {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.tempValue)) {
        this.showToast('Please enter a valid 10-digit phone number.', 'error');
        return;
      }
      // Re-attach the +91 format for the backend
      finalValue = `+91 ${this.tempValue}`;
    }

    if (finalValue === this.user[field]) {
      this.cancelEdit();
      return;
    }
    
    this.isUpdatingGlobally = true; // Block UI and show bottom-right spinner
    const payload = { ...this.user, [field]: finalValue };
    delete (payload as any).email;

    this.profileService.updateProfile(payload).subscribe({
      next: (res) => {
        this.user[field] = finalValue as never;
        this.editingField = null;
        
        if (field === 'name') {
          const currentState = this.authService.getCurrentUserValue();
          if (currentState) {
            this.authService.setSession({ ...currentState, name: finalValue });
          }
        }
        
        this.showToast('Profile updated successfully.', 'success');
        this.isUpdatingGlobally = false;
      },
      error: (err) => {
        this.showToast(err.error?.message || 'Failed to update field.', 'error');
        this.isUpdatingGlobally = false;
      }
    });
  }

  // Image Upload Logic
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // 1. Validate Size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showToast("Image size must be less than 5MB.", 'error');
      return;
    }

    // 2. Validate Type (PNG, JPG)
    if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
      this.showToast("Only PNG and JPG formats are allowed.", 'error');
      return;
    }

    this.isUpdatingGlobally = true; // Block UI and show spinner

    // 3. Call the actual backend service
    this.profileService.uploadProfileImage(file).subscribe({
      next: (res: any) => {
        // Assuming your backend ApiResponse maps the HashMap to a 'data' property
        const newImageUrl = res.data?.url || res.url; 

        if (newImageUrl) {
          this.user.profileUrl = newImageUrl;      // Update UI immediately
          
          const currentState = this.authService.getCurrentUserValue();
          if (currentState) {
            this.authService.setSession({ ...currentState, profileUrl: newImageUrl });
          }

          this.showToast("Profile image updated successfully!", 'success');
        } else {
          this.showToast("Image uploaded, but no URL returned.", 'error');
        }
        
        this.isUpdatingGlobally = false;
      },
      error: (err: any) => {
        console.error("Upload error:", err);
        this.showToast(err.error?.message || "Failed to upload image.", 'error');
        this.isUpdatingGlobally = false;
      }
    });
  }

 // --- Modal Logic ---
 openPasswordModal() {
  this.showPasswordModal = true;
  this.passwordData = { oldPassword: '', newPassword: '' };
  this.showPassword = false;
}
closePasswordModal() { this.showPasswordModal = false; }

onChangePassword() {
  this.isUpdatingGlobally = true;
  
  this.profileService.changePassword(this.passwordData).subscribe({
    next: (res) => {
      this.showToast("Password Changed Successfully", 'success');
      this.isUpdatingGlobally = false;
      this.closePasswordModal();
    },
    error: (err) => {
      this.showToast(err.error?.message || "Failed to change password", 'error');
      this.isUpdatingGlobally = false;
    }
  });
}

openDeleteModal() { this.showDeleteModal = true; }
closeDeleteModal() { this.showDeleteModal = false; }

onDeleteAccount() {
  this.isUpdatingGlobally = true;

  this.profileService.deleteAccount().subscribe({
    next: (res) => {
      this.isUpdatingGlobally = false;
      localStorage.clear();
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.showToast(err.error?.message || "Failed to delete account", 'error');
      this.isUpdatingGlobally = false;
      this.closeDeleteModal();
    }
  });
}

}
