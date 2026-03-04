import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, NgIf, NgClass, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  step: number = 1; // 1-> Enter email, and 2 -> Enter the OTP and new Password

  form: any = {
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  };

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  //Function for sending the OTP
  requestOtp(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // this.authService.forgotPassword(this.form.email).subscribe({
    //   next: (res: any) => {
    //     this.isLoading = false;
    //     this.successMessage = "A 6-digit code has been sent to your email.";
    //     this.step = 2;
    //   },
    //   error: (err: any) => {
    //     this.isLoading = false;
    //     this.errorMessage = err.error?.message || "Failed to send reset code. Try again.";
    //   }
    // });
    this.isLoading = false;
    this.successMessage = "A 6-digit code has been sent to your email.";
    this.step = 2;
}

  //Function for verify and reset password
  resetPassword(): void {
    this.errorMessage = '';

    if (this.form.newPassword !== this.form.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    if (this.form.otp.length < 6) {
      this.errorMessage = "Please enter a valid 6-digit OTP.";
      return;
    }

    this.isLoading = true;

    const payload = {
      email: this.form.email,
      otp: this.form.otp,
      newPassword: this.form.newPassword
    };

    this.authService.resetPassword(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        alert("Password reset successfully! Please login with your new password.");
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Invalid OTP or failed to reset password.";
      }
    });
  }
}
