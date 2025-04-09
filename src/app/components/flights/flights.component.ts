import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FlightService } from '../../services/flightservice.service';
import { Flight } from '../../model/flight';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

  flights: Flight[] = []; 
    constructor(private flightService: FlightService) { }   
    ngOnInit(): void {     this.flightService.getAllFlights().subscribe
      ({       next: (data: Flight[]) => {         this.flights = data;       }, 
            error: (error: any) => {       
                console.error('Error fetching flights', error);     
                }     });   }
}
