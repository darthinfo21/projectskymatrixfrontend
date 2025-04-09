import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeatSelectionService } from '../../services/seatselection.service';
import { SeatSelection } from '../../model/seatselection';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
export class SeatsComponent implements OnInit{

  // selectedSeats: string[] = [];
  // userId: number = 1; // Example user ID
  // flightId: number = 101; // Example flight ID
  // message: string = '';

  // constructor(private seatSelectionService: SeatSelectionService, private router: Router) {}

  // ngOnInit(): void {}

  // toggleSeat(seatNumber: string): void {
  //   const index = this.selectedSeats.indexOf(seatNumber);
  //   if (index === -1) {
  //     this.selectedSeats.push(seatNumber);
  //   } else {
  //     this.selectedSeats.splice(index, 1);
  //   }
  // }

  // bookSeats(): void {
  //   const seatSelections: SeatSelection[] = this.selectedSeats.map(seatNumber => ({
  //     userId: this.userId,
  //     flightId: this.flightId,
  //     seatNumber: seatNumber
  //   }));

  //   seatSelections.forEach(seatSelection => {
  //     this.seatSelectionService.selectSeat(seatSelection).subscribe({
  //       next: (response) => {
  //         this.message = 'Seats booked successfully!';
  //         console.log(response);
  //       },
  //       error: (error) => {
  //         console.error('Error booking seat', error);
  //         this.message = 'An error occurred while booking seats.';
  //       }
  //     });
  //   });

  //   setTimeout(() => {
  //     this.router.navigate(['/confirm', { bookingId: this.flightId, seats: this.selectedSeats.join(',') }]);
  //   }, 2000); // Adjust the delay as needed
  // }
  selectedSeats: string[] = [];
  userId: number = 1; // Example user ID
  flightId: number =1; // This will be set from route parameters
  numberOfPassengers: number = 1; // Number of passengers from booking
  message: string = '';
 
  constructor(
    private seatSelectionService: SeatSelectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit(): void {
    this.flightId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.numberOfPassengers = Number(this.route.snapshot.paramMap.get('numberOfPassengers'));
  }
 
  toggleSeat(seatNumber: string, seatCheckbox: HTMLInputElement): void {
    const index = this.selectedSeats.indexOf(seatNumber);
    if (index === -1) {
      if (this.selectedSeats.length < this.numberOfPassengers) {
      this.selectedSeats.push(seatNumber);
    }else {
  alert('You cannot select more seats than the number of passengers.');
  seatCheckbox.checked = false; // Uncheck the checkbox  
  }}
  else {
      this.selectedSeats.splice(index, 1);
    }
}
 
  bookSeats(): void {
    if (this.selectedSeats.length < this.numberOfPassengers) {
       alert('You must select seats for all passengers.');
       return;
   }
    if (this.flightId !== undefined) {
      const seatSelections: SeatSelection[] = this.selectedSeats.map(seatNumber => ({
        userId: this.userId,
        flightId: this.flightId,
        seatNumber: seatNumber
      }));
 
      seatSelections.forEach(seatSelection => {
        this.seatSelectionService.selectSeat(seatSelection).subscribe({
          next: (response) => {
            this.message = 'Seats booked successfully!';
            console.log(response);
          },
          error: (error) => {
            console.error('Error booking seat', error);
            this.message = 'An error occurred while booking seats.';
          }
        });
      });
 
      setTimeout(() => {
        this.router.navigate(['/confirm', { bookingId: this.flightId, seats: this.selectedSeats.join(',') }]);
      }, 2000); // Adjust the delay as needed
    } else {
      this.message = 'Flight ID is not defined.';
    }
  }
}
