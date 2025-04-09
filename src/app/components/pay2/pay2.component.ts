import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../../services/userservices.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pay2.component.html',
  styleUrl: './pay2.component.css'
})
export class Pay2Component implements OnInit { 
  walletBalance: number = 0; 
  paymentMessage: string = '';
   totalAmount: number = 0;
 constructor(
   private userService: UserService, 
   private router: Router, 
   private route: ActivatedRoute 
  ) { 
    // Subscribe to wallet balance updates 
    this.userService.walletBalance$.subscribe(balance =>
       this.walletBalance = balance); 
      }
   ngOnInit(): void { 
    // Read amount from query params 
    this.route.queryParams.subscribe(params => { 
      this.totalAmount = +params['amount'] || 0; });
     }
 makePayment() { 
    // Here, you can add any logic needed for making a payment 
    alert('Wallet updated successfully!');
    
    this.router.navigate(['end']);
  } 
  }