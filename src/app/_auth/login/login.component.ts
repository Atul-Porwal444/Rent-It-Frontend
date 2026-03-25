import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NgIf, FormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showPassword = false;

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
        
        this.authService.hydrateUser().subscribe({
          next: (user) => {
            if(user) {
              this.router.navigate(['/dashboard']);
            }
            else {
              this.isLoginFailed = true;
              this.errorMessage = "Failed to load the user profile";
            }
            this.isLoading = false;
          }
        })

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
    this.authService.resendOtp(this.form.email).subscribe({
      next: (res) => {
        this.router.navigate(['/verify-otp'], {
          queryParams: {email : this.form.email},
          replaceUrl: true
        });
      },
      error: (err) => {
        alert("Failed to send the Verification OTP");
      }
    });
  }
}
