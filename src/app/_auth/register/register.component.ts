import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form : any = {
    name: '',
    email: '',
    password: ''
  }

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() : void {
    this.isLoading = true;
    this.authService.register(this.form).subscribe({
      next: (response) => {
        console.log("User registered successfully");
      
        this.router.navigate(['/verify-otp'], {
          queryParams: {email : this.form.email},
          replaceUrl: true
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        alert("Registration failed " + err.error.message);
      }
    })
  }

}
