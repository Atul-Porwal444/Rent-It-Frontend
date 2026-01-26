import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/auth/';


  constructor(private http: HttpClient) { }

  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  }

  loginMock() {
    localStorage.setItem('token', 'fake-jwt-token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
