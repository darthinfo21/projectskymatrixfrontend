import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { catchError,throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';

 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users'; // Update this to match your API URL
 
  constructor(private http: HttpClient) { }

  // BehaviorSubject to track user email
  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();  // Observable to subscribe to email

  private walletBalanceSubject = new BehaviorSubject<number>(0);
   walletBalance$ = this.walletBalanceSubject.asObservable();
   
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, { responseType: 'text' }) 
    .pipe( 
      map(response => { this.walletBalanceSubject.next(user.walletBalance); // Update wallet balance
       return response; }) );
  }
 
  updateWallet(user: any, amount: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateWallet`, user, { responseType: 'text' });
  }
 
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, user);
  }

  isUserLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      let token = sessionStorage.getItem('authToken');
      console.log('Token :' + token);
      return token !== null;
    }
    return false;  // Return false if window is not available
  }
 
  login(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user)
    .pipe(
      map(response => response),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Login failed. Please try again later.'));
      })
    );
  }
  setSession(token: string, username: string , userId:number): void {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userName', username);
    sessionStorage.setItem('userId', userId.toString());

    console.log('Token stored:', sessionStorage.getItem('authToken'));
    console.log('UserName stored:', sessionStorage.getItem('userName'));
   console.log('UserId stored:', sessionStorage.getItem('userId'));

 
    // Update BehaviorSubject so subscribers get the latest email
    this.userNameSubject.next(username);
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  // login(loginData: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl1, loginData)
  //     .pipe(
  //       map(response => response),
  //       catchError(error => {
  //         console.error('Login error', error);
  //         return throwError(() => new Error('Login failed. Please try again later.'));
  //       })
  //     );
  // }
  logout(): void {
 
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');  // Clear token from localStorage
      sessionStorage.removeItem('username');  // Clear email from sessionStorage
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('authToken1');  // Clear token from localStorage
      sessionStorage.removeItem('username');  // Clear email from sessionStorage
      // Reset BehaviorSubject after logout
      this.userNameSubject.next('');
    }
 
  }
 
}