import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map,  Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API_URL = `${environment.apiUrl}/api/user/`;
  private readonly SETTING_API_URL = `${environment.apiUrl}/user/settings/`;
  private readonly NOTIFICATION_API_URL = `${environment.apiUrl}/user/notifications/`;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}profile`);
  }

  updateProfile(data : any) : Observable<any> {
    return this.http.put(this.API_URL + 'update/profile', data);
  }

  uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append('image', file); 

    return this.http.post(`${this.API_URL}update/profile-image`, formData); 
  }

  changePassword(data: any) : Observable<any> {
    return this.http.post(this.API_URL + 'update/password', data);
  }

  deleteAccount() : Observable<any> {
    return this.http.delete(this.API_URL + 'delete-account');
  }

  getSettings(): Observable<any> {
    return this.http.get(`${this.SETTING_API_URL}setting`).pipe(
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

    return this.http.put(`${this.SETTING_API_URL}update`, payloadDto);
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.NOTIFICATION_API_URL}notification`);
  }

  checkUnreadNotifications(): Observable<boolean> {
    return this.http.get<boolean>(`${this.NOTIFICATION_API_URL}has-unread`);
  }

  markAllNotificationsAsRead(): Observable<any> {
    return this.http.put(`${this.NOTIFICATION_API_URL}read-all`, {});
  }
}
