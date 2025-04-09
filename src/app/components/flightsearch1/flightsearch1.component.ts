import { Component, OnInit } from '@angular/core';
import { Flight } from '../../model/flight';
import { FlightService } from '../../services/flightservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/userservices.service';
@Component({
  selector: 'app-flightsearch1',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './flightsearch1.component.html',
  styleUrl: './flightsearch1.component.css',
  
})

export class Flightsearch1Component implements OnInit {


  // source: string = '';
  // destination: string = '';
  // flights: Flight[] = [];
 
  // constructor(private flightService: FlightService, private router: Router) { }
 
  // searchFlights() {
  //   this.flightService.searchFlights(this.source, this.destination).subscribe({
  //     next: (data: Flight[]) => {
  //       this.flights = data;
  //       console.log(this.flights);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching flights', error);
  //     }
  //   });
  // }

  // Matrix(){
  //   this.router.navigate(['/book']);

  // }
  source: string = '';
  destination: string = '';
  flights: Flight[] = [];
  userId: number | undefined; // Make sure this is correctly set
  selectedFlight:any=null;
  sourceSuggestions: string[] = [];
destinationSuggestions: string[] = [];
 
 
  constructor(
    private flightService: FlightService,
    private router: Router,
    private userService:UserService
 
  ) {}
 
 
  ngOnInit(): void {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    } else {
      console.error('User ID is not defined in session storage');
    }
  }
  showDetails(flight: any) {  
      this.selectedFlight = flight;
      }  
  hideDetails() {  
       this.selectedFlight = null;  
       }
 
 
  searchFlights() {
    this.flightService.searchFlights(this.source, this.destination).subscribe({
      next: (data: Flight[]) => {
        this.flights = data;
        console.log(this.flights);
      },
      error: (error) => {
        console.error('Error fetching flights', error);
      }
    });
  }
 
  Matrix(flightId: number) {
    if (this.userId !== undefined) {
      this.router.navigate(['/book', { userId: this.userId, flightId: flightId }]);
    } else {
      console.error('User ID is not defined');
    }
  }
 
  onSourceInputChange(query: string) {
     if (query.length > 1) { this.flightService.getCityNames(query).subscribe({
      next: (data: string[]) => { this.sourceSuggestions = data;
       },
       error: (error) => {
         console.error('Error fetching city names', error);
        }
      });
     }
     else { this.sourceSuggestions = [];
     
      }
     }
  onDestinationInputChange(query: string) { if (query.length > 1) {
     this.flightService.getCityNames(query).subscribe({ next: (data: string[]) => {
      this.destinationSuggestions = data;
    },
    error: (error) => {
       console.error('Error fetching city names', error);
       }
      });
    }
    else { this.destinationSuggestions = [];
 
    }
  }
 
  selectSourceSuggestion(suggestion: string) {
     this.source = suggestion; this.sourceSuggestions = [];
    }
 selectDestinationSuggestion(suggestion: string) {
  this.destination = suggestion; this.destinationSuggestions = [];
 }
 
 
 }


