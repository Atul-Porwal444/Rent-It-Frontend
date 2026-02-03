import { NgIf } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    name: 'Atul Porwal',
    username: '@atul_porwal444',
    gender: "Male",
    email: 'atul@example.com',
    location: 'Indore, Madhya Pradesh, India',
    bio: 'They will resist.',
    birthday: 'June 28, 2005',
    phone: "+91-1234567890",
    occupation: "Hacker",
    website: '',
    github: 'github.com/atul',
    linkedin: '',
    twitter: '',
    avatar: 'https://ui-avatars.com/api/?background=random&name=Atul+Porwal' // Fallback
  };

  activeTab: string = 'basic'; // Controls which sidebar item is active

  constructor(private router: Router) { }

  ngOnInit(): void {
    // TODO: Fetch real user data from AuthService here later
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
      const u = JSON.parse(storedUser);
      this.user.name = u.name;
      this.user.email = u.email;
      if(u.imageUrl) this.user.avatar = u.imageUrl;
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

    const updatedPayLoad = { ...this.user, [field]: this.tempValue };
    

    setTimeout(() => {
      this.user[field] = this.tempValue;
      this.editingField = null;
      this.isUpdating = false;

      localStorage.setItem('user', JSON.stringify(this.user));
    }, 1000);
  }
}
