import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  userName: String = '';

  constructor(public authService : AuthService, private router: Router) {}

  ngOnInit(): void {
      this.loadUser();
  }

  loadUser() : void {
    const userStr = localStorage.getItem('user');
    if(userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.data.name;
    }
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }


}
