import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  imports: [NgIf, FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  form: any = {
    email:  '',
    otp: ''
  }

  email: string = '';
  otp: string = '';
  errorMessage = '';
  isVerified: boolean = false;
  isLoading: boolean = false;
  isResending = false;
  resendMessage = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() : void {
    // the email will be passed from the register page
    this.form.email = this.route.snapshot.queryParams['email'];

    // this prevent anyone from direct accessing the page
    if(!this.form.email) {
      this.router.navigate(['/login']);
      return;
    }
  }

  onSubmit() : void {
    this.isLoading = true;

    if(!this.form.otp && this.form.otp.length < 6) {
      this.errorMessage = 'Please enter a valid 6-digit code';
      this.isLoading = false;
      return;
    }

    this.auth.verifyOtp(this.form).subscribe({
      next: (res) => {
        console.log("Account verification successfull");

        this.isVerified = true;
        setTimeout(() => {
          this.router.navigate(['/login'], {
            replaceUrl: true
          });
        }, 2000)
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid or Expired OTP. Please try again.'
      }
    });
  }

  onResend() {
    this.isResending = true;
    this.resendMessage = '';
  
    this.auth.resendOtp(this.form.email).subscribe({
      next: () => {
        this.isResending = false;
        this.resendMessage = "New code sent! Check your inbox.";
      },
      error: (err) => {
        this.isResending = false;
        this.resendMessage = "Failed to send code. Try again later.";
      }
    });
  }
}
