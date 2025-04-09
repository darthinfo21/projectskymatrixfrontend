import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/adminservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-flight',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './delete-flight.component.html',
  styleUrl: './delete-flight.component.css'
})
export class DeleteFlightComponent {

  flightId!: number;
  deleteMessage!: string;

  constructor(private adminService: AdminService, private router: Router) {}

  deleteFlight(): void {
    if (this.flightId) {
      this.adminService.deleteFlight(this.flightId).subscribe({
        next: (response: any) => {
          this.deleteMessage = 'Flight deleted successfully!';
          console.log(response);
        },
        error: (error) => {
          console.error('Error deleting flight', error);
          this.deleteMessage = 'An error occurred while deleting the flight.';
        }
      });
    } else {
      this.deleteMessage = 'Please enter a valid flight ID.';
    }
  }

  home(): void {
    this.router.navigate(['/']); // Adjust the path as needed
  }

}
