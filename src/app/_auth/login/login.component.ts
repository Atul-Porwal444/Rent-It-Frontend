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

  isLoginFailed : boolean = false;
  errorMessage : string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() : void {
    console.log('Form Data:' + this.form);

    if(this.form.email && this.form.password) {
      localStorage.setItem('token', 'fake-jwt-token');
      this.router.navigate(['/'])
    }
  }

}
