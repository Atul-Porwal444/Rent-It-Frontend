import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private readonly API_URL = 'http://localhost:8080/user/list/';

  private readonly SAVED_API_URL = 'http://localhost:8080/user/save/';

  constructor(private http: HttpClient) { }

  /**
   * Fetch paginated Room listings
   */
  getRooms(filters: any, pageNo: number = 0, pageSize: number = 10, sortBy: string = 'postedOn', sortDir: string = 'desc'): Observable<any> {
    
    // Build the query parameters
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    // Only append filters if they have a value (keeps the URL clean)
    if (filters.searchQuery) params = params.set('searchQuery', filters.searchQuery);
    if (filters.bhkType) params = params.set('bhkType', filters.bhkType);
    if (filters.minRent) params = params.set('minRent', filters.minRent.toString());
    if (filters.maxRent) params = params.set('maxRent', filters.maxRent.toString());
    
    // Booleans
    if (filters.isFurnished) params = params.set('isFurnished', 'true');
    if (filters.hasParking) params = params.set('hasParking', 'true');
    if (filters.waterSupply24x7) params = params.set('waterSupply24x7', 'true');
    if (filters.electricityBackup) params = params.set('electricityBackup', 'true');

    // Make the GET request (Angular will automatically append the params to the URL)
    return this.http.get(this.API_URL + 'rooms', { params });
  }

  /**
   * Fetch paginated Roommate listings
   */
  getRoommates(filters: any, pageNo: number = 0, pageSize: number = 10, sortBy: string = 'postedOn', sortDir: string = 'desc'): Observable<any> {
    
    // Build the query parameters
    let params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

      // Text & Select Filters
    if (filters.searchQuery) params = params.set('searchQuery', filters.searchQuery);
    if (filters.bhkType) params = params.set('bhkType', filters.bhkType);
    if (filters.lookingForGender) params = params.set('lookingForGender', filters.lookingForGender);
    if (filters.dietaryPreference) params = params.set('dietaryPreference', filters.dietaryPreference);
    if (filters.religionPreference) params = params.set('religionPreference', filters.religionPreference);
    
    // Number Filters
    if (filters.minRent) params = params.set('minRent', filters.minRent.toString());
    if (filters.maxRent) params = params.set('maxRent', filters.maxRent.toString());
    
    // Boolean Flags
    if (filters.isFurnished) params = params.set('isFurnished', 'true');
    if (filters.hasParking) params = params.set('hasParking', 'true');
    if (filters.waterSupply24x7) params = params.set('waterSupply24x7', 'true');
    if (filters.electricityBackup) params = params.set('electricityBackup', 'true');

    return this.http.get(this.API_URL + 'roommates', { params });
  }

  toggleSave(type: 'room' | 'roommate', postId: number): Observable<any> {
    return this.http.post(`${this.SAVED_API_URL}${type}/${postId}`, {});
  }

  checkSaveStatus(type: 'room' | 'roommate', postId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.SAVED_API_URL}${type}/${postId}/status`);
  }
}