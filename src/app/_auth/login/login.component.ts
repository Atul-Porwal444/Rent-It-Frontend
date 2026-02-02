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
    this.isLoginFailed = false;
    this.isUnverified = false;

    this.authService.login(this.form).subscribe({
      next: (response: any) => {
        
        if (response.success && response.data?.token) {
          localStorage.setItem('token', response.data.token);

          const userDetails = {
            id : response.data.id,
            name : response.data.name,
            email: response.data.email,
            profileUrl: response.data.profileUrl
          }

          localStorage.setItem('user', JSON.stringify(userDetails));
          
          this.router.navigate(['/']);
        } else {
          this.isLoginFailed = true;
          this.errorMessage = "Login succeeded but token was missing.";
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.isLoginFailed = true;
        
        const serverMessage = err.error?.message || "Login failed";

        if (err.status === 403 && serverMessage === "Unverified account") {
          this.isUnverified = true;
          this.errorMessage = serverMessage;
        } 
        else if (err.status === 404) {
          this.errorMessage = "User does not exist.";
        }
        else if (err.status === 401) {
          this.errorMessage = "Invalid email or password.";
        } 
        else {
          this.errorMessage = serverMessage;
        }
      }
    });
  }

  navigateToVerify() : void {
    this.router.navigate(['/verify-otp'], {
      queryParams: {email : this.form.email}
    });
  }

}
