import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  activeTab: 'privacy' | 'notifications' | 'account' = 'privacy';
  
  // UI States
  isLoading = true;
  isProcessingGlobally = false;
  showDeleteModal = false;

  // Toast Variables
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  settings = {
    privacy: {
      showEmail: false,
      showPhone: false,
      allowMessages: false
    },
    notifications: {
      emailAlerts: false,
      newRoomMatches: false,
      promotionalOffers: false
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService  
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    this.isLoading = true;

    this.profileService.getSettings().subscribe({
      next: (mappedSettings) => {
        this.settings = mappedSettings;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Failed to load settings", err);
        this.showToast("Failed to load your preferences. Please refresh.", 'error');
        this.isLoading = false;
      }
    });
  }

  setTab(tab: 'privacy' | 'notifications' | 'account') {
    this.activeTab = tab;
  }

  // --- Toast Notification ---
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => this.toastMessage = '', 3500);
  }

  saveSettings() {
    this.isProcessingGlobally = true;

    this.profileService.updateSettings(this.settings).subscribe({
      next: (res) => {
        this.showToast('Settings updated successfully', 'success');
        this.isProcessingGlobally = false;
      },
      error: (err) => {
        console.error("Failed to save settings", err);
        this.showToast('Failed to update setting. Please try again.', 'error');
        
        this.isProcessingGlobally = false;
      }
    });
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  //  Delete Modal Logic 
  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDeleteAccount() {
    this.isProcessingGlobally = true;
    
    this.profileService.deleteAccount().subscribe({
      next: (res) => {
        this.authService.logout();
        this.isProcessingGlobally = false;
        this.closeDeleteModal();
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: (err) => {
        this.showToast(err.error?.message || "Failed to delete account", 'error');
        this.isProcessingGlobally = false;
        this.closeDeleteModal();
      }
    });
  }
}
