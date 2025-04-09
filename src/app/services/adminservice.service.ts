// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminserviceService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightDTO } from '../model/flight-dto';
import { HttpParams } from '@angular/common/http';
import { Router,RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private apiUrl = 'http://localhost:8085/api/admin'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

    addFlight(flight: FlightDTO): Observable < any > {
      return this.http.post(`${this.apiUrl}/addFlight`, flight , {responseType:'text'});

      // this.http.post('your-backend-url/addFlight', this.flight, { headers, responseType: 'text' })
    }

    deleteFlight(id: number): Observable < any > {
      return this.http.delete(`${this.apiUrl}/deleteFlight/${id}`,{responseType:'text'});
    }


  }
