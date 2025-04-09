import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from './services/userservices.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  [x: string]: any;

  constructor(private router: Router, private userService: UserService) {}

  username: string = '';
  isUserLoggedIn: boolean = false;
  // isAdminLoggedIn: boolean = false;
 
 
  ngOnInit() {
    this.userService.userName$.subscribe((username: string) => {
      // this.username = email;
      this.isUserLoggedIn = this.userService.isUserLoggedIn();
      // this.isAdminLoggedIn = this.userService.isAdminLoggedIn();
     
      // console.log('Admin: token: '+ this.isAdminLoggedIn);
      console.log('User :Token:  '+ this.isUserLoggedIn);
    });
  }
 
  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/']);


  }

    
user(){
  this.router.navigate(['userlogin']);
}
admin(){
this.router.navigate(['admin']);
}

flights(){
  this.router.navigate(['flights']);
}
order(){
  this.router.navigate(['order']);

}
contact(){

  this.router.navigate(['contact']);


}
about(){
  this.router.navigate(['about']);

}
wallet(){
  this.router.navigate(['wallet']);

}

}
