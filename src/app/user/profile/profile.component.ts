import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../_services/profile.service';
import { UserProfile } from '../../_models/user-profile';

@Component({
  selector: 'app-profile',
  imports: [NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  activeTab: string = 'basic'; // Controls which sidebar item is active
  editingField: keyof UserProfile | null = null;
  isUpdating: boolean = false;
  tempValue: string = '';


  user: UserProfile = {
    name: '',
    gender: "",
    email: '',
    location: '',
    bio: '',
    dob: '',
    phone: "",
    occupation: "",
    profileUrl: 'https://ui-avatars.com/api/?background=random&name=User' // Fallback
  };

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() : void {
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      this.user = { ...this.user, ...JSON.parse(storedUser) };
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.cancelEdit();
  }

  startEdit(field : keyof UserProfile) {
    this.editingField = field;
    this.tempValue = this.user[field] || '';
  }

  cancelEdit() {
    this.editingField = null;
    this.tempValue = '';
  }

  saveEdit(field : keyof UserProfile) {

    if(this.tempValue === this.user[field]) {
      this.cancelEdit();
      return;
    }
    this.isUpdating = true;

    const payload = { ...this.user, [field]: this.tempValue };

    delete (payload as any).email;
    console.log(JSON.stringify(payload));
    this.profileService.updateProfile(payload).subscribe({
      next: (res) => {
        this.user[field] = this.tempValue;

        this.isUpdating = false;
        this.editingField = null;

        this.updateLocalStorage(this.user);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update. Please try again.');
        this.isUpdating = false;
      }
    });
  }

  private updateLocalStorage(user : UserProfile) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
