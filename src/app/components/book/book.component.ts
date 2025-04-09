import { Component } from '@angular/core';
import { Booking } from '../../model/booking';
import { BookingService } from '../../services/bookingservice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  // booking: Booking = {
  //   userId: '',
  //   flightId: '',
  //   numberOfPassengers: 0,
  //   bookingTime: new Date().toISOString()
  // };
  // bookingMessage: string = '';
 
  // constructor(private bookingService: BookingService,private router:Router) { }
 
  // bookFlight() {
  //   if (this.booking.numberOfPassengers<= 0) {
  //     alert('Number of passengers must be at least 1.');
  //     return;
  //   }
 
  //   this.bookingService.bookFlight(this.booking).subscribe({
  //     next: (response: any) => {
  //       this.bookingMessage = 'Booking done successfully!';
  //       setTimeout(() => {
  //         this.router.navigate(['/confirm']);
  //       }, 2000); // Adjust the delay as needed
  //       console.log(response);
  //     },
  //     error: (error) => {
  //       console.error('Error booking flight', error);
  //       this.bookingMessage = 'An error occurred during booking.';
  //     }
  //   });
  // }
//   this.bookingService.bookFlight(this.booking).subscribe({
//     next: (response: any) => {
//         this.bookingMessage = 'Booking done successfully!';
//         const bookingId = this.extractBookingId(response); // Extract booking ID from response
//         setTimeout(() => {
//             this.router.navigate(['/seats', { bookingId: bookingId }]);
//         }, 2000); // Adjust the delay as needed
//         console.log(response);
//     },
//     error: (error) => {
//         console.error('Error booking flight', error);
//         this.bookingMessage = 'An error occurred during booking.';
//     }
// });
// }
// private extractBookingId(response: string): string {
//   const match = response.match(/Booking ID: (\d+)/);
//   return match ? match[1] : '';
// }

booking: Booking = {
  userId: '',
  flightId: '',
  numberOfPassengers: 0,
  bookingTime: new Date().toISOString(),
  id: 0
};
bookingMessage: string = '';

constructor(
  private bookingService: BookingService,
  private router: Router,
  private route: ActivatedRoute
) {}

ngOnInit(): void {
  this.booking.userId = this.route.snapshot.paramMap.get('userId') || '';
  this.booking.flightId = this.route.snapshot.paramMap.get('flightId') || '';
}

bookFlight() {
  if (this.booking.numberOfPassengers <= 0) {
    alert('Number of passengers must be at least 1.');
    return;
  }
  this.bookingService.bookFlight(this.booking).subscribe({
    next: (response: any) => {
      this.bookingMessage = 'Booking done successfully!';
      const bookingId = this.extractBookingId(response); // Extract booking ID from response
      setTimeout(() => {
        this.router.navigate(['/seats', { bookingId: bookingId }]);
      }, 2000); // Adjust the delay as needed
      console.log(response);
    },
    error: (error) => {
      console.error('Error booking flight', error);
      this.bookingMessage = 'An error occurred during booking.';
    }
  });
}

private extractBookingId(response: string): string {
  const match = response.match(/Booking ID: (\d+)/);
  return match ? match[1] : '';
}
}