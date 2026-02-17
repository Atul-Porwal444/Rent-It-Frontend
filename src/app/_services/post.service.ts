import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_URL = 'http://localhost:8080/user/list/';

  private readonly token = localStorage.getItem('token');

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) { }

  createPost(type: 'room' | 'roommate', data: any, images: File[]): Observable<any> {
    const formData = new FormData();

    // 1. Append the JSON Data as a String
    // Backend should expect @RequestPart("data")
    formData.append('data', new Blob([JSON.stringify(data)], {
      type: 'application/json'
    }));

    // 2. Append Each Image
    // Backend should expect @RequestPart("images")
    images.forEach((file) => {
      formData.append('images', file);
    });

    // 1. Get the 'data' blob from the FormData
const dataBlob = formData.get('data') as Blob;

// 2. Read the text content of the blob
if (dataBlob) {
  dataBlob.text().then(text => {
    console.log('-------------------------');
    console.log('RAW JSON STRING:', text);       // Shows the string version
    console.log('PARSED OBJECT:', JSON.parse(text)); // Shows the interactive object fields
    console.log('-------------------------');
  });
}

// 3. Log the images separately to confirm they are there
const printingImage = formData.getAll('images');
console.log('Number of images:', printingImage.length);
printingImage.forEach((img, index) => {
   console.log(`Image ${index + 1}:`, (img as File).name);
});

    // 3. Send to specific endpoint based on type
    const endpoint = type === 'room' ? 'room' : 'roommate';
    return this.http.post(this.API_URL + endpoint, formData, this.httpOptions);
  }
}