import { Component } from '@angular/core';
import { UserService } from '../../services/userservices.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent 
   { 
    amount: number = 0; 
    constructor( 
      private userService: UserService,
       private router: Router ) {} 
       addToWallet() 
       { if (this.amount <= 0) { alert('Please enter a valid amount to add to the wallet.'); 
        return;
       } 
       const userId = parseInt(sessionStorage.getItem('userId') || '0', 10);
        if (!userId) { alert('User ID is not defined.'); 
          return;
         } 
         this.userService.updateWallet(userId, this.amount).subscribe
         ({ next: (response: any) => { 
          this.router.navigate(['/pay2'], { queryParams: { amount: this.amount } 
          }); // Pass amount to Pay component 
          }, error: (error: any) =>
             { console.error('Error updating wallet', error); 
              alert('An error occurred while updating the wallet.');
             } 
            });
           }
      
        }