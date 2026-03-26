import { Component, OnDestroy } from '@angular/core';
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
export class ForgotPasswordComponent implements OnDestroy {

  step: number = 1; // 1-> Enter email, and 2 -> Enter the OTP and new Password

  form: any = {
    email: 'temp@gmail.com',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  };

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword = false;

  isResetSuccess: boolean = false;
  isResending: boolean = false;
  resendMessage: string = '';
  countdown: number = 60;
  timerInterval: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startCountdown() {
    this.countdown = 60;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  requestOtp(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.forgotPassword(this.form.email).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.successMessage = "A 6-digit code has been sent to your email.";
        this.step = 2
        this.startCountdown();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Failed to send reset code. Try again.";
      }
    });
}

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
        this.isResetSuccess = true;

        // Wait 2 seconds, then route to login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Invalid OTP or failed to reset password.";
      }
    });
  }

  onResend() {
    this.isResending = true;
    this.resendMessage = '';
  
    this.authService.resendForgotPasswordOtp(this.form.email).subscribe({
      next: () => {
        this.isResending = false;
        this.resendMessage = "New code sent! Check your inbox.";
        this.startCountdown(); // Restart timer on success
      },
      error: (err) => {
        this.isResending = false;
        this.resendMessage = "Failed to send code. Try again later.";
      }
    });
  }
}
