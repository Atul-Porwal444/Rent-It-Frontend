import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  // Replace with your actual backend base URL if different
  private API_URL = 'http://localhost:8080/user/list/';

  constructor(private http: HttpClient) { }

  /**
   * Fetch paginated Room listings
   */
  getRooms(pageNo: number = 0, pageSize: number = 10, sortBy: string = 'postedOn', sortDir: string = 'desc'): Observable<any> {
    
    // Build the query parameters
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    // Make the GET request (Angular will automatically append the params to the URL)
    return this.http.get(this.API_URL + 'rooms', { params });
  }

  /**
   * Fetch paginated Roommate listings
   */
  getRoommates(pageNo: number = 0, pageSize: number = 10, sortBy: string = 'postedOn', sortDir: string = 'desc'): Observable<any> {
    
    // Build the query parameters
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get(this.API_URL + 'roommates', { params });
  }
}