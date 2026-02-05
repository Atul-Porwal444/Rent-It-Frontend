import { NgIf } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ProfileService } from '../../_services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [NgIf, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  editingField: String | null = null;

  tempValue: any = '';

  isUpdating: boolean = false;

  user: any = {
    name: '',
    gender: "",
    email: '',
    location: '',
    bio: '',
    birthday: '',
    phone: "",
    occupation: "",
    avatar: 'https://ui-avatars.com/api/?background=random&name=User' // Fallback
  };

  activeTab: string = 'basic'; // Controls which sidebar item is active

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    // TODO: Fetch real user data from AuthService here later
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const u = JSON.parse(storedUser);
      this.user.name = u.name;
      this.user.email = u.email;
      this.user.gender = u.gender;
      this.user.location = u.location;
      this.user.bio = u.bio;
      this.user.birthday = u.birthday;
      this.user.phone = u.phone;
      this.user.occupation = u.occupation;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  startEdit(field : string) {
    this.editingField = field;
    this.tempValue = this.user[field];
  }

  cancelEdit() {
    this.editingField = null;
    this.tempValue = '';
  }

  saveEdit(field : string) {
    this.isUpdating = true;
    console.log(field);

    const payload: any = { ...this.user };
    delete payload.email;
    console.log(JSON.stringify(payload));
    payload[field] = this.tempValue;

    this.profileService.updateProfile(payload).subscribe({
      next: (res) => {
        this.user[field] = this.tempValue;

        this.isUpdating = false;
        this.editingField = null;

        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser[field] = this.tempValue;
        localStorage.setItem('user', JSON.stringify(currentUser));
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update. Please try again.');
        this.isUpdating = false;
      }
    })
    console.log("leaving fun")
  }
}
