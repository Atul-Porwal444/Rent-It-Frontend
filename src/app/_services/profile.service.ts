import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API_URL = 'http://localhost:8080/user/update/';

  private readonly token = localStorage.getItem('token');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'Application/json' ,
      'Authorization' : `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) { }

  updateProfile(data : any) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(this.API_URL + 'profile', data, this.httpOptions);
  }
}
