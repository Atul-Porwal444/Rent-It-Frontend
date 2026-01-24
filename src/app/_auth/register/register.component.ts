import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form : any = {
    name: '',
    email: '',
    password: '',
    role : 'USER'
  }

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() : void {
    console.log('From Data: ' + this.form);

    this.router.navigate(['/login']);
  }

}
