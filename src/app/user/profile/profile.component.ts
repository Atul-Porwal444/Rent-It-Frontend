import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'Atul Porwal',
    username: '@atul_porwal444',
    email: 'atul@example.com',
    location: 'Indore, Madhya Pradesh, India',
    bio: 'They will resist.',
    birthday: 'June 28, 2005',
    phoneNumber: "+91-1234567890",
    occoupation: "Hacker",
    website: '',
    github: 'github.com/atul',
    linkedin: '',
    twitter: '',
    avatar: 'https://ui-avatars.com/api/?background=random&name=Atul+Porwal' // Fallback
  };

  activeTab: string = 'basic'; // Controls which sidebar item is active

  constructor() { }

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
}
