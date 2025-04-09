// import { Component, OnInit } from '@angular/core';
// import { Bookingdetailsdto } from '../../model/bookingdetailsdto';
// import { BookingService } from '../../services/bookingservice.service';
// import { SeatSelectionService } from '../../services/seatselection.service';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-orders',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './orders.component.html',
//   styleUrl: './orders.component.css'
// })
// export class OrdersComponent implements OnInit {
//   userId: number = 0; // Initialize userId
//   bookings: Bookingdetailsdto[] = [];
//   selectedSeats: { [bookingId: number]: string[] } = {};

//   constructor(
//     private bookingService: BookingService,
//     private seatSelectionService: SeatSelectionService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     const storedUserId = sessionStorage.getItem('userId');
//     if (storedUserId) {
//       this.userId = parseInt(storedUserId, 10);
//       this.fetchBookings();
//     } else {
//       console.error('User ID is not defined in session storage');
//     }
//   }

//   fetchBookings(): void {
//     this.bookingService.getBookingsByUserId(this.userId).subscribe({
//       next: (bookings) => {
//         bookings.forEach((booking) => {
//           this.bookingService.getBookingDetails(booking.id).subscribe({
//             next: (details) => {
//               this.bookings.push(details);
//               const bookingId = Number(details.booking.id);
//               if (!isNaN(bookingId)) {
//                 this.fetchSelectedSeats(bookingId);
//               } else {
//                 console.error('Booking ID is not a number:', details.booking.id);
//               }
//             },
//             error: (error) => {
//               console.error('Error fetching booking details:', error);
//             }
//           });
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching bookings:', error);
//       }
//     });
//   }

//   fetchSelectedSeats(bookingId: number): void {
//     this.seatSelectionService.getSeatsByBookingId(bookingId).subscribe({
//       next: (seats) => {
//         this.selectedSeats[bookingId] = seats.map(seat => seat.seatNumber);
//       },
//       error: (error) => {
//         console.error('Error fetching selected seats:', error);
//       }
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { Bookingdetailsdto } from '../../model/bookingdetailsdto';
// import { BookingService } from '../../services/bookingservice.service';
// import { SeatSelectionService } from '../../services/seatselection.service';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-orders',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css'] // corrected "styleUrl" to "styleUrls"
// })
// export class OrdersComponent implements OnInit {
//   userId: number = 0; // Initialize userId
//   bookings: Bookingdetailsdto[] = [];
//   selectedSeats: { [bookingId: number]: string[] } = {};

//   constructor(
//     private bookingService: BookingService,
//     private seatSelectionService: SeatSelectionService,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     const storedUserId = sessionStorage.getItem('userId');
//     if (storedUserId) {
//       this.userId = parseInt(storedUserId, 10);
//       this.fetchBookings();
//     } else {
//       console.error('User ID is not defined in session storage');
//     }
//   }

//   fetchBookings(): void {
//     this.bookingService.getBookingsByUserId(this.userId).subscribe({
//       next: (bookings) => {
//         bookings.forEach((booking) => {
//           this.bookingService.getBookingDetails(booking.id).subscribe({
//             next: (details) => {
//               this.bookings.push(details);
//               const bookingId = Number(details.booking.id);
//               if (!isNaN(bookingId)) {
//                 this.fetchSelectedSeats(bookingId);
//               } else {
//                 console.error('Booking ID is not a number:', details.booking.id);
//               }
//             },
//             error: (error) => {
//               console.error('Error fetching booking details:', error);
//             }
//           });
//         });
//       },
//       error: (error) => {
//         console.error('Error fetching bookings:', error);
//       }
//     });
//   }

//   fetchSelectedSeats(bookingId: number): void {
//     this.seatSelectionService.getSeatsByBookingId(bookingId).subscribe({
//       next: (seats) => {
//         this.selectedSeats[bookingId] = seats.map(seat => seat.seatNumber);
//       },
//       error: (error) => {
//         console.error('Error fetching selected seats:', error);
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Bookingdetailsdto } from '../../model/bookingdetailsdto';
import { BookingService } from '../../services/bookingservice.service';
import { SeatSelectionService } from '../../services/seatselection.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  userId: number = 0; // Initialize userId
  bookings: Bookingdetailsdto[] = [];
  selectedSeats: { [bookingId: number]: string[] } = {};

  constructor(
    private bookingService: BookingService,
    private seatSelectionService: SeatSelectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      this.fetchBookings();
    } else {
      console.error('User ID is not defined in session storage');
    }
  }

  fetchBookings(): void {
    this.bookingService.getBookingsByUserId(this.userId).subscribe({
      next: (bookings) => {
        const bookingDetailsObservables = bookings.map((booking) =>
          this.bookingService.getBookingDetails(booking.id)
        );

        forkJoin(bookingDetailsObservables).subscribe({
          next: (bookingDetailsArray) => {
            bookingDetailsArray.forEach((details) => {
              const bookingId = Number(details.booking.id);
              if (!isNaN(bookingId)) {
                this.bookings.push(details);
                this.fetchSelectedSeats(bookingId);
                console.log('Fetched booking details:', details); // Log to ensure details are fetched
              } else {
                console.error('Booking ID is not a number:', details.booking.id);
              }
            });
            console.log('All booking details fetched:', this.bookings); // Log to ensure all bookings are fetched
          },
          error: (error) => {
            console.error('Error fetching booking details:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
      }
    });
  }

  fetchSelectedSeats(bookingId: number): void {
    this.seatSelectionService.getSeatsByBookingId(bookingId).subscribe({
      next: (seats) => {
        console.log('Fetched seats:', seats); // Log the fetched seats

        this.selectedSeats[bookingId] = seats.map(seat => seat.seatNumber);
        console.log('Selected seats:', this.selectedSeats[bookingId]); // Log the selected seats

      },
      error: (error) => {
        console.error('Error fetching selected seats:', error);
      }
    });
  }
  confirmCancel(bookingId: number): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: (response) => {
          alert('Booking cancelled successfully!');
          this.bookings = this.bookings.filter(booking => booking.booking.id !== bookingId);
        },
        error: (error) => {
          console.error('Error cancelling booking:', error);
          alert('Failed to cancel booking.');
        }
      });
    }
  }
}

