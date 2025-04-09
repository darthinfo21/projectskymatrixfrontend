import { Component } from '@angular/core';
import { AdminService } from '../../services/adminservice.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  // username: string = '';
  // password: string = '';
  // loginMessage: string = '';

 
  // constructor(private adminService: AdminService) {}
 
  // login() {
  //   console.log("admin "+this.username+" "+this.password);

  //   this.adminService.login(this.username, this.password).subscribe
  //   ( (response) => { 
  //     console.log('respo'+response);
  //     this.loginMessage = response; }, 
    

  //   (error) => { this.loginMessage = 'Invalid credentials!'; } ); 
  
    
  // }  
  loginData = { username: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';
 
  // Static admin credentials
  private adminCredentials = {
    username: 'admin',
    password: 'admin'
  };
 
  constructor(
    private adminService:AdminService,
    private router: Router
  ) {}
 
  onSubmit() {
    if (this.loginData.username && this.loginData.password) {
      if (this.loginData.username === this.adminCredentials.username && this.loginData.password === this.adminCredentials.password) {
        // Admin login successful
        // this.adminService.setSession1('admin-auth-token', this.loginData.email,1); // Set admin session
        this.successMessage = 'Admin Login Success. Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/addflight']); // Navigate to admin dashboard
        }, 500);
      } else {
        this.errorMessage = 'Invalid admin credentials.';
      }
    }
  }
 

}

 
  // Add methods for addFlight and deleteFlight if needed

