import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/api/auth/';

  private readonly PROFILE_API_URL = "http://localhost:8080/user/update/";

  private currentUserSubject = new BehaviorSubject<any>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  hydrateUser() : Observable<any> {
    return this.http.get(`${this.PROFILE_API_URL}me`).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    )
  }

  
  // for register the user
  register(userData: any) : Observable<any> {
    return this.http.post(this.API_URL + "signup", userData);
  }
  
  // for verification of account
  verifyOtp(verificationData: any) : Observable<any> {
    return this.http.post(this.API_URL + "verify-otp", verificationData);
  }
  
  resendOtp(email: string): Observable<any> {
    console.log(email)
    return this.http.post(
      this.API_URL + 'resend-otp', 
      { "email" : email }, 
      { withCredentials: true }
    );
  }
  
  resendForgotPasswordOtp(email : string): Observable<any> {
    return this.http.post(
      this.API_URL + 'resend-fp-otp', 
      { "email" : email }, 
      { withCredentials: true }
    );
  }
  
  // for the login
  login(credentials : any) : Observable<any> {
    return this.http.post(this.API_URL + "login", credentials, {withCredentials: true});
  }
  
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}forgot-password`, { "email": email });
  }
  
  resetPassword(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}reset-password`, payload);
  }
  
  isLoggedIn() : boolean {
    return this.currentUserSubject.getValue() !== null;
  }
  
  logout() {
    this.clearSession();
  }

  getCurrentUserValue(): any {
    return this.currentUserSubject.getValue();
  }
  
  setSession(userData : any) {
    this.currentUserSubject.next(userData);
  }
  
  clearSession() {
    this.currentUserSubject.next(null);
    this.http.post(`${this.API_URL}logout`, {});
  }
}
