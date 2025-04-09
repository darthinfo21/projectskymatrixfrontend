import { Component } from '@angular/core';

@Component({
  selector: 'app-searchflights',
  standalone: true,
  imports: [],
  templateUrl: './searchflights.component.html',
  styleUrl: './searchflights.component.css'
})
export class SearchflightsComponent {
  inputData: string = 'You need to login First';  
   onSubmit() {     // Trigger the window alertalert(`Form submitted! You entered: ${this.inputData}`)
    
}showAlert(){
  alert('Please Login!');
}
}
