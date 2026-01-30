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
  email: string = '';
  otp: string = '';
  errorMessage = '';
  isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() : void {
    // the email will be passed from the register page
    this.email = this.route.snapshot.queryParams['email'];
  }

  onSubmit() : void {
    if(!this.otp && this.otp.length < 6) {
      this.errorMessage = 'Please enter a valid 6-digit code';
      return;
    }

    this.auth.verifyOtp(this.email, this.otp).subscribe({
      next: (res) => {
        console.log("Account verification successfull");

        this.isVerified = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000)
      },
      error: (err) => {
        this.errorMessage = 'Invalid or Expired OTP. Please try again.'
      }
    });
  }
}
