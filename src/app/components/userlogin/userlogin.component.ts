import { Component } from '@angular/core';
import { UserService } from '../../services/userservices.service';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})

export class UserloginComponent {

  user = {username :'', password:''}
  // username: string = '';
  // password: string = '';
  loginMessage: string = '';
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(private userService: UserService , private router:Router) { }
 
  // onLogin() {
  //   if (this.user.username && this.user.password){
  //     {
  //       this.userService.login(this.user).subscribe({
  //         next: (response: any) => {
  //           if (response === 'Login successful') {
  //             // this.user.username = response.username; // Store user ID
  //             this.userService.setSession('some-auth-token', 'shiva');
  //             this.loginMessage = 'Login Success. Redirecting...';
  //             setTimeout(() => {
  //               this.router.navigate(['/search']);
  //             }, 500);
  //           } else {
  //             this.loginMessage = 'Invalid login credentials.';
  //             console.log("Invalid login credentials.");
  //             setTimeout(() => {
  //               this.router.navigate(['/signup']);
  //             }, 500);
  //           }
  //         },
  //         error: (error) => {
  //           console.error('Login error', error);
  //           this.loginMessage = 'An error occurred during login.';
  //           setTimeout(() => {
  //             this.router.navigate(['/signup']);
  //           }, 500);
          
            
  //         }
  //       });
  //     }
  //   }
  // }



  // register(){
  //   this.router.navigate(['/signup']);

  // }
  

  onLogin() {
    if (this.user.username && this.user.password) {
      this.userService.login(this.user).subscribe({
        next: (response: any) => {
          if (response.message === 'Login successful') {
           const userId = response.userId; // Assuming the response contains userId
           const authToken = response.authToken; // Ensure this is correctly retrieved from the response

            this.userService.setSession( authToken, this.user.username, userId);
            this.loginMessage = 'Login Success. Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/search']);
            }, 500);
          } else {
            this.loginMessage = 'Invalid login credentials.';
            console.log('Invalid login credentials.');
            // setTimeout(() => {
            //   this.router.navigate(['/signup']);
            // }, 500);
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.loginMessage = 'An error occurred during login.';
          setTimeout(() => {
            this.router.navigate(['/signup']);
          }, 500);
        }
      });
    }
  }

  register() {
    this.router.navigate(['/signup']);
  }
}


