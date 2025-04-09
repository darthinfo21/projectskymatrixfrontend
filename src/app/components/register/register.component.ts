import { Component } from '@angular/core';
import { UserService } from '../../services/userservices.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // username: string = '';
  // password: string = '';
  // email: string = '';
  // phoneNumber: string = '';
  // dateOfBirth: string = '';
  // walletBalance: number = 0;
  // registrationMessage: string = '';

  // constructor(private userService: UserService , private router:Router) {}

  // register(): void {
  //   const user: User = {
  //     username: this.username,
  //     password: this.password,
  //     email: this.email,
  //     phoneNumber: this.phoneNumber,
  //     dateOfBirth: this.dateOfBirth,
  //     walletBalance: this.walletBalance
  //   };
  //   this.userService.registerUser(user).subscribe(
  //     response => {
  //       this.registrationMessage = response;
  //     },
  //     error => {
  //       this.registrationMessage = 'Registration failed!';
  //     }
  //   );
  // }


  // user: User = {
  //   username: '',
  //   password: '',
  //   email: '',
  //   phoneNumber: '',
  //   dateOfBirth: '',
  //   walletBalance: 0
  // };
  // registrationMessage: string = '';

  // constructor(private userService: UserService, private router: Router) { }

  // register() {
  //   // this.userService.registerUser(this.user).subscribe(
  //   //   response => this.registrationMessage = response,
  //   //   error => this.registrationMessage = error.error
  //   // );
  //   this.userService.registerUser(this.user).subscribe({
  //      next: (response: any) => { if (response === 'User registered successfully!') {
  //        this.registrationMessage = 'Registration successful. Redirecting...'; 
  //        setTimeout(() => { 
  //         this.router.navigate(['/userlogin']); }, 1000); } 
  //         else { this.registrationMessage = 'Registration failed. Please try again.'; } }, 
  //         error: (error) => { console.error('Registration error', error); 
  //           this.registrationMessage = 'An error occurred during registration.'; } });
        
  //           if (this.isValid()) {
  //             // Your registration logic
  //             this.registrationMessage = 'Registration successful!';
  //           } else {
  //             this.registrationMessage = 'Please correct the errors and try again.';
  //           }
  // }
  // isValid(): boolean {
  //   // Implement your custom validation logic if needed
  //   return true;
  // }


  // // Redirect() {
  // //   this.router.navigate(['/userlogin']);

  // // }
    user: User = {
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      walletBalance: 0
    };
    registrationMessage: string = '';
  
    constructor(private userService: UserService, private router: Router) { }
  
    register() {
      this.userService.registerUser(this.user).subscribe({
        next: (response: any) => {
          if (response === 'User registered successfully!') {
            this.registrationMessage = 'Registration successful. Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/pay'], { state: { walletBalance: this.user.walletBalance } });
            }, 1000);
          } else {
            this.registrationMessage = 'Registration failed. Please try again.';
          }
        },
        error: (error) => {
          console.error('Registration error', error);
          this.registrationMessage = 'An error occurred during registration.';
        }
      });
    }
  }



