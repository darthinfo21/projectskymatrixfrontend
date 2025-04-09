
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeatSelection } from '../model/seatselection';

@Injectable({
  providedIn: 'root'
})
export class SeatSelectionService {
  private apiUrl = 'http://localhost:8090/api/seats';

  constructor(private http: HttpClient) {}

  selectSeat(seatSelection: SeatSelection): Observable<SeatSelection> {
    return this.http.post<SeatSelection>(`${this.apiUrl}/select`, seatSelection);
  }

  getSeatsByFlightId(flightId: number): Observable<SeatSelection[]> {
    return this.http.get<SeatSelection[]>(`${this.apiUrl}/flight/${flightId}`);
  }


  getSeatsByBookingId(bookingId: number): Observable<SeatSelection[]> {
    return this.http.get<SeatSelection[]>(`${this.apiUrl}/booking/${bookingId}`);
  }
}