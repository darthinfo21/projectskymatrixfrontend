import { Component, OnInit } from '@angular/core';
import { Bookingdetailsdto } from '../../model/bookingdetailsdto';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/bookingservice.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit {
  bookingDetails: Bookingdetailsdto | undefined;
  selectedSeats: string[] = [];

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    const seats = this.route.snapshot.paramMap.get('seats');
    if (seats) {
      this.selectedSeats = seats.split(',');
    }

    this.bookingService.getBookingDetails(bookingId).subscribe(
      (details) => {
        this.bookingDetails = details;
      },
      (error) => {
        console.error('Error fetching booking details:', error);
      }
    );
  }

  downloadPDF(): void {
    const element = document.querySelector('.booking-details-container');
    if (element) {
      html2canvas(element as HTMLElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('booking-confirmation.pdf');
      }).catch((error) => {
        console.error('Error generating PDF:', error);
      });
    }
  }
  end(){

    this.router.navigate(['end']);
  }
  
}