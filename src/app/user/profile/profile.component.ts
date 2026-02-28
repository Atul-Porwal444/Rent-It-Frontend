import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../_services/profile.service';
import { UserProfile } from '../../_models/user-profile';

@Component({
  selector: 'app-profile',
  imports: [NgIf, FormsModule, NgFor],
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

  showPasswordModal : boolean = false;
  showDeleteModal : boolean = false;
  isLoading : boolean = false;

  passwordData = {
    oldPassword: '',
    newPassword: ''
  }

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

  openPasswordModal() {
    this.showPasswordModal = true;
    this.passwordData = { oldPassword: '', newPassword: '' };
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  onChangePassword() {
    if (!this.passwordData.oldPassword || !this.passwordData.newPassword) {
      alert("Please fill in all fields");
      return;
    }

    this.isLoading = true;
    
    this.profileService.changePassword(this.passwordData).subscribe({
      next: (res) => {
        alert("Password Changed Successfully");
        this.isLoading = false;
        this.closePasswordModal();
      },
      error: (err) => {
        alert(err.error?.message || "Failed to change password");
        this.isLoading = false;
      }
    });
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  onDeleteAccount() {
    this.isLoading = true;

    this.profileService.deleteAccount().subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert("Failed to delete account");
        this.isLoading = false;
        this.closeDeleteModal();
      }
    });
  }
}
