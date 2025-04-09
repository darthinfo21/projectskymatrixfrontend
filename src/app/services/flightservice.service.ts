// import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'; 
import { Flight } from '../model/flight';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private baseUrl = 'http://localhost:8081/api/flights'; // Update this to match your API URL
 
  constructor(private http: HttpClient) { }
 
  searchFlights(source: string, destination: string): Observable<Flight[]> {
    let params = new HttpParams()
      .set('source', source)
      .set('destination', destination);
 
    return this.http.get<Flight[]>(`${this.baseUrl}/search`, { params });
  }

  getCityNames(query: string): Observable<string[]> {
    let params = new HttpParams().set('query', query);
    return this.http.get<string[]>(`${this.baseUrl}/cityNames`, { params });
   }
   
  getAllFlights(): Observable<Flight[]>
   {     return this.http.get<Flight[]>(`${this.baseUrl}/all`);
     }
  getUserDetails(userId: number): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/user/${userId}`);
    }
}