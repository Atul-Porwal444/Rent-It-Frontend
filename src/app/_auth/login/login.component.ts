import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: any = {
    email: '',
    password: ''
  }

  isLoading: boolean = false;
  isLoginFailed : boolean = false;
  errorMessage : string = '';
  isUnverified: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() : void {
    this.isLoading = true;
    this.errorMessage = '';
    this.isLoginFailed = true;
    this.isUnverified = false;
  }

  navigateToVerify() : void {
    this.router.navigate(['/verify-otp']);
  }

}
