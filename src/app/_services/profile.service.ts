import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API_URL = 'http://localhost:8080/user/update/';

  private readonly SETTING_API_URL = 'http://localhost:8080/user/settings/';

  private readonly token = localStorage.getItem('token');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'Application/json' ,
      'Authorization' : `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) { }

  updateProfile(data : any) : Observable<any> {
    return this.http.put(this.API_URL + 'profile', data, this.httpOptions);
  }

  uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append('image', file); 

    return this.http.post(`${this.API_URL}profile-image`, formData, {headers: new HttpHeaders({'Authorization' : `Bearer ${this.token}`})}); 
  }

  changePassword(data: any) : Observable<any> {
    return this.http.post(this.API_URL + 'password', data, this.httpOptions);
  }

  deleteAccount() : Observable<any> {
    return this.http.delete(this.API_URL + 'delete-account', this.httpOptions);
  }

  getSettings(): Observable<any> {
    return this.http.get(`${this.SETTING_API_URL}setting`, this.httpOptions).pipe(
      map((dto: any) => {
        return {
          privacy: {
            showEmail: dto.showEmail,
            showPhone: dto.showPhone,
            allowMessages: dto.allowMessages
          },
          notifications: {
            emailAlerts: dto.emailAlerts,
            newRoomMatches: dto.newRoomMatches,
            promotionalOffers: dto.promotionalOffers
          }
        };
      })
    );
  }

  updateSettings(settings: any): Observable<any> {
    const payloadDto = {
      showEmail: settings.privacy.showEmail,
      showPhone: settings.privacy.showPhone,
      allowMessages: settings.privacy.allowMessages,
      emailAlerts: settings.notifications.emailAlerts,
      newRoomMatches: settings.notifications.newRoomMatches,
      promotionalOffers: settings.notifications.promotionalOffers
    };

    return this.http.put(`${this.SETTING_API_URL}update`, payloadDto, this.httpOptions);
  }
}
