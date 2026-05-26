import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  imports: [NgIf, FormsModule, NgClass, RouterLink],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent implements OnInit {
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

  countdown: number = 60;
  timerInterval: any;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
    const currentNav = this.router.getCurrentNavigation();
    
    // Security Check: 
    // 1. Did they type the URL or refresh? (currentNav is null)
    // 2. Did they use the browser's Back/Forward button? (trigger === 'popstate')
    // 3. Is our hidden 'fromLogin' flag missing?
    if (!currentNav || currentNav.trigger === 'popstate' || !currentNav.extras.state?.['fromLogin']) {
      
      // If any of the above are true, kick them back to login immediately
      this.router.navigate(['/login']);
  }
}

  ngOnInit() : void {
    // the email will be passed from the register page
    this.form.email = this.route.snapshot.queryParams['email'];

    // this prevent anyone from direct accessing the page
    if(!this.form.email) {
      this.router.navigate(['/login']);
      return;
    }

    this.startCountdown();
  }

  ngOnDestroy(): void {
    if(this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startCountdown() {
    this.countdown = 60;
    if(this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.countdown--;
      if(this.countdown <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  onSubmit() : void {
    this.isLoading = true;

    if(!this.form.otp || this.form.otp.length !== 6) {
      this.errorMessage = 'Please enter a valid 6-digit code';
      this.isLoading = false;
      return;
    }

    this.auth.verifyOtp(this.form).subscribe({
      next: (res) => {
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

        this.startCountdown();
      },
      error: (err) => {
        this.isResending = false;
        this.resendMessage = "Failed to send code. Try again later.";
      }
    });
  }
}
