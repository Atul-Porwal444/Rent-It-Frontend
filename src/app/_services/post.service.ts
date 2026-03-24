import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'http://localhost:8080/user/list/';

  private readonly token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  createPost(type: 'room' | 'roommate', data: any, images: File[]): Observable<any> {
    const formData = new FormData();

    // Appending the JSON Data as a String
    // Backend should expect @RequestPart("data")
    formData.append('data', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));

    // Appending each image
    // Backend should expect @RequestPart("images")
    images.forEach((file) => {
      formData.append('images', file);
    });

    const endpoint = type === 'room' ? 'room' : 'roommate';
    return this.http.post(this.API_URL + endpoint, formData);
  }
}