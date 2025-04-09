import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userservices.service';
@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent{
  walletBalance: number = 0; 
  paymentMessage: string = ''; 
  constructor(private userService: UserService, 
    private router: Router) 
    { // Subscribe to wallet balance updates 
    this.userService.walletBalance$.subscribe
    (balance => this.walletBalance = balance); 
  } 
  
  addToWallet() { // Your existing addToWallet logic 
    
      this.router.navigate(['/userlogin']);
    }
}