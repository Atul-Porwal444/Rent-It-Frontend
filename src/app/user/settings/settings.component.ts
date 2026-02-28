import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  activeTab: 'privacy' | 'notifications' | 'account' = 'privacy';
  isSaving = false;

  settings = {
    privacy: {
      showEmail: false,
      showPhone: false,
      allowMessages: true
    },
    notifications: {
      emailAlerts: true,
      newRoomMatches: true,
      promotionalOffers: false
    }
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  setTab(tab: 'privacy' | 'notifications' | 'account') {
    this.activeTab = tab;
  }

  saveSettings() {
    this.isSaving = true;

    setTimeout(() => {
      console.log('Settings Saved: ', this.settings);
      this.isSaving = false;
    }, 800);
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onDeleteAccount() {
    const confirmDelete = confirm("Are you absolutely sure? This action cannot be undone.")
    if(confirmDelete) {
      console.log("Account deleted");
      this.authService.logout();
      this.router.navigate(["login"]);
    }
  }

}
