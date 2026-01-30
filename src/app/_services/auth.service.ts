import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/auth/';

  private httpOptions = {
    headers: new HttpHeaders({ 'content-type' : 'application/json' })
  }

  constructor(private http: HttpClient) { }

  // for register the user
  register(userData: any) : Observable<any> {
    return this.http.post(this.API_URL + "signup", userData, this.httpOptions);
  }

  // for verification of account
  verifyOtp(verificationData: any) : Observable<any> {
    return this.http.post(this.API_URL + "verify-otp", verificationData, this.httpOptions);
  }

  // for the login
  login(credentials : any) : Observable<any> {
    return this.http.post(this.API_URL + "login", credentials, this.httpOptions);
  }

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
