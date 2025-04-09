import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking';
import { Bookingdetailsdto } from '../model/bookingdetailsdto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8088/api/bookings'; // Update this to match your API URL
 
  constructor(private http: HttpClient) { }
 
  bookFlight(booking: Booking): Observable<any> {
    return this.http.post(`${this.baseUrl}/book`, booking, { responseType: 'text' });
  }
  
  getBookingDetails(bookingId: number): Observable<Bookingdetailsdto> {
    return this.http.get<Bookingdetailsdto>(`${this.baseUrl}/${bookingId}/details`);
  }
  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${userId}`);
  }
  cancelBooking(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/cancel/${id}`, null, { responseType: 'text' });
  }
  //  cancelBooking(id: number): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/cancel/${id}`, {});
  // }
}