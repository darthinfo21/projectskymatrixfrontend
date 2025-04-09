import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/adminservice.service';
import { FlightDTO } from '../../model/flight-dto';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../model/flight';
@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})

export class AddFlightComponent {
  flight: FlightDTO = new FlightDTO('', '', '', '', '', '', 0, 0, 0);
  message: string = '';
  constructor(private adminservice: AdminService, private router: Router) { }
  addFlight(): void {
    this.adminservice.addFlight(this.flight).subscribe

      ({
        next: (response: string) => {
          this.message = response,
          console.log(response);
        },

        error: (error: any) => {
          this.message = 'An error occurred while adding the flight.';
          console.error('Error adding flight', error);
        }
      });
  }

  delete() {
    this.router.navigate(['/deleteflight']); // Navigate to admin dashboard
  }
}




